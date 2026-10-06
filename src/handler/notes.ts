import { ParsedMessage } from "../parser";
import sendMessage from "../telegramClient";
import { getNotes, setNotes } from "../store_state";

export async function notesHandler(
  parsedMessage: ParsedMessage,
  chatId: number,
  update_id: number,
) {
  if (parsedMessage.command === "/notes") {
    const notes = getNotes(chatId);
    if (notes.length === 0) {
      await sendMessage(chatId, `No notes yet`);
    } else {
      const notesList = notes
        .map((note, index) => `${index + 1}. ${note.text}`)
        .join("\n");
      await sendMessage(chatId, `Your notes: \n ${notesList}`);
    }
  }
  if (parsedMessage.command === "/note") {
    if (parsedMessage["args"].length > 0) {
      setNotes(update_id, parsedMessage.rawtext, chatId);
      await sendMessage(chatId, `note ${parsedMessage.rawtext} saved`);
    } else {
      const noteValidationText =
        "Please provide a note.\n" + "Example:\n" + "/note buy milk";
      await sendMessage(chatId, noteValidationText);
    }
  }
}
