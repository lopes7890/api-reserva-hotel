import prisma from "../database/dbConfig"
import { User } from "../controllers/userControllers";

class UserService {
    async validationDataToService(data: User){
        const verify = await prisma.usuario.findFirst({
            where: {email: data.email}
        })

        if (verify) {
            return "existing user";
        };

        await prisma.usuario.create({
            data: {
                nome_completo: data.nome_completo,
                email: data.email,
                telefone: data.telefone,
                senha: data.senha
            }
        });

        return "registered successfully";
    };
};

export { UserService };