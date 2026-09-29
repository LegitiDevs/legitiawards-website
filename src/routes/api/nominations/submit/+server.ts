import { json, error } from "@sveltejs/kit";

export async function POST({ request }: { request: Request }) {
    try {
        return json(await request.json())
    } catch {
        throw error(400)
    }
}