import { ObjectIdSchema } from "#lib/schemas/generic.ts";
import { defineParams } from "@sveltejs/kit/params";

export const params = defineParams({
    uuid: ObjectIdSchema
})