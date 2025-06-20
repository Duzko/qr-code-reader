import { connectDB } from "@/helpers/server/db";
import { findUserByUsername } from "@/helpers/server/user-repo";
import { comparePasswords, generateJwt } from "@/helpers/server/auth-utils";

export async function POST(req: Request) {
    await connectDB();
    const { username, password } = await req.json();

    const user = await findUserByUsername(username);
    if (!user) {
        return Response.json({ error: "Tên tài khoản hoặc mật khẩu sai" }, { status: 400 });
    }

    const valid= comparePasswords(password, user.password);
    if (!valid) {
        return Response.json({ error: "Tên tài khoản hoặc mật khẩu sai" }, { status: 400 });
    }

    const token = generateJwt(user._id.toString(), user.username);
    return Response.json({ token, username: user.username }, { status: 200 });
}