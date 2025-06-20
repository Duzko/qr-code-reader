import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
}

export function comparePasswords(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
}

export function generateJwt(userId: string, username: string) {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyJwt(token: string): { userId: string } | null {
    try {
        return jwt.verify(token, JWT_SECRET) as { userId: string };
    } catch {
        return null;
    }
}