"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchAll = void 0;
class FetchAll {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async execute(supervisorId) {
        return this.employeeService.fetchAll(supervisorId);
    }
}
exports.FetchAll = FetchAll;
