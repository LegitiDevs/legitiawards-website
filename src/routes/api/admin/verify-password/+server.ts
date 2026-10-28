import { withSchema } from "#lib/utils/api.ts";
import { ADMIN_PASSWORD } from "$app/env/private";

export const POST = withSchema(
  { password:  ADMIN_PASSWORD }, 
  () => { return new Response(null, {status: 204}) }
);