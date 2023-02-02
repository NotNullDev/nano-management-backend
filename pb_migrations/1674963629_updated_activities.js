migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ttamzv0ap52o6qa")

  collection.listRule = "@request.auth.id = team.members.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ttamzv0ap52o6qa")

  collection.listRule = null

  return dao.saveCollection(collection)
})
