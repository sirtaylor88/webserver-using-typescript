import { compare, hash } from "bcrypt";

const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
    return await hash(password, saltRounds);
}

export async function checkPasswordHash(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
}
