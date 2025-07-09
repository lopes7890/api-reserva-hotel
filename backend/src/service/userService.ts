import prisma from "../database/dbConfig"
interface User {
    nome_completo: string,
    telefone: string,
    email: string,
    senha: string
};

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

        console.log("teste")

        return "registered with successfully";

    };
};

export { UserService };