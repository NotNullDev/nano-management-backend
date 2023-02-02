migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pikg81feng8lsut")

  collection.listRule = "@collection.teams.project.id ?= id && \n@collection.teams.members.id ?= @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pikg81feng8lsut")

  collection.listRule = null

  return dao.saveCollection(collection)
})
