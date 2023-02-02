migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("howbra6dxqhlpf2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "geeul3em",
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
  const collection = dao.findCollectionByNameOrId("howbra6dxqhlpf2")

  // remove
  collection.schema.removeField("geeul3em")

  return dao.saveCollection(collection)
})
