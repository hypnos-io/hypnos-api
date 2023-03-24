"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Create = void 0;
class Create {
    constructor(supervisorService) {
        this.supervisorService = supervisorService;
    }
    async execute(newSupervisor) {
        const createdSupervisor = await this.supervisorService.create(newSupervisor);
        if (!createdSupervisor)
            throw new Error('Supervisor not created.');
        return createdSupervisor;
    }
}
exports.Create = Create;
