import { z } from 'zod';

import { envSchema } from '../validations/env-vars.schema';

const envVariables: Partial<Record<keyof z.infer<typeof envSchema>, unknown>> =
	{
		IS_PWA_ENABLED: import.meta.env.VITE_IS_PWA_ENABLED,
		IS_PWA_DEV_ENABLED: import.meta.env.VITE_IS_PWA_DEV_ENABLED,
	};

if (import.meta.env.MODE === 'production') {
	const undefinedList: string[] = [];
	Object.entries(envVariables).forEach(([key, val]) => {
		if (val === undefined) {
			undefinedList.push(key);
		}
	});
	if (undefinedList.length > 0) {
		throw new Error(
			`${undefinedList.join(', ')} ${
				undefinedList.length > 1 ? 'are' : 'is'
			} undefined`,
		);
	}
}

export const ENV = envSchema.parse(envVariables);
