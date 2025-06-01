import { z } from 'zod/v4';

export const craftMetaSchema = z.object({
  draft: z.boolean().optional(),
});
