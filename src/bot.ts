import { setLastUpdateId } from "./store_state.js";
import handleMessage from "./router.js";
import { getUpdates, checkTelegram } from "./telegramClient.js";

// Helper to pause execution
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function processUpdates(data: any) {
  if (data.ok === true) {
    try {
      const result: any[] = data.result;

      if (result.length === 0) {
        console.log("no messages to display");
        return;
      }
      for (const res of result) {
        if (
          !res.message ||
          !res.message.text ||
          !res.message.chat.id ||
          !res.update_id
        ) {
          continue;
        }
        const from = res.message.from.first_name;
        const to = res.message.chat.first_name;
        const msg_text = res.message.text;
        const update_id = res.update_id;
        console.log(
          `${update_id} \n From: ${from} \n To: ${to} \n Message: ${msg_text}`,
        );
        const chat_id = res.message.chat.id;
        await handleMessage(chat_id, msg_text, update_id);
      }
      const lastUpdateId = result[result.length - 1].update_id;
      setLastUpdateId(lastUpdateId);
    } catch (error) {
      // 2. CATCH: If anything above fails, run this instead
      console.log(`Something went wrong! ${error}`);
    }
  }
}

async function main() {
  try {
    console.log("Fetching bot info...");
    const res = await checkTelegram();
    console.log("Success:", res);
    while (true) {
      if (res.ok === true) {
        const data = await getUpdates();
        await processUpdates(data);
      }

      await sleep(2000);
    }
  } catch (error) {
    console.error("Failed to fetch:", error);
  }
}

main();
