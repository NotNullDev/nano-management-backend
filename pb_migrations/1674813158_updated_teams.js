migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tbl6d29ioyh9lq4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "beenjei8",
    "name": "deleted",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tbl6d29ioyh9lq4")

  // remove
  collection.schema.removeField("beenjei8")

  return dao.saveCollection(collection)
})
