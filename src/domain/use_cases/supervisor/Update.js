"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Update = void 0;
class Update {
    constructor(supervisorService) {
        this.supervisorService = supervisorService;
    }
    async execute(id, newSupervisor) {
        const updatedSupervisor = await this.supervisorService.update(id, newSupervisor);
        if (!updatedSupervisor)
            throw new Error(`User not updated with id ${id}`);
        return updatedSupervisor;
    }
}
exports.Update = Update;
