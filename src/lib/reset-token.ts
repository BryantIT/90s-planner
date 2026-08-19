import { createHash, randomBytes } from "crypto";

export const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

export function createResetToken() {
  const token = randomBytes(32).toString("hex");
  const tokenHash = hashResetToken(token);
  return { token, tokenHash };
}

export function hashResetToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * No email provider is configured yet (see DEVELOPMENT_PLAN.md Phase 2) —
 * logging the link is the stand-in until one's wired up.
 */
export function sendPasswordResetEmail(email: string, resetUrl: string) {
  console.log(`[password reset] ${email} -> ${resetUrl}`);
}
