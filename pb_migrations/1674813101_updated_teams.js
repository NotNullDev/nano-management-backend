migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tbl6d29ioyh9lq4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hi2yyued",
    "name": "members",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": null,
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tbl6d29ioyh9lq4")

  // remove
  collection.schema.removeField("hi2yyued")

  return dao.saveCollection(collection)
})
