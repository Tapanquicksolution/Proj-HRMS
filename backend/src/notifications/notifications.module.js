"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NotificationsModule = void 0;
var common_1 = require("@nestjs/common");
var notifications_service_1 = require("./notifications.service");
var notifications_controller_1 = require("./notifications.controller");
var prisma_module_1 = require("../prisma/prisma.module");
var bull_1 = require("@nestjs/bull");
var email_service_1 = require("./email.service");
var notifications_processor_1 = require("./notifications.processor");
var NotificationsModule = /** @class */ (function () {
    function NotificationsModule() {
    }
    NotificationsModule = __decorate([
        (0, common_1.Module)({
            imports: [
                prisma_module_1.PrismaModule,
                bull_1.BullModule.registerQueue({
                    name: 'notifications'
                }),
            ],
            controllers: [notifications_controller_1.NotificationsController],
            providers: [notifications_service_1.NotificationsService, email_service_1.EmailService, notifications_processor_1.NotificationsProcessor],
            exports: [notifications_service_1.NotificationsService, email_service_1.EmailService]
        })
    ], NotificationsModule);
    return NotificationsModule;
}());
exports.NotificationsModule = NotificationsModule;
