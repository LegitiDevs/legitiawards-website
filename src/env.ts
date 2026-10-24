import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	MONGODB_URI: { schema: (input: any) => input ?? undefined },
	DB_NAME: { schema: (input: any) => input ?? undefined },
	ADMIN_PASSWORD: { schema: (input: any) => input ?? undefined },
});
