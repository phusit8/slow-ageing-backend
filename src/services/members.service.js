import { methods as membersRepo } from "#repositories/members.repositorie.js";

export const methods = {
    async getProfile(lineId) {
        try {
            if (!lineId) {
                return { code: 400, data: { message: "LINE ID is required" } };
            }
            const result = await membersRepo.getByLineId(lineId);
            if (result.state && result.result) {
                return { code: 200, data: result.result };
            }
            return { code: 404, data: null };
        } catch (error) {
            console.error("MembersService getProfile error:", error);
            return { code: 500, data: null };
        }
    },

    async saveSetup(data) {
        try {
            const result = await membersRepo.createOrUpdate(data);
            if (result.state) {
                return { code: 200, data: result.result };
            }
            return { code: 400, data: { message: "Failed to save profile" } };
        } catch (error) {
            console.error("MembersService saveSetup error:", error);
            return { code: 500, data: { message: "Internal server error" } };
        }
    },
};
