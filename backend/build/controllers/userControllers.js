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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../service/userService");
;
class UserController {
    getDataToValidation(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome_completo, telefone, email, senha } = req.body;
            if (!email || !senha || !nome_completo || !telefone) {
                return "fill in all fields";
            }
            ;
            if (telefone.length > 15) {
                return "invalid phone number";
            }
            ;
            if (senha.length < 8) {
                return "invalid password";
            }
            ;
            const data = {
                nome_completo,
                telefone,
                email,
                senha
            };
            return data;
        });
    }
    ;
    submitDataToService(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = new userService_1.UserService();
            return yield service.validationDataToService(data);
        });
    }
    ;
}
exports.UserController = UserController;
;
