import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const reviews = defineCollection({
    loader : glob({ base: "./src/content/reviews", pattern: "**/*.{md,mdx}" }),
    schema: z.object({
        author: z.string(),
        date: z.string(),
        profile_picture: z.string(),
        stars: z.string(),
    })
})

export const collections = { reviews }