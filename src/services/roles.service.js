import { methods as roleRepo } from "../repositories/roles.repositorie.js"
import crypto from "crypto"
import argon2 from "argon2"
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
    },

    async createUser(req, res) {
    try {
        const body = req.body;

        console.log("BODY:", body);
        console.log("PASSWORD:", body.password);

        if (!body.password) {
            return {
                code: 400,
                data: {
                    message: "Password is required"
                }
            };
        }

        const passwordHash = await argon2.hash(body.password, {
            type: argon2.argon2id,
        });

        const data = {
            full_name: body.full_name,
            phone_number: body.phone_number,
            email: body.email,
            position: body.position,
            department: body.department,
            community: body.community,
            role: body.role || "staff",
            password_hash: passwordHash,
            status: "pending",
        };

        const result = await roleRepo.create(data);

        if (result.state) {
            console.log("Repository result:", result);
            console.log("ได้แล้วโว้ยยยยยยยย");

            return {
                code: 201,
                data: result.result,
            };
        }

        return {
            code: 400,
            data: [],
        };

    } catch (error) {
        console.error("Create User Error:", error);

        return {
            code: 400,
            data: [],
        };
    }
},
    async updateUser(req, res) {
        try {
            const id = req.params
            const data = req.body
            const result = await roleRepo.update(id, data)
            if (result.state) {
                return { code: 200, data: result.result }
            } else {
                return { code: 204, data: [] }
            }
        } catch (error) {
            return { code: 400, data: [] }

        }
    },

    async deleteUser(req) {
        try {
            const id = req.params
            const result = await roleRepo.delete(id);

            if (!result.state) {

                return {
                    code: 500,
                    data: {
                        message: "database error"
                    }
                }

            }

            if (result.result === 0) {
                return {
                    code: 404,
                    data: {
                        message: "user not found"
                    }
                }
            }

            return {
                code: 200,
                data: {
                    message: "delete user successfully"
                }
            }
        } catch (error) {
            return {
                code: 500,
                data: {
                    message: "Internal server error"
                }
            }
        }
    }


}