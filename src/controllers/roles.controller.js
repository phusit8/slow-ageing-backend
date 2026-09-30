import { methods as controller } from '../services/roles.service.js';
export const methods = {
    async onGetAll(req, res) {
        try {
            const result = await controller.getall(req, res);
            res.status(result.code).json(result.data);

        } catch (error) {
            res.status(400).json(error);
        }
    },
    async create(req, res) {
        try {
            const result = await controller.createUser(req, res);
            res.status(result.code).json(result.data)
        } catch (error) {
            res.status(400).json(error);

        }
    },
    async updateUserById(req, res) {
        try {
            const result = await controller.updateUser(req, res)
            res.status(result.code).json(result.data)
        } catch (error) {
            res.status(400).json(error);

        }

    },
    async deleteUserById(req, res) {
        try {
            const result = await controller.deleteUser(req);
            return res.status(result.code).json(result.data);

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
    
}