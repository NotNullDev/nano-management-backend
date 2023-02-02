migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hjsvo4ogrkk25ge")

  collection.listRule = "user.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hjsvo4ogrkk25ge")

  collection.listRule = null

  return dao.saveCollection(collection)
})