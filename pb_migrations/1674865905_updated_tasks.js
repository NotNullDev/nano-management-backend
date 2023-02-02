migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hjsvo4ogrkk25ge")

  // remove
  collection.schema.removeField("c1h2rgyc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jdyu5syc",
    "name": "user",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hjsvo4ogrkk25ge")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c1h2rgyc",
    "name": "team",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "tbl6d29ioyh9lq4",
      "cascadeDelete": false
    }
  }))

  // remove
  collection.schema.removeField("jdyu5syc")

  return dao.saveCollection(collection)
})
