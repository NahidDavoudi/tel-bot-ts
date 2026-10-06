import { guestStartKeyboard } from "../../keyboards/guest.js";

export async function startHandler(ctx) {
  await ctx.reply(
    `<b>Hi, Welcome to FamoBot!</b>
    To start using the bot please connect your account first`,
    {
      parse_mode: "HTML",
      reply_markup: guestStartKeyboard(),
    }
  );
}