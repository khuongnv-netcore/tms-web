/* eslint-disable no-console */
const SentryCli = require('@sentry/cli')

async function createReleaseAndUpload() {
  const release = `${process.env.npm_package_name}@${process.env.npm_package_version}`
  const cli = new SentryCli()
  try {
    console.log('Creating sentry release:', release)
    await cli.releases.new(release)
    console.log('Uploading source maps')

    await cli.releases.setCommits(release, {
      auto: true,
    })

    await cli.releases.uploadSourceMaps(release, {
      include: ['build/static/js'],
      urlPrefix: '~/static/js',
      rewrite: false,
    })
    console.log('Finalizing release')
    await cli.releases.finalize(release)
  } catch (e) {
    console.error('Source maps uploading failed:', e)
  }
}
createReleaseAndUpload()
