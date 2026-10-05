import { LEGITIMOOSE_API, PLAYERDB_MC, USER_AGENT_HEADER } from "#lib/constants.ts";
import * as z from "zod"

const WorldUuidSchema = z.union([z.literal("lobby"), z.uuid()])

type WorldUuid = "lobby" | (string & {});

export const WorldSchema = z.custom<WorldUuid>(async v => {
    if (v === "") { return false };

    const result = WorldUuidSchema.safeParse(v);
    if (!result.success) { return false };
    
    try {
        const response = await fetch(`${LEGITIMOOSE_API}/v4/worlds/${v}`);
        return response.ok
    } catch {
        return false
    }
}, {
    error: (iss) => `World '${iss.input ?? ''}' not found.`
})

export const PlayerSchema = z.custom<string>(async v => {
    if (v === "") { return false };

    const result = z.uuid().safeParse(v);
    if (!result.success) { return false };

    try {
        const response = await fetch(`${PLAYERDB_MC}/${v}`, { 
            headers: { "User-Agent": USER_AGENT_HEADER } 
        });
        return response.ok
    } catch {
        return false
    }
}, {
    error: (iss) => `Player '${iss.input ?? ''}' not found.`
})

export const ObjectIdSchema = z.string().regex(/[0-9a-fA-F]{24}/);