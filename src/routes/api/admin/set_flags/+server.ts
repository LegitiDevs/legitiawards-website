import { ADMIN_PASSWORD } from "$app/env/private";
import { adminCollection } from "#lib/db.ts";
import { AdminFlagsBodySchema } from "#lib/schemas/admin.ts";
import { error } from "@sveltejs/kit";

// TODO: Clean up the whole thing to handle the validation more cleanly
export async function POST({ request }: { request: Request }) {
	const authorizationPassword = request.headers.get("Authorization");
    if (!authorizationPassword) return error(400, "Missing Headers");
    if (authorizationPassword !== ADMIN_PASSWORD) return error(401);

    let body;
    try {
        body = await request.json();
    } catch {
        return error(400, "Malformed JSON")
    }
    const flagsToSet = AdminFlagsBodySchema.safeParse(body);

    if (!flagsToSet.success) {
        return error(400, "Validation Error");
    }

    await adminCollection.updateOne(
        { key: "FLAGS" },
        { $set: flagsToSet.data },
        { upsert: true }
    )

    const flagsDocument = await adminCollection.findOne({ key: "FLAGS" }, { projection: {'_id': 0} })

    return Response.json(flagsDocument)
}
