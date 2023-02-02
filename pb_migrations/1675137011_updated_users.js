migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iwqnxkgj",
    "name": "teams",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "tbl6d29ioyh9lq4",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("iwqnxkgj")

  return dao.saveCollection(collection)
})
