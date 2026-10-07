import { adminCollection } from "#lib/db.ts"
import type { AdminFlags } from "#lib/schemas/admin.ts"

const PUBLIC_FLAGS: Partial<keyof AdminFlags>[] = ["NOMINATIONS_OPEN", "VOTING_OPEN"]

/** Flags that can be shown to the public */
export const GET = async () => {
    const findResult = await adminCollection.findOne(
        { key: "FLAGS" },
        { projection: { _id: 0, ...Object.fromEntries(PUBLIC_FLAGS.map(v => [v, 1])) } }
    )

    return Response.json(findResult)
}