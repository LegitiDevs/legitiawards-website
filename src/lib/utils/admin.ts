import { adminCollection } from "#lib/db.ts";
import type { AdminFlags } from "#lib/schemas/admin.ts";

export async function getFlag(flagName: keyof AdminFlags) {
    const flags = (await adminCollection.findOne({ key: "FLAGS" })) as AdminFlags;
    return flags[flagName] ?? false;
}