## Telegram Bot Boilerplate (TypeScript)

This repository contains a **Telegram bot boilerplate built with TypeScript**. The goal of the project is to provide a structured starting point for building Telegram bots with clear separation between networking, parsing, routing, handlers, and persistence.

Instead of placing all bot logic inside a single script, the project introduces a lightweight architecture that makes it easier to extend the bot with new commands or integrations.

The bot currently supports a small command set (`/ping`, `/echo`, `/note`, `/notes`) and demonstrates how to structure a polling-based Telegram bot service.

---

# Features

- Telegram Bot API integration
- Polling-based update processing
- Modular command routing
- Command parsing system
- SQLite persistence using `better-sqlite3`
- Extensible handler architecture

---

# Project Structure

```
src
 ├── bot.ts
 ├── parser.ts
 ├── router.ts
 ├── telegramClient.ts
 ├── store_state.ts
 └── handler
      ├── basic.ts
      └── notes.ts
```

| File | Responsibility |
|-----|------|
| bot.ts | Polling loop and update processing |
| parser.ts | Converts messages into structured commands |
| router.ts | Routes commands to appropriate handlers |
| telegramClient.ts | Handles Telegram API communication |
| store_state.ts | SQLite state management |
| handler/basic.ts | Basic commands (`/ping`, `/echo`, `/help`) |
| handler/notes.ts | Persistent note commands (`/note`, `/notes`) |

---

# Requirements

- Node.js 18+
- npm

---

# Setup

Install dependencies:

```
npm install
```

Create a `.env` file with your Telegram bot token:

```
BOT_TOKEN=your_telegram_bot_token
```

---

# Running the Bot

Start the development runtime:

```
npm run dev
```

The bot will start polling the Telegram API and begin processing messages.

---

# Available Commands

| Command | Description |
|------|------|
| `/ping` | Health check command |
| `/echo <text>` | Echoes back user input |
| `/note <text>` | Saves a persistent note |
| `/notes` | Lists stored notes |

---

# Example

```
/note buy milk
```

Response:

```
note buy milk is saved
```

```
/notes
```

Response:

```
Your notes:
1. buy milk
```



This architecture keeps the bot easy to extend and avoids mixing networking logic with command implementations.

---

# Future Improvements

Possible extensions for the boilerplate include:

- webhook-based deployment
- structured logging
- middleware support
- command permission systems
- external API integrations

---

# License

MIT
