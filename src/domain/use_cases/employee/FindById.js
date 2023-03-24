"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindById = void 0;
class FindById {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async execute(supervisorId, id) {
        const foundEmployee = await this.employeeService.findById(supervisorId, id);
        if (!foundEmployee)
            throw new Error('Employee not found.');
        return foundEmployee;
    }
}
exports.FindById = FindById;
