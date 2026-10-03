import { MONGODB_URI, DB_NAME } from "$app/env/private";
import { MongoClient } from "mongodb";

if (MONGODB_URI == undefined) {
    throw new TypeError('Missing `MONGODB_URI` in private environment variables.');
}

if (DB_NAME == undefined) {
    throw new TypeError('Missing `DB_NAME` in private environment variables.');
}

export const client = new MongoClient(MONGODB_URI);
export const db = client.db(DB_NAME);
export const nominationsCollection = db.collection("nominations");
export const adminCollection = db.collection("admin");
