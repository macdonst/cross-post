# cross-post

A Sanity Functions Blueprint to enable cross posting to multiple services

## Description

This is an example project that shows multiple functions in the same repo that:

- Shares a common package.json file.
- TypeScript example `functions/bluesky`
- JavaScript example `functions/mastodon`

## Getting started

This example assumes you have already done the necessary steps in the [auto-summary](https://github.com/sanity-io/sanity/blob/main/examples/functions/auto-summary/README.md) example.

```bash
pnpm install
```

Note: you no longer need to go into each function directory in order to add a dependency.

## Testing Locally

You can test each function locally by running the following commands. This will execute the code of the function but there is a guard around the actually posting so it won't _actually_ post to Bluesky or Mastodon.

```bash
npx sanity functions test bluesky --document-id <doc id>
npx sanity functions test mastodon --document-id <doc id>
```

If the `dataset` can't be discovered by the CLI then add the `--dataset` flag.

```bash
npx sanity functions test bluesky --document-id <doc id> --dataset production
npx sanity functions test mastodon --document-id <doc id> --dataset production
```
