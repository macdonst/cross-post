import {env} from 'node:process'
import {
	BlueskyStrategy,
	Client,
} from '@humanwhocodes/crosspost'
import type {PortableTextBlock, PortableTextChild} from 'sanity'

function toPlainText(blocks: PortableTextBlock[] = []): string {
  return blocks
    .map(block => {
      if (block._type !== 'block' || !Array.isArray(block.children)) {
        return '';
      }
      return block.children.map((child: PortableTextChild) => child.text).join('');
    })
    .join('\n\n');
}

// Typedefs for this function coming soon
export async function handler({context, event}) {
  const time = new Date().toLocaleTimeString()
  console.log(`👋 Your Sanity Function was called at ${time}`)

  const { doc } = event
  const { releaseDate, review, title } = doc
  const [date] = releaseDate.split("T")

  try {
    const bluesky = new BlueskyStrategy({
      identifier: env.BLUESKY_USERNAME || '',
      password: env.BLUESKY_PASSWORD || '',
      host: env.BLUESKY_HOST || '',
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
