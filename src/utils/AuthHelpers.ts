import { User } from "@models/User";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { AUTH_SECRET } from "~/const";

export const getUserFromToken = async (
    token: string | string[] | undefined
): Promise<User | undefined> => {
    if (!token || typeof token !== "string") return;
    const data = verify(token, AUTH_SECRET);
    const user = await User.findOne({
        where: { id: (data as JwtPayload).userId },
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
