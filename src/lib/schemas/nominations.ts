import * as z from "zod";

export const NominationsSchema = z.object({
	foo: z.string(),
	bar: z.number(),
});
