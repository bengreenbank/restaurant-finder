import algoliasearch from 'algoliasearch'

export default (request, response) => {
  if (request.body) {
    const client = algoliasearch(
      process.env.VUE_APP_ALGOLIA_APP_ID,
      process.env.VUE_APP_ALGOLIA_ADMIN_KEY
    )

    const object = request.body.object

    // Get index to add object to.
    const index = client.initIndex('restaurant-finder_dev')

    index
      .saveObject(object)
      .then(() => {
        response.status(200).send(`${object.objectID} added to the index!`)
      })
      .catch((error) => {
        response.status(500).send(error)
      })
  } else {
    response.status(400).send('Please send an object to add to the index.')
  }
}
