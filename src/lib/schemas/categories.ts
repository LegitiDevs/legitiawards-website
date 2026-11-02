import * as z from "zod";
import { PlayerSchema, WorldSchema } from "./generic.ts";

type CategoryRegistry = {
    title: string,
    description: string,
} | {
    order: string[]
}
export const categoryRegistry = z.registry<CategoryRegistry>();

export const categories = {
	cla2027: z
		.object({
			// World Categories
			world_of_the_year: WorldSchema.clone().register(categoryRegistry, {
				title: "World of the Year",
				description: "The world that stands out in all aspects of creative, community, and technical fields and defines the best world of the year.",
			}),
			most_innovative: WorldSchema.clone().register(categoryRegistry, {
				title: "Most Innovative",
				description: "The world that advances the state of mapmaking and pushes the boundary of what a 'Minecraft Map' can be.",
			}),
			best_in_aesthetics: WorldSchema.clone().register(categoryRegistry, {
				title: "Best in Aesthetics",
				description: "The world that has the most captivating and visually impressive art direction, from its ambiance and builds to its textures and every other visual detail.",
			}),
			best_in_fun: WorldSchema.clone().register(categoryRegistry, {
				title: "Best in Fun",
				description: "The world that best provides the most enjoyment and amusement to players, whether it's a party game, a puzzle game, or any kind of fun game.",
			}),
			best_in_tech: WorldSchema.clone().register(categoryRegistry, {
				title: "Best in Tech",
				description: "The world that best harnesses all the data packing elements and its jankiness to create technically impressive works that makes you wonder if it's really all just data packs.",
			}),
			most_captivating_world: WorldSchema.clone().register(categoryRegistry, {
				title: "Most Captivating World",
				description: "The world that successfully gets its players hooked into its captivating gameplay making them come back and play again every single day.",
			}),
			still_playing: WorldSchema.clone().register(categoryRegistry, {
				title: "Still Playing",
				description: "The world that has been a staple in Legitimoose and has people still playing it after a long time since its release.",
			}),
			best_fighting: WorldSchema.clone().register(categoryRegistry, {
				title: "Best Fighting",
				description: "The world that best captures the essence of what a fighting game is.",
			}),
			best_party_game: WorldSchema.clone().register(categoryRegistry, {
				title: "Best Party Game",
				description: "The best world to play with a group which perfectly utilizes the multiplayer aspect of legitimoose.com.",
			}),
			best_sandbox_game: WorldSchema.clone().register(categoryRegistry, {
				title: "Best Sandbox Game",
				description: "The world that makes the best use of players' creative freedom, whether it be simulators, agents, parkour, building, skyblocks, or even something new.",
			}),

			// Player Categories
			creator_of_the_year: PlayerSchema.clone().register(categoryRegistry, {
				title: "Creator of the Year",
				description: "The ultimate player who has excellent expertise in making or collaborating in marvelous creations.",
			}),
			best_team: z.string().clone().register(categoryRegistry, {
				title: "Best Team",
				description: "The team of creators that have worked together and combined their creativity and talent to make amazing creations.",
			}),
			best_developer: PlayerSchema.clone().register(categoryRegistry, {
				title: "Best Developer",
				description: "The player who has the best expertise in handling the backend and logic of creations to fuel its magic and create functional experiences.",
			}),
			best_artist: PlayerSchema.clone().register(categoryRegistry, {
				title: "Best Artist",
				description: "The player with the most remarkable artistic skill, transforming an empty world into a surreal landscape of sight and sound.",
			}),
			best_promising_player: PlayerSchema.clone().register(categoryRegistry, {
				title: "Best Promising Player",
				description: "The player who has recently achieved a significant breakthrough in community perception and has made creations that impacted legitimoose.com.",
			}),
			communitys_voice: PlayerSchema.clone().register(categoryRegistry, {
				title: "Community's Voice",
				description: "The player the community wants to celebrate for their positive impact and contributions for the Legitimoose community.",
			}),
		})
		.register(categoryRegistry, {
			order: [
				"communitys_voice",
				"best_promising_player",
				"best_artist",
				"best_developer",
				"best_team",
				"creator_of_the_year",
				"still_playing",
				"most_captivating_world",
				"best_sandbox_game",
				"best_party_game",
				"best_fighting",
				"best_in_tech",
				"best_in_fun",
				"best_in_aesthetics",
				"most_innovative",
				"world_of_the_year",
			],
		}),
};