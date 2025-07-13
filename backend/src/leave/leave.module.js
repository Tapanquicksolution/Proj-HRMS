"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LeaveModule = void 0;
var common_1 = require("@nestjs/common");
var leave_service_1 = require("./leave.service");
var leave_controller_1 = require("./leave.controller");
var prisma_module_1 = require("../prisma/prisma.module");
var notifications_module_1 = require("../notifications/notifications.module");
var LeaveModule = /** @class */ (function () {
    function LeaveModule() {
    }
    LeaveModule = __decorate([
        (0, common_1.Module)({
            imports: [
                prisma_module_1.PrismaModule,
                notifications_module_1.NotificationsModule,
            ],
            controllers: [leave_controller_1.LeaveController],
            providers: [leave_service_1.LeaveService],
            exports: [leave_service_1.LeaveService]
        })
    ], LeaveModule);
    return LeaveModule;
}());
exports.LeaveModule = LeaveModule;
