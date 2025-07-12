import { config } from "dotenv";

config();

function ENV(key: string): string {
    const str = process.env[key];
    if (str) return str;
    else throw new Error("Give proper env Key");
}

export const PORT = ENV("PORT");
export const SECRET = ENV("SECRET");
