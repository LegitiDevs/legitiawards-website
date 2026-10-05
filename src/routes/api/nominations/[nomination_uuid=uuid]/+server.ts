import { ADMIN_PASSWORD } from "$app/env/private";
import { error } from "@sveltejs/kit";
import { nominationsCollection } from "#lib/db.ts";
import { withSchema } from "#lib/utils/api.ts";
import { ObjectId } from "mongodb";

/** ADMIN: Deletes a nomination submission */
export const DELETE = withSchema(
	{ password: ADMIN_PASSWORD },
	async ({ params }) => {
		const deleteResult = await nominationsCollection.deleteOne({
			_id: new ObjectId(params.nomination_uuid),
		});

		if (deleteResult.deletedCount == 0) {
			return error(404, "Document not found.");
		}

		return Response.json(deleteResult);
	},
);

/** ADMIN: Gets a nomination submission */
export const GET = withSchema(
    { password: ADMIN_PASSWORD }, 
    async ({ params }) => {
        const findResult = await nominationsCollection.findOne({ _id: new ObjectId(params.nomination_uuid) })

        if (findResult == null) {
            return error(404, "Document not found.")
        }

        return Response.json(findResult)
    }
);