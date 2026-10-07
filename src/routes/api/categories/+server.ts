import { categories, categoryRegistry } from "#lib/schemas/categories.ts"
import z from "zod";

type CategoryMetadata = {
    type: string,
    title: string,
    description: string
}

export const GET = async () => {
    const categoriesJson: {
			order: string[];
			categories: { [k: string]: CategoryMetadata };
		} = {
			...categoryRegistry.get(categories.cla2027) as { order: string[] },
			categories: {},
		};

    const schemaShape = categories.cla2027.shape;
    
    for (const [key, schema] of Object.entries(schemaShape)) {
        categoriesJson.categories[key] = { ...categoryRegistry.get(schema) } as CategoryMetadata;

        if (schema instanceof z.ZodCustom) {
            // @ts-ignore
            categoriesJson.categories[key].type = schema.def.params["label"]
        } else if (schema instanceof z.ZodString) {
            categoriesJson.categories[key].type = "any"
        } else {
            throw new Error("Unsupported type")
        }
    }

    return Response.json(categoriesJson)
}