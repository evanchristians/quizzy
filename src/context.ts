import { User } from "@models/User";
import { Request, Response } from "express";

export type Context = {
    req: Request;
    res: Response;
    user?: User;
};
