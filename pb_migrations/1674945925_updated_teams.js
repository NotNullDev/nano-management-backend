migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tbl6d29ioyh9lq4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kj3hewxl",
    "name": "project",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "pikg81feng8lsut",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tbl6d29ioyh9lq4")

  // remove
  collection.schema.removeField("kj3hewxl")

  return dao.saveCollection(collection)
})
