import { env } from "$env/dynamic/private";
import { MongoClient } from "mongodb";

if (env.MONGODB_URI == undefined) {
    throw new TypeError('Missing `MONGODB_URI` in private environment variables.')
}

if (env.DB_NAME == undefined) {
    throw new TypeError('Missing `DB_NAME` in private environment variables.')
}

export const client = new MongoClient(env.MONGODB_URI)
export const db = client.db(env.DB_NAME)
export const legitiawardsCollection = db.collection("legitiawards")