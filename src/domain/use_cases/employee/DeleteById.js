"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteById = void 0;
class DeleteById {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async execute(supervisorId, id) {
        return this.employeeService.deleteById(supervisorId, id);
    }
}
exports.DeleteById = DeleteById;
