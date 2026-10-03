import * as z from "zod";

export const AdminFlagsBodySchema = z.object({
	NOMINATIONS_OPEN: z.boolean(),
}).partial();

export type AdminFlags = z.infer<typeof AdminFlagsBodySchema>