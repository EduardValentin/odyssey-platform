import { defineCollection, z } from "astro:content";

const previewsCollection = defineCollection({
	schema: () => z.object({
		title: z.string(),
		index: z.number(),
	})

});

export const collections = {
	previews: previewsCollection,
};
