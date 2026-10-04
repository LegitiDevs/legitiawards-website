import { ADMIN_PASSWORD } from "$app/env/private";
import { adminCollection } from "#lib/db.ts";
import { AdminFlagsBodySchema } from "#lib/schemas/admin.ts";
import { withSchema } from "../../utils";

export const POST = withSchema(
    { body: AdminFlagsBodySchema, password: ADMIN_PASSWORD }, 
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