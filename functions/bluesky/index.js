import {
	Client,
	BlueskyStrategy,
} from '@humanwhocodes/crosspost'
import {env} from 'node:process'

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

export async function handler({context, event}) {
  const time = new Date().toLocaleTimeString()
  console.log(`👋 Your Sanity Function was called at ${time}`)

  const { doc } = event
  const { releaseDate, review, title } = doc
  const [date] = releaseDate.split("T")

  try {
    const bluesky = new BlueskyStrategy({
      identifier: env.BLUESKY_USERNAME,
      password: env.BLUESKY_PASSWORD,
      host: env.BLUESKY_HOST,
    })
    const client = new Client({
      strategies: [bluesky],
    })
    await client.post(`${title}
Released: ${date}

${toPlainText(review)}`)
    console.log('sent review to bluesky')
  } catch (error) {
    console.log(error)
  }
}
