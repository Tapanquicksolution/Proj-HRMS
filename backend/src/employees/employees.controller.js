"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EmployeesController = void 0;
var common_1 = require("@nestjs/common");
var EmployeesController = /** @class */ (function () {
    function EmployeesController() {
    }
    EmployeesController.prototype.getAll = function () {
        // Return all employees here
        return [];
    };
    __decorate([
        (0, common_1.Get)()
    ], EmployeesController.prototype, "getAll");
    EmployeesController = __decorate([
        (0, common_1.Controller)('employees')
    ], EmployeesController);
    return EmployeesController;
}());
exports.EmployeesController = EmployeesController;
