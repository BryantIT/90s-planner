import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/auth", () => ({
  auth: vi.fn().mockResolvedValue(null),
}));

import Home from "./page";

describe("Home", () => {
  it("renders the app name", async () => {
    render(await Home());
    expect(
      screen.getByRole("heading", { name: "90s Planner" }),
    ).toBeInTheDocument();
  });
});
