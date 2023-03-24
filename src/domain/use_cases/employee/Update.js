"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Update = void 0;
class Update {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async execute(supervisorId, id, newEmployee) {
        const updatedEmployee = await this.employeeService.update(supervisorId, id, newEmployee);
        if (!updatedEmployee)
            throw new Error('Employee not updated');
        return updatedEmployee;
    }
}
exports.Update = Update;
