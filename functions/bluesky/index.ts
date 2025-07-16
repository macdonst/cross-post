import { env } from "node:process"
import { BlueskyStrategy, Client } from "@humanwhocodes/crosspost"

import { documentEventHandler } from "@sanity/functions"

interface NotificationData {
	slug: Record<string, undefined>
	autoSummary: string
	title: string
}

export const handler = documentEventHandler<NotificationData>(
	async ({ context, event }) => {
		console.log(context, event)
		console.log('bluesky')
		/*
		const { data } = event
		const { title, autoSummary, slug } = data

		try {
			const bluesky = new BlueskyStrategy({
				identifier: env.BLUESKY_USERNAME || "",
				password: env.BLUESKY_PASSWORD || "",
				host: env.BLUESKY_HOST || "bsky.social",
			})
			const client = new Client({
				strategies: [bluesky],
			})

			const postContent = `${title}

${autoSummary}

${slug.current}`

			// If testing locally don't actually post
			if (!context.local) {
				await client.post(postContent)
				console.log("sent post to bluesky")
			} else {
				console.log(postContent)
			}
		} catch (error) {
			console.log(error)
		}
			*/

		return {
			"stuff": true
		}
	},
)
