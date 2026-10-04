import { ADMIN_PASSWORD } from "$app/env/private";
import { error, type RequestEvent } from "@sveltejs/kit";
import { withSchema } from "#lib/utils/api.ts";
import { getFlag } from "#lib/utils/admin.ts";
import crypto from "node:crypto";

/** Submits nominations */
export const POST = withSchema(
    {},
    async ({ request, cookies, getClientAddress }) => {
        if (!(await getFlag("NOMINATIONS_OPEN"))) return error(403, "Nominations are closed.");

        const hasSubmitted = cookies.get("nominations.hasSubmitted") === "true";
        const hashed_ip = crypto.hash("sha256", getClientAddress(), 'hex');

        // First submit check - cookie check
        if (hasSubmitted) { return error(409, "Already submitted") }

        // Second submit check - see if hashed ip exists in DB.

        cookies.set("nominations.hasSubmitted", "true")

        return Response.json({ hashed_ip: crypto.hash("sha256", getClientAddress(), 'hex') });
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