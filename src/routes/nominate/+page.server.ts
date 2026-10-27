import type { AdminFlags } from "#lib/schemas/admin.ts";
import { error, type ServerLoad } from "@sveltejs/kit";

export const prerender = false;

export const load: ServerLoad = async ({ cookies, fetch }) => {
  const flags: AdminFlags = await (await fetch("/api/flags")).json();
  const hasSubmitted = cookies.get("nominations.hasSubmitted") === "true";
  
  console.log("-----")
  console.log(cookies.get("nominations.hasSubmitted"))
  console.log(flags)

  if (!flags["NOMINATIONS_OPEN"]) {
    error(403, "Nominations are closed.")
  }

  if (hasSubmitted) {
    error(409, "Already submitted.")
  }
}