import { Request } from "express";
import { UserService } from "../service/userService";

interface User {
    nome_completo: string,
    telefone: string,
    email: string,
    senha: string
};

class UserController {
    async getDataToValidation(req: Request){
        const { nome_completo, telefone, email, senha } = req.body as User;

        if (!email || !senha || !nome_completo || !telefone){
            return "fill in all fields";
        };

        if (telefone.length > 15){
            return "invalid telephone number";
        };

        if (senha.length > 8){
            return "invalid password";
        };

        const data = {
            nome_completo,
            telefone,
            email,
            senha
        };

        console.log(data)

        return data;
    };

    async submitDataToService(data: User){
        const service = new UserService();
        return await service.validationDataToService(data);
    };
};

export { UserController };
