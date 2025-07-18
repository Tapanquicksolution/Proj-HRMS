"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.S3Service = void 0;
var common_1 = require("@nestjs/common");
var AWS = require("aws-sdk");
var S3Service = /** @class */ (function () {
    function S3Service(configService) {
        this.configService = configService;
        var isLocal = configService.get('NODE_ENV') !== 'production';
        // If using MinIO locally
        if (isLocal) {
            this.s3 = new AWS.S3({
                accessKeyId: 'minioadmin',
                secretAccessKey: 'minioadmin',
                endpoint: 'http://localhost:9000',
                s3ForcePathStyle: true,
                signatureVersion: 'v4'
            });
        }
        else {
            // Production AWS S3
            this.s3 = new AWS.S3({
                region: configService.get('aws.region'),
                accessKeyId: configService.get('aws.accessKey'),
                secretAccessKey: configService.get('aws.secretKey')
            });
        }
    }
    S3Service.prototype.uploadFile = function (file, key) {
        return __awaiter(this, void 0, void 0, function () {
            var bucketName;
            return __generator(this, function (_a) {
                bucketName = this.configService.get('aws.bucket');
                return [2 /*return*/, this.s3
                        .upload({
                        Bucket: bucketName,
                        Body: file.buffer,
                        Key: key,
                        ContentType: file.mimetype,
                        ACL: 'private'
                    })
                        .promise()];
            });
        });
    };
    S3Service.prototype.getSignedUrl = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var bucketName;
            return __generator(this, function (_a) {
                bucketName = this.configService.get('aws.bucket');
                return [2 /*return*/, this.s3.getSignedUrlPromise('getObject', {
                        Bucket: bucketName,
                        Key: key,
                        Expires: 3600
                    })];
            });
        });
    };
    S3Service.prototype.deleteFile = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var bucketName;
            return __generator(this, function (_a) {
                bucketName = this.configService.get('aws.bucket');
                return [2 /*return*/, this.s3
                        .deleteObject({
                        Bucket: bucketName,
                        Key: key
                    })
                        .promise()];
            });
        });
    };
    S3Service = __decorate([
        (0, common_1.Injectable)()
    ], S3Service);
    return S3Service;
}());
exports.S3Service = S3Service;
