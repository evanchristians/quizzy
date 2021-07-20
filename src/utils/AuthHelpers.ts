import { User } from "@models/User";
import { sign, verify } from "jsonwebtoken";
import { AUTH_SECRET } from "~/const";

export const getUserFromToken = async (
    token: string | string[] | undefined
): Promise<User | undefined> => {
    if (!token || typeof token !== "string") return;
    const { userId } = verify(token, AUTH_SECRET) as any;
    const user = await User.findOne({
        where: { id: userId },
    });
    if (!user) throw new Error("User not found!");
    return user;
};

export const Auth = (user: User) => {
    const token = sign({ userId: user.id }, AUTH_SECRET, { expiresIn: "1h" });

    return {
        token,
    };
};
