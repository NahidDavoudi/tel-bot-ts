import { bot_token } from "../config.js";
import { getLastUpdateId, setLastUpdateId } from "./store_state.js";

export async function checkTelegram(): Promise<any> {
  const response = await fetch(
    `https://api.telegram.org/bot${bot_token}/getMe`,
  );
  if (!response.ok) {
    throw new Error(`Telegram API Error: ${response.statusText}`);
  }
  const data = await response.json();

  return data;
}

export async function getUpdates(): Promise<any> {
  const lastUpdateId = getLastUpdateId() + 1;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "User-Agent":
        "Telegram Bot SDK - (https://github.com/irazasyed/telegram-bot-sdk)",
      "content-type": "application/json",
    },
    body: JSON.stringify({ offset: lastUpdateId }),
  };
  const response = await fetch(
    `https://api.telegram.org/bot${bot_token}/getUpdates`,
    options,
  );
  if (!response.ok) {
    console.log("error in reading the messages");
  }
  const data = await response.json();
  return data;
}

export default async function sendMessage(
  chatId: number,
  msg: string,
): Promise<any> {
  const response = await fetch(
    `https://api.telegram.org/bot${bot_token}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Indicate the body format
      },
      body: JSON.stringify({ chat_id: chatId, text: msg }),
    },
  );
  if (!response.ok) {
    console.log("message not sent");
  }
  const data = await response.json();
  return data;
}
