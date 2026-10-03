import { db } from "#lib/db.ts";
import { error } from "@sveltejs/kit";

export async function POST({ request }: { request: Request }) {
    try {
        return Response.json(await request.json())
    } catch {
        throw error(400)
    }
}

export async function GET() {
    const worlds = await db.collection("worlds").findOne({ world_uuid: "lobby" })
    return Response.json(worlds)
}