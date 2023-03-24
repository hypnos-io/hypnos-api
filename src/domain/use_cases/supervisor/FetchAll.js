"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchAll = void 0;
class FetchAll {
    constructor(supervisorService) {
        this.supervisorService = supervisorService;
    }
    async execute() {
        const allSupervisors = await this.supervisorService.fetchAll();
        return allSupervisors;
    }
}
exports.FetchAll = FetchAll;
