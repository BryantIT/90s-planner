import { describe, expect, it } from "vitest";
import { createResetToken, hashResetToken } from "./reset-token";

describe("reset tokens", () => {
  it("produces a token whose hash matches hashResetToken", () => {
    const { token, tokenHash } = createResetToken();
    expect(hashResetToken(token)).toBe(tokenHash);
  });

  it("produces unique tokens each time", () => {
    const a = createResetToken();
    const b = createResetToken();
    expect(a.token).not.toBe(b.token);
  });
});
