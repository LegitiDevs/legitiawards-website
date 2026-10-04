import { ADMIN_PASSWORD } from "$app/env/private";
import { error } from "@sveltejs/kit";
import { withSchema } from "#lib/utils/api.ts";
import { getFlag } from "#lib/utils/admin.ts";
import crypto from "node:crypto";
import { nominationsCollection } from "#lib/db.ts";
import { VotesSchema } from "#lib/schemas/voting.ts";

/** Submits nominations */
export const POST = withSchema(
    { body: VotesSchema },
    async ({ body, cookies, getClientAddress }) => {

        // -- Authorization

        if (!(await getFlag("NOMINATIONS_OPEN"))) {
            return error(403, "Nominations are closed.")
        }

        const hasSubmitted = cookies.get("nominations.hasSubmitted") === "true";
        const hashed_ip = crypto.hash("sha256", getClientAddress(), 'hex');

        // Check if they alr submitted by checking cookies or seeing if their ip is in the DB.
        if (hasSubmitted || await nominationsCollection.findOne({ hashed_ip })) { 
            return error(409, "Already submitted") 
        }

        cookies.set("nominations.hasSubmitted", "true")

        return Response.json(body);
    }
)

/** ADMIN: Deletes a nomination submission */
export const DELETE = withSchema({ password: ADMIN_PASSWORD }, async () => {
	return Response.json("Not implemented.");
});

/** ADMIN: Gets nomination submissions */
export const GET = withSchema({ password: ADMIN_PASSWORD }, async () => {
	return Response.json("Not implemented.");
});