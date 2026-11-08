// Generates values for Railway's Variables tab.
// Usage:  node tools/gen-secrets.mjs            -> prints both values
//         node tools/gen-secrets.mjs password   -> prints only the access password
//         node tools/gen-secrets.mjs secret     -> prints only the session secret
// Nothing is saved to disk. Copy the output straight into Railway.
import crypto from "node:crypto";

// 18 random bytes -> 24 URL-safe characters (letters, digits, - and _). Easy to paste, well over the 12-char minimum.
const password = () => crypto.randomBytes(18).toString("base64url");
// 32 random bytes -> 64 hex characters, over the 32-byte minimum.
const secret = () => crypto.randomBytes(32).toString("hex");

const which = (process.argv[2] || "").toLowerCase();
if (which === "password") console.log(password());
else if (which === "secret") console.log(secret());
else {
  console.log(`FIREMON_ACCESS_PASSWORD=${password()}`);
  console.log(`FIREMON_SESSION_SECRET=${secret()}`);
}
