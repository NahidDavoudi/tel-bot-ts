export type ParsedMessage = {
  command: string;
  rawtext: string;
  args: string[];
};

export default function parseMessage(msg: string): ParsedMessage {
  const splitMessage: string[] = msg.split(" ");
  const command = splitMessage[0].toLowerCase().trim();
  const args = splitMessage.slice(1);
  let rawText = args.join(" ").trim();
  return { command: command, rawtext: rawText, args: args };
}
