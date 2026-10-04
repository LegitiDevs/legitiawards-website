import { ADMIN_PASSWORD } from "$app/env/private";
import { adminCollection } from "#lib/db.ts";
import { AdminFlagsSchema } from "#lib/schemas/admin.ts";
import { withSchema } from "#lib/utils/api.ts";

export const GET = withSchema({ password: ADMIN_PASSWORD }, async () => {
	const flagsDocument = await adminCollection.findOne({ key: "FLAGS" });
	return Response.json(flagsDocument);
});

export const POST = withSchema(
    { 
        body: AdminFlagsSchema, 
        password: ADMIN_PASSWORD 
    }, 
    async ({ body }) => {
        await adminCollection.updateOne(
            { key: "FLAGS" },
            { $set: body },
            { upsert: true }
        )

        const flagsDocument = await adminCollection.findOne({ key: "FLAGS" })

        return Response.json(flagsDocument)
    }
);