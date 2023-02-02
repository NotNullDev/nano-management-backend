migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ttamzv0ap52o6qa")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0wksxeuc",
    "name": "project",
    "type": "relation",
    "required": false,
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
  const collection = dao.findCollectionByNameOrId("ttamzv0ap52o6qa")

  // remove
  collection.schema.removeField("0wksxeuc")

  return dao.saveCollection(collection)
})
