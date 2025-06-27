import {env} from 'node:process'
import {
	Client,
	MastodonStrategy,
} from '@humanwhocodes/crosspost'
import { documentEventHandler } from '@sanity/functions'

function toPlainText(blocks = []) {
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      return block.children.map(child => child.text).join('')
    })
    .join('\n\n')
}

export const handler = documentEventHandler(async ({context, event}) => {
  const time = new Date().toLocaleTimeString()
  console.log(`👋 Your Sanity Function was called at ${time}`)

  const { data = {} } = event
  const { releaseDate, review, title } = data

	console.log(title, "released", releaseDate);

  const [date] = releaseDate.split("T")

  try {
    const mastodon = new MastodonStrategy({
      accessToken: env.MASTODON_TOKEN,
      host: env.MASTODON_HOST,
    })
    const client = new Client({
      strategies: [mastodon],
    })

    if (!context.local) {
    await client.post(`${title}
Released: ${date}

${toPlainText(review)}`)
    console.log('sent review to mastodon')
    }
  } catch (error) {
    console.log(error)
  }
})
