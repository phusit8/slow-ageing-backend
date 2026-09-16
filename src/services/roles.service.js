import { methods as roleRepo } from "../repositories/roles.repositorie.js"

export const methods = {
    async getall(req, res) {
        try {
            const { limit, offset } = req.query
            const option = { limit: limit, offset: offset }
            const result = await roleRepo.getall(option)
            if (result.state) {
                return { code: 200, data: result.result }
            } else {
                return { code: 204, data: [] }
            }
        } catch (error) {
            return { code: 400, data: [] }
        }
    }
}