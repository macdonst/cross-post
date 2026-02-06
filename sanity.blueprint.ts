import { defineBlueprint, defineDocumentFunction, defineMediaLibraryAssetFunction } from "@sanity/blueprints"

export default defineBlueprint({
	resources: [
		defineDocumentFunction({
			name: "bluesky",
			src: './functions/bluesky/index.ts',
			event: {
				on: ["create", "update"],
				filter: "_type == 'post' && defined(autoSummary)",
				projection: "{title, autoSummary, slug}",
			},
		}),
		defineDocumentFunction({
			name: "mastodon",
			event: {
				on: ["create", "update"],
				// filter: "_type == 'post' && defined(autoSummary)",
				// filter: "_type == 'post' && defined(autoSummary)",
				projection: "{title, autoSummary, slug}",
			},
		}),
		/*
		defineDocumentFunction({
			name: "title-case",
			event: {
				on: ["publish"],
				filter: "_type == 'sanity.asset'",
				projection: "{_id, title}",
			},
		}),
		*/
		/*
		defineScheduleFunction({
			event: {
				// expression: '* * * * *'
				minute: "0",
				hour: '*',
				dayOfWeek: '*',
				month: '*',
				dayOfMonth: '*',
			},
			token: "$ref/mytoken"
		}),
		defineRobotToken({
			name: "mytoken",
			role: "viewer"
		})
			*/
	],
})
