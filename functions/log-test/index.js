export async function handler({context, event}) {
  const time = new Date().toLocaleTimeString()
  console.log(`👋 Your Sanity Function was called at ${time}`)
  console.log('first log')
  console.log('second log')
  console.log('third log')
  console.log('fourth log')
  console.log('fifth log')
  console.log('sixth log')
}
