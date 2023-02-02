migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hjsvo4ogrkk25ge")

  collection.listRule = "user.id = @request.auth.id\n|| (\n  team.managers.id = @request.auth.id\n)"
  collection.updateRule = "user.id = @request.auth.id\n|| (\n  team.managers.id = @request.auth.id\n)"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hjsvo4ogrkk25ge")

  collection.listRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
