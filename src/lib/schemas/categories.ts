import * as z from "zod";
import { PlayerSchema, WorldSchema } from "./generic.ts";

export const categories = {
    "cla2027": z.object({
        world_of_the_year: WorldSchema,
        best_fighting: WorldSchema,
        best_music: WorldSchema,
        best_solo_developer: PlayerSchema,
        best_team: z.string(),
    })
}