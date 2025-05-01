# cross-post

A Sanity Functions Blueprint to enable cross posting to multiple services

## Description

This is an example project that shows multiple functions in the same repo that:

- Shares a common package.json file.
- TypeScript example `functions/bluesky`
- JavaScript example `functions/mastodon`

## Getting started

```bash
pnpm install
```

Note: you no longer need to go into each function directory in order to add a dependency.

## Bundling

TypeScript functions will be bundled by default. Bundling for JavaScript functions is opt-in. In order to opt-in add `bundle: true` to your function definition in `blueprint.json`.

Example:

```diff
{
    "displayName": "mastodon",
    "name": "mastodon",
    "type": "sanity.function.document-publish",
    "src": "functions/mastodon",
    "event": {
        "on": "update",
        "filter": "popularity > 100",
        "projection": "title, releaseDate, review"
    },
+   "bundle": true
}
```

Bundling is triggered under these three circumstances:

- `npx sanity-run functions test bluesky`
- `npx sanity-run functions dev`
- `npx sanity-run blueprints deploy`

That is bundling happens before you invoke your function locally or deploy to Sanity infrastructure.
