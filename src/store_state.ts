import Database from "better-sqlite3";
const db = new Database("state.db");

// Initialize the table immediately
db.exec(`
  CREATE TABLE IF NOT EXISTS state (
    key TEXT PRIMARY KEY,
    value INTEGER
  );
  INSERT OR IGNORE INTO state (key, value) VALUES ('last_update_id', 0);
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS notes (
    update_id TEXT PRIMARY KEY,
    chat_id INTEGER,
    text TEXT,
    created_at INTEGER DEFAULT (unixepoch())
  );    
`);

// Export the functions
export function getLastUpdateId() {
  const row = db
    .prepare("SELECT value FROM state WHERE key = ?")
    .get("last_update_id");
  return row ? row.value : 0;
}

export function setLastUpdateId(id: number) {
  return db
    .prepare("UPDATE state SET value = ? WHERE key = ?")
    .run(id, "last_update_id");
}

export function setNotes(update_id: number, raw_text: string, chat_id: number) {
  return db
    .prepare("INSERT INTO notes(update_id, chat_id, text) VALUES(?,?,?)")
    .run(update_id, chat_id, raw_text);
}

export function getNotes(chat_id: number): [] {
  const row = db
    .prepare(
      "SELECT text FROM notes WHERE chat_id = ? ORDER BY created_at DESC LIMIT 10",
    )
    .all(chat_id);
  return row ? row : 0;
}

process.on("SIGINT", () => {
  console.log("\nShutting down safely...");
  db.close(); // Closes the better-sqlite3 connection
  process.exit(0);
});
