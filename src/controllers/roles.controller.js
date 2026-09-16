import { methods as controller } from '../services/roles.service.js';
export const methods = {
    async onGetAll(req, res) {
        try {

            const result = await controller.getall(req, res);
            res.status(result.code).json(result.data);

        } catch (error) {
            res.status(400).json(error);
        }
    }
}