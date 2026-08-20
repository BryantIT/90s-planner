import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requestPasswordResetSchema } from "@/lib/validation";
import {
  createResetToken,
  RESET_TOKEN_TTL_MS,
  sendPasswordResetEmail,
} from "@/lib/reset-token";

// Always returns 200 with the same generic message, whether or not the
// email is registered, so this endpoint can't be used to enumerate accounts.
const GENERIC_RESPONSE = {
  ok: true,
  message: "If that email is registered, a reset link has been sent.",
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = requestPasswordResetSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });

  if (user) {
    const { token, tokenHash } = createResetToken();
    await prisma.passwordResetToken.create({
      data: {
        tokenHash,
        userId: user.id,
        expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS),
      },
    });

    const resetUrl = new URL(
      `/reset-password/${token}`,
      request.url,
    ).toString();
    sendPasswordResetEmail(user.email, resetUrl);
  }

  return NextResponse.json(GENERIC_RESPONSE);
}
