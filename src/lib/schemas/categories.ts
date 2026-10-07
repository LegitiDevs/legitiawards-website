import * as z from "zod";
import { PlayerSchema, WorldSchema } from "./generic.ts";

type CategoryRegistry = {
    title: string,
    description: string
}
export const categoryRegistry = z.registry<CategoryRegistry>();

export const categories = {
	cla2027: z.object({
		world_of_the_year: WorldSchema.register(categoryRegistry, {
            title: "World of the Year",
			description: "WOTY Description",
		}),
		best_fighting: WorldSchema.register(categoryRegistry, {
            title: "Best Fighting",
			description: "Description for Best Fighting",
		}),
		best_music: WorldSchema.register(categoryRegistry, {
            title: "Best Music",
			description: "Music Description Best",
		}),
		player_of_the_year: PlayerSchema.register(categoryRegistry, {
            title: "Player of the Year",
			description: "who's the goatest of them all",
		}),
		best_team: z.string().register(categoryRegistry, {
            title: "Best Team",
			description: "a.k.a literally just whos the best jam team",
		}),
	}),
};