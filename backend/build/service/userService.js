"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const dbConfig_1 = __importDefault(require("../database/dbConfig"));
;
class UserService {
    validationDataToService(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const verify = yield dbConfig_1.default.usuario.findFirst({
                where: { email: data.email }
            });
            if (verify) {
                return "existing user";
            }
            ;
            yield dbConfig_1.default.usuario.create({
                data: {
                    nome_completo: data.nome_completo,
                    email: data.email,
                    telefone: data.telefone,
                    senha: data.senha
                }
            });
            console.log("teste");
            return "registered with successfully";
        });
    }
    ;
}
exports.UserService = UserService;
;
