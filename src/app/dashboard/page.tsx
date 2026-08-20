import { auth } from "@/auth";
import { LogoutButton } from "@/components/LogoutButton";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="flex flex-1 flex-col gap-6 px-6 py-16">
      <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome{session?.user?.name ? `, ${session.user.name}` : ""}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          {session?.user?.email}
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          This is a placeholder dashboard — the planner itself lands in
          Phase 4.
        </p>
        <LogoutButton />
      </div>
    </div>
  );
}
