"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindById = void 0;
class FindById {
    constructor(supervisorService) {
        this.supervisorService = supervisorService;
    }
    async execute(id) {
        const foundSupervisor = await this.supervisorService.findById(id);
        if (!foundSupervisor)
            throw new Error(`User not found with id ${id}`);
        return foundSupervisor;
    }
}
exports.FindById = FindById;
