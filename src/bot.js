import "dotenv/config";
import { Bot, InlineKeyboard, Keyboard } from "grammy";

const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error("BOT_TOKEN is not defined");
}

const bot = new Bot(token);

bot.command("start", async (ctx) => {
  const inlineKeyboard = new InlineKeyboard().text("connect", "geust.connect").row().text("website" , URL="https://famoacademy.ir");
  await ctx.reply(`
    <b>Hi, Welcome to FamoBot!</b>
    To start using the bot please connect your acount first:
    `,
    {
      parse_mode: 'HTML',
      reply_markup: inlineKeyboard
    }
  );
});

bot.callbackQuery("geust.connect", async (ctx) => {
  const keyboard = new Keyboard().requestContact("send phone number").resized();
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("To connect your account, send us your phone number using the button below 👇",
  {
    reply_markup: keyboard
  })
})
bot.on("message:contact", async (ctx) => {
  await ctx.reply("checking number ...");
});

bot.on("message:text", async (ctx) => {
  await ctx.reply(`پیامت دریافت شد: ${ctx.message.text}`);
});

bot.catch((err) => {
  console.error("Bot error:", err);
});

bot.start();

console.log("Famo Bot is running...");