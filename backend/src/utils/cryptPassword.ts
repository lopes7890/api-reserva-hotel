import { hashSync, genSaltSync } from "bcrypt-ts"

export const encrypted = async (pass: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(pass, salt);

    return hash;
}