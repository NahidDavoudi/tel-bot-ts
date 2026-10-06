import { ParsedMessage } from "../parser";
import sendMessage from "../telegramClient";

export async function basicHandler(
  parsedMessage: ParsedMessage,
  chatId: number,
) {
  if (parsedMessage.command === "/ping") {
    await sendMessage(chatId, "alive");
  } else if (parsedMessage.command === "/help") {
    await sendMessage(chatId, "help will be provided");
  } else if (parsedMessage.command === "/echo") {
    if (parsedMessage["args"].length > 0) {
      await sendMessage(
        chatId,
        `${parsedMessage.rawtext}  and args is ${parsedMessage.args}`,
      );
    } else {
      const echoValidationText =
        "Echo repeats your text\n" +
        "You can provide your input in form /echo hello wold!";
      await sendMessage(chatId, echoValidationText);
    }
  } else {
    await sendMessage(chatId, "try /help");
  }
}
