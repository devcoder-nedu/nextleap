import {JWT} from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        id?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
    }
}