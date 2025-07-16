import {env} from 'node:process'
import {
	Client,
	MastodonStrategy,
} from '@humanwhocodes/crosspost'
import { documentEventHandler } from '@sanity/functions'

export const handler = documentEventHandler(async ({context, event}) => {
  const { data = {} } = event
  const { title, autoSummary, slug } = data

  try {
    const mastodon = new MastodonStrategy({
      accessToken: env.MASTODON_TOKEN,
      host: env.MASTODON_HOST,
    })
    const client = new Client({
      strategies: [mastodon],
    })

		const postContent = `${title}

${autoSummary}

${slug.current}`

    // If testing locally don't actually post
    if (!context.local) {
      await client.post(postContent)
      console.log('sent post to mastodon')
    } else {
      console.log(postContent)
    }
  } catch (error) {
    console.log(error)
  }
})
