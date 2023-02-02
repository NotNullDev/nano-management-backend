migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tbl6d29ioyh9lq4")

  // remove
  collection.schema.removeField("s81p6u4v")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tbl6d29ioyh9lq4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s81p6u4v",
    "name": "deleted",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
