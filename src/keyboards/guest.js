import { InlineKeyboard, Keyboard } from "grammy";

export function guestStartKeyboard() {
    return new InlineKeyboard()
        .row().text("🔗 Connect", "guest.connect").url("🌐 Website", "https://famoacademy.ir")
        .row().text("About Famo 💎");
}

export function contactKeyboard() {
  return new Keyboard()
    .requestContact("📱 Send phone number")
    .resized();
}