import { error, type RequestEvent } from "@sveltejs/kit";
import { createHash, timingSafeEqual } from "node:crypto";
import * as z from "zod";

type RouteSchema = {
    body?: z.ZodType;
    querystring?: z.ZodType;
    password?: string;
};

type Parsed<Schema extends RouteSchema> = {
    body: Schema extends { body: z.ZodType } ? z.output<Schema["body"]> : undefined;
    query: Schema extends { querystring: z.ZodType }
        ? z.output<Schema["querystring"]>
        : undefined;
};

const sha256 = (str: string) => createHash("sha256").update(str).digest();

/**
 * Adds a schema validator to a Request Handler
 */
export function withSchema<
    Schema extends RouteSchema,
    Event extends RequestEvent = RequestEvent,
>(
    schema: Schema,
    handler: (event: Event & Parsed<Schema>) => Response | Promise<Response>,
) {
    return async (event: Event): Promise<Response> => {
        if (schema.password) {
            const authHeader = event.request.headers.get("Authorization");
            if (!authHeader) return error(401);
            if (!timingSafeEqual(sha256(authHeader), sha256(schema.password))) return error(401);
        }

        let body: unknown;
        let query: unknown;

        if (schema.body) {
            let raw: unknown;

            try {
                raw = await event.request.json();
            } catch {
                return error(400, "Malformed JSON");
            }

            const result = schema.body.safeParse(raw);
            if (!result.success) return error(400, z.prettifyError(result.error))
            body = result.data;
        }

        if (schema.querystring) {
            const result = schema.querystring.safeParse(
                Object.fromEntries(event.url.searchParams),
            );
            if (!result.success) return error(400, z.prettifyError(result.error));
            query = result.data;
        }

        const newEvent = Object.assign(event, { body, query }) as Event & Parsed<Schema>;

        return handler(newEvent);
    };
}