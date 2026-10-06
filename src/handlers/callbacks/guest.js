import { contactKeyboard } from "../../keyboards/guest.js";

export async function guestConnectHandler(ctx) {
  await ctx.answerCallbackQuery();

  await ctx.reply(
    "To connect your account, send us your phone number using the button below 👇",
    {
      reply_markup: contactKeyboard(),
    }
  );
}