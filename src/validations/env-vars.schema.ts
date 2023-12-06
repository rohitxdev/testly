import { z } from 'zod';

export const envSchema = z
	.object({
		IS_PWA_ENABLED: z.union([
			z.literal('true'),
			z.literal('false'),
			z.undefined(),
		]),
		IS_PWA_DEV_ENABLED: z.union([
			z.literal('true'),
			z.literal('false'),
			z.undefined(),
		]),
	})
	.transform((val) => ({
		...val,
		IS_PWA_ENABLED: val.IS_PWA_ENABLED === 'true',
		IS_PWA_DEV_ENABLED: val.IS_PWA_DEV_ENABLED === 'true',
	}));
