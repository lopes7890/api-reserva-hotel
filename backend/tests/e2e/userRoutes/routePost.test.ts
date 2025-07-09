import app from "../../../src/index";
import { UserService } from "../../../src/service/userService";
import prismaCl from "../../../src/database/dbConfig";
import {describe, expect, test} from "@jest/globals";
import request from "supertest";

jest.mock("../../../src/database/dbConfig", () => ({
    __esModule: true,
    default: {
        usuario: {
            create: jest.fn(),
            findFirst: jest.fn()
        }
    }
}));


describe("Testes na rota POST de usuários", () => {

    test("cadastro de usuário no banco de dados", async () => {
        const mockUsuario = {nome_completo: "Allison", email: "teste@email.com", telefone: "13986345690", senha: "teste1234"};

        (prismaCl.usuario.create as jest.Mock).mockResolvedValue(mockUsuario);

        const result = await new UserService().validationDataToService(mockUsuario)

        expect(prismaCl.usuario.create).toHaveBeenCalledTimes(1);
        expect(prismaCl.usuario.create).toHaveBeenCalledWith({
            data: mockUsuario
        });

        expect(result).toBe("registered with successfully");
    });

    test("invalidez da senha", async () => {
    const response = await request(app).post("/cadastro").send(
        {
            nome_completo: "Teste", 
            email: "teste@email.com", 
            telefone: "13986345690",
            senha: "teste1234"
        });
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("invalid password")
    return;
    });

    test("invalidez do número de telefone", async () => {
    const response = await request(app).post("/cadastro").send(
        {
            nome_completo: "Teste", 
            email: "teste@email.com", 
            telefone: "1398634569000000",
            senha: "teste1234"
        });
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("invalid telephone number")
    return;
    });

    test("dados faltando", async () => {
    const response = await request(app).post("/cadastro").send(
        {
            email: "teste@email.com", 
            telefone: "13986345690",
            senha: "teste123"
        });
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("fill in all fields")
    return;
    });

/*     test("usuário repetido", async () => {
    const response = await request(app).post("/cadastro").send(
        {
            nome_completo: "Allison", 
            email: "teste@email.com", 
            telefone: "13986345690",
            senha: "teste123"
        });
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("existing user")
    return;
    }); */
});
