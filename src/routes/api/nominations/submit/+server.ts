import { adminCollection } from "#lib/db.ts";
import type { AdminFlags } from "#lib/schemas/admin.ts";
import { error } from "@sveltejs/kit";

export async function POST({ request }: { request: Request }) {
    const flags = await adminCollection.findOne({ key: "FLAGS" }) as AdminFlags;
    const IS_NOMINATIONS_OPEN = flags?.["NOMINATIONS_OPEN"];

    if (!IS_NOMINATIONS_OPEN) return error(403, "Nominations are closed.");

    return Response.json({ "_message": "yippe" })
}