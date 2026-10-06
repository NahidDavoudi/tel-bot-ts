import "dotenv/config";
import { Bot } from "grammy";

import { startHandler } from "./handlers/commands/start.js";
import { guestConnectHandler } from "./handlers/callbacks/guest.js";
import { contactHandler } from "./handlers/messages/contact.js";

const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error("BOT_TOKEN is not defined");
}

const bot = new Bot(token);

bot.command("start", startHandler);

bot.callbackQuery("guest.connect", guestConnectHandler);

bot.on("message:contact", contactHandler);

bot.catch((err) => {
  console.error("Bot error:", err);
});

bot.start();

console.log("Famo Bot is running...");