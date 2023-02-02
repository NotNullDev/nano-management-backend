migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("howbra6dxqhlpf2")

  // remove
  collection.schema.removeField("87xs5e1j")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("howbra6dxqhlpf2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "87xs5e1j",
    "name": "projects",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": null,
      "collectionId": "pikg81feng8lsut",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
})
