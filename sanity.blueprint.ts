import { defineBlueprint, defineDocumentFunction } from "@sanity/blueprints"

export default defineBlueprint({
	resources: [
		defineDocumentFunction({
			name: "bluesky",
			event: {
				on: ["publish"],
				filter: "_type == 'post' && defined(autoSummary)",
				projection: "title, autoSummary, slug",
			},
		}),
		defineDocumentFunction({
			name: "mastodon",
			event: {
				on: ["publish"],
				filter: "_type == 'post' && defined(autoSummary)",
				projection: "title, autoSummary, slug",
			},
		}),
	],
})
