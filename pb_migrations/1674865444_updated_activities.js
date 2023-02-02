migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ttamzv0ap52o6qa")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ueony5ev",
    "name": "organization",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "howbra6dxqhlpf2",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ttamzv0ap52o6qa")

  // remove
  collection.schema.removeField("ueony5ev")

  return dao.saveCollection(collection)
})
