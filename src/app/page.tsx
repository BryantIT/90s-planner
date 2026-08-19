import Link from "next/link";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-zinc-50 px-6 text-center dark:bg-black">
      <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
        90s Planner
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">Under construction.</p>
      {session?.user ? (
        <Link href="/dashboard" className="underline">
          Go to dashboard
        </Link>
      ) : (
        <div className="flex gap-4">
          <Link href="/login" className="underline">
            Log in
          </Link>
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
}
