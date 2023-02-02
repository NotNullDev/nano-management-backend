migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hjsvo4ogrkk25ge")

  collection.createRule = "user.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hjsvo4ogrkk25ge")

  collection.createRule = null

  return dao.saveCollection(collection)
})
