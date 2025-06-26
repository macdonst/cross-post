import { env } from "node:process";
import { BlueskyStrategy, Client } from "@humanwhocodes/crosspost";
import type { PortableTextBlock, PortableTextChild } from "sanity";

import { documentEventHandler } from "@sanity/functions";

function toPlainText(blocks: PortableTextBlock[] = []): string {
	return blocks
		.map((block) => {
			if (block._type !== "block" || !Array.isArray(block.children)) {
				return "";
			}
			return block.children
				.map((child: PortableTextChild) => child.text)
				.join("");
		})
		.join("\n\n");
}

interface NotificationData {
	releaseDate: string;
	review: PortableTextBlock[];
	title: string;
}

export const handler = documentEventHandler<NotificationData>(
	async ({ context, event }) => {
		const time = new Date().toLocaleTimeString();
		console.log(`👋 Your Sanity Function was called at ${time}`);

		const { data } = event;
		const { releaseDate, review, title } = data;

		console.log(title, "released", releaseDate);

		const [date] = releaseDate.split("T");

		try {
			const bluesky = new BlueskyStrategy({
				identifier: env.BLUESKY_USERNAME || "",
				password: env.BLUESKY_PASSWORD || "",
				host: env.BLUESKY_HOST || "bsky.social",
			});
			const client = new Client({
				strategies: [bluesky],
			});

			if (!context.local) {
				await client.post(`${title}
Released: ${date}

${toPlainText(review)}`);
				console.log("sent review to bluesky");
			}
		} catch (error) {
			console.log(error);
		}
	},
);
