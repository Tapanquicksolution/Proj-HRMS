"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AttendanceController = void 0;
var common_1 = require("@nestjs/common");
var AttendanceController = /** @class */ (function () {
    function AttendanceController() {
    }
    AttendanceController.prototype.getAll = function () {
        // Return all attendance logs here
        return [];
    };
    __decorate([
        (0, common_1.Get)()
    ], AttendanceController.prototype, "getAll");
    AttendanceController = __decorate([
        (0, common_1.Controller)('attendance')
    ], AttendanceController);
    return AttendanceController;
}());
exports.AttendanceController = AttendanceController;
