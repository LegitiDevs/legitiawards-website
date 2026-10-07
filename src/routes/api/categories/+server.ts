import { categories, categoryRegistry } from "#lib/schemas/categories.ts"
import z from "zod";

type CategoryMetadata = {
    type: string,
    title: string,
    description: string
}

export const GET = async () => {
    const categoriesJson: {[k: string]: CategoryMetadata} = {};

    const schemaShape = categories.cla2027.shape;
    
    for (const [key, schema] of Object.entries(schemaShape)) {
        categoriesJson[key] = { ...categoryRegistry.get(schema) } as CategoryMetadata;

        if (schema instanceof z.ZodCustom) {
            // @ts-ignore
            categoriesJson[key].type = schema.def.params["label"]
        } else if (schema instanceof z.ZodString) {
            categoriesJson[key].type = "any"
        } else {
            throw new Error("Unsupported type")
        }
    }

    return Response.json(categoriesJson)
}