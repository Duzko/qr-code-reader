import { createUser, findUserByUsername } from "@/helpers/server/user-repo";
import { connectDB } from "@/helpers/server/db";
import { success } from "zod/v4";

export async function POST(req:Request) {
    await connectDB();
    const { username, password } = await req.json();

    const exitsing = await findUserByUsername(username);
    if (exitsing) return Response.json({error: "Tài khoản đã tồn tại"}, {status: 400});

    const user = await createUser(username, password);
    return Response.json({ success: true, user: user.username});
}