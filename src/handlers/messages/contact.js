export async function contactHandler(ctx) {
  const contact = ctx.message.contact;

  if (contact.user_id !== ctx.from.id) {
    await ctx.reply(
      "لطفاً شماره تلفن خودتان را ارسال کنید."
    );

    return;
  }

  console.log("Received contact:", contact);

  await ctx.reply("Checking number...");
}