import { Request } from "express";
import { encrypted } from "../utils/cryptPassword";
import { UserService } from "../service/userService";
import { User } from "../models/user";

class UserController {
    async getDataToValidation(req: Request): Promise<string | User>{
        const { nome_completo, telefone, email, senha } = req.body as User;

        if (!email || !senha || !nome_completo || !telefone){
            return "fill in all fields";
        };

        if (telefone.length > 15){
            return "invalid phone number";
        };

        if (senha.length < 8){
            return "invalid password";
        };

        const data = {
            nome_completo,
            telefone,
            email,
            senha 
        };

        return data;
    };

    async submitDataToService(data: User): Promise<string>{
        const service = new UserService();
        data.senha = await encrypted(data.senha)
        return await service.validationDataToService(data);
    };
};

export { UserController };
