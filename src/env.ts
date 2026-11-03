import { building } from '$app/env';
import { defineEnvVars } from '@sveltejs/kit/env';
import * as z from 'zod';

export const variables = defineEnvVars({
	MONGODB_URI: { schema: building ? z.optional(z.string()) : z.string() },
	DB_NAME: { schema: building ? z.optional(z.string()) : z.string() },
	ADMIN_PASSWORD: { schema: building ? z.optional(z.string()) : z.string() },
});
