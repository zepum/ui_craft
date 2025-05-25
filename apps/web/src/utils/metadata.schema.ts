import { z } from 'zod/v4';

export const craftMetadataSchema = z.object({
  draft: z.boolean().optional(),
});
