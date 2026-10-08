import type { Votes } from "#lib/schemas/voting.ts";
import { PersistedState } from "runed";

type NominationsStore = {
    current_index: number,
    categories: Votes['categories']
}

export const nominationsStore = new PersistedState<NominationsStore>(
	"legitidevs.nominations",
	{
		current_index: 0,
		categories: {} as Votes["categories"]
	},
);