migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hjsvo4ogrkk25ge")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5lnjcars",
    "name": "team",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "tbl6d29ioyh9lq4",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hjsvo4ogrkk25ge")

  // remove
  collection.schema.removeField("5lnjcars")

  return dao.saveCollection(collection)
})
