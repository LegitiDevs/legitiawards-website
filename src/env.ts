import { defineEnvVars } from '@sveltejs/kit/env';

// @migration-task Review usage of dynamic environment variables. They fall back to the empty string if not present, which may not be what you want.
export const variables = defineEnvVars({
	MONGODB_URI: { schema: (input: any) => input ?? undefined },
	DB_NAME: { schema: (input: any) => input ?? undefined },
	ADMIN_PASSWORD: { schema: (input: any) => input ?? undefined },
});
