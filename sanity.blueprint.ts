import { defineBlueprint, defineDocumentFunction } from "@sanity/blueprints";

export default defineBlueprint({
	resources: [
		defineDocumentFunction({ name: "bluesky" }),
		defineDocumentFunction({
			name: "mastodon",
			event: {
				on: ["publish"],
				filter: "",
				projection: "",
			},
		}),
	],
});
