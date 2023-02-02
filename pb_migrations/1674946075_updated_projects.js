migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pikg81feng8lsut")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pevygkyp",
    "name": "tags",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": null,
      "collectionId": "7q24thwnsa8eu8b",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pikg81feng8lsut")

  // remove
  collection.schema.removeField("pevygkyp")

  return dao.saveCollection(collection)
})
