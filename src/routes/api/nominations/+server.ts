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

        if (hasSubmitted) { 
            return error(409, "Already submitted") 
        }

        cookies.set("nominations.hasSubmitted", "true")

        if ((await nominationsCollection.findOne({ hashed_ip })) != null) {
            return error(409, "Already submitted");
        }

        // -- Submitting nominees

        const insertResult = await nominationsCollection.insertOne({
            ...body,
            hashed_ip
        })

        const submittedNominees = await nominationsCollection.findOne(
            { _id: insertResult.insertedId },
            { projection: { _id: 0, hashed_ip: 0 } },
        );

        console.log(insertResult)

        return Response.json(submittedNominees);
    }
)

/** ADMIN: Gets nomination submissions */
export const GET = withSchema({ password: ADMIN_PASSWORD }, async () => {
	return Response.json(await nominationsCollection.find({}).toArray())
});