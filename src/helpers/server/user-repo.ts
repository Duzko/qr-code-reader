import User from "@/models/User";
import { hashPassword } from "./auth-utils";

export async function findUserByUsername(username:string) {
    return User.findOne({ username });
}

export async function createUser(username: string, password: string) {
    const hashedPassword = hashPassword(password);
    return User.create({username, password: hashedPassword});
}