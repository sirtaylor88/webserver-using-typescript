import { compare, hash } from "bcrypt";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UnauthorizedError } from "./errors.js";
import { Request } from "express";

type Payload = Pick<jwt.JwtPayload, "iss" | "sub" | "iat" | "exp">;
const TOKEN_ISSUER = "chirpy";

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await hash(password, saltRounds);
}

export async function checkPasswordHash(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
}

export function makeJWT(userID: string, expiresIn: number, secret: string): string {
    const iat = Math.floor(Date.now() / 1000);
    const payload: Payload = {
        iss: TOKEN_ISSUER,
        sub: userID,
        iat: iat,
        exp: iat + expiresIn,
    }
    return jwt.sign(payload, secret, {algorithm: "HS256"});
};

export function validateJWT(tokenString: string, secret: string): string {
    let decoded: Payload;
    try {
        decoded = jwt.verify(tokenString, secret) as JwtPayload;
    } catch(_err) {
        throw new UnauthorizedError(`Invalid token!`)
    }

    if (decoded.iss !== TOKEN_ISSUER) {
        throw new UnauthorizedError("Invalid issuer!");
    }

    if (!decoded.sub) {
        throw new UnauthorizedError('No user ID in token!');
    }
    return decoded.sub;
};

export function getBearerToken(req: Request): string {
    const token = req.headers['authorization'];
    if (token) {
        return token.replace('Bearer ', '');
    }
    return '';
};
