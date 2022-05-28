import algoliasearch from 'algoliasearch'

// I use serverless functions to ao avoid leaking the admin API key on the frontend - this is not recommended for security purposes.
// This function can handle an API request and provide a response.
// So I am able to send an API request from my frontend application to here.
// This API request runs the code with the admin API key in - this way, the browser never sees the admin key.

export default (request, response) => {
  if (request.body) {
    // We initialise the client here, instead of on the frontend.
    const client = algoliasearch(
      process.env.VUE_APP_ALGOLIA_APP_ID,
      process.env.VUE_APP_ALGOLIA_ADMIN_KEY
    )

    // Avoid repetitive querying of request object.
    let objectID = request.body.objectID

    // Get index to delete object from
    const index = client.initIndex('restaurant-finder_dev')

    // Delete object from index: https://www.algolia.com/doc/api-reference/api-methods/delete-objects/
    index
      .deleteObject(objectID)
      // If the promise is fulfilled, we can say that the item has been deleted.
      .then(() => {
        response.status(200).send(`${objectID} deleted from index!`)
      })
      // If Algolia returns an error, we need to return that same error to our frontend app
      .catch((error) => {
        response.status(500).send(error)
      })
  } else {
    response.status(400).send('Please send an object to delete from the index.')
  }
}
