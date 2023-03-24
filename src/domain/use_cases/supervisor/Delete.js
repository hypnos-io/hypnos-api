"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteById = void 0;
class DeleteById {
    constructor(supervisorService) {
        this.supervisorService = supervisorService;
    }
    async execute(id) {
        await this.supervisorService.deleteById(id);
    }
}
exports.DeleteById = DeleteById;
