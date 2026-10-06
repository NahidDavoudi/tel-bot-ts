import * as dotenv from "dotenv";
dotenv.config();

export const bot_token = process.env.BOT_TOKEN;

if (!bot_token) throw new Error("BOT_TOKEN is missing from .env");
