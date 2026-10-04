import { ADMIN_PASSWORD } from "$app/env/private";
import { adminCollection } from "#lib/db.ts";
import { withSchema } from "../../utils";

export const POST = withSchema({ password: ADMIN_PASSWORD }, async () => {
	const flagsDocument = await adminCollection.findOne({ key: "FLAGS" });
	return Response.json(flagsDocument);
});
