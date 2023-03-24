"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Create = void 0;
class Create {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async execute(newEmployee, supervisorId) {
        const createdEmployee = await this.employeeService.create(newEmployee, supervisorId);
        if (!createdEmployee)
            throw new Error('Employee not created');
        return createdEmployee;
    }
}
exports.Create = Create;
