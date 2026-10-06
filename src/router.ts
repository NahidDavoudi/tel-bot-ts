import parseMessage from "./parser.js";
import type { ParsedMessage } from "./parser.js";
import { basicHandler } from "./handler/basic.js";
import { notesHandler } from "./handler/notes.js";

export default async function handleMessage(
  chatId: number,
  msg_text: string,
  update_id: number,
) {
  const parsedMessage: ParsedMessage = parseMessage(msg_text);

  if (parsedMessage.command === "/note" || parsedMessage.command === "/notes") {
    await notesHandler(parsedMessage, chatId, update_id);
  } else {
    await basicHandler(parsedMessage, chatId);
  }
}
