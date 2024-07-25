import { defineCollection, z } from "astro:content";

const curriculum = defineCollection({
  type: "data",
  schema: () =>
    z.object({
      title: z.string(),
      index: z.number(),
      items: z.array(
        z.object({
          name: z.string(),
          content: z.string(),
        }),
      ),
    }),
});

export const collections = {
  curriculum,
};
