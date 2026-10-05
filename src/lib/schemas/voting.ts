import { CURRENT_EVENT } from "#lib/constants.ts";
import * as z from "zod"
import { categories } from "./categories";

export const VotesSchema = z.object({
    event_id: z.literal(CURRENT_EVENT),
    categories: categories[CURRENT_EVENT]
})

export type Votes = z.infer<typeof VotesSchema>