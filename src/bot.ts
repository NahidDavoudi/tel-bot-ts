import "dotenv/config";
import { Bot } from "grammy";

const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error("BOT_TOKEN is not defined");
}

const bot = new Bot(token);

bot.command("start", async (ctx) => {
  await ctx.reply("سلام! به ربات آموزشی فامو خوش اومدی 🌱");
});

bot.on("message:text", async (ctx) => {
  await ctx.reply(`پیامت دریافت شد: ${ctx.message.text}`);
});

bot.start();

console.log("Famo Bot is running...");