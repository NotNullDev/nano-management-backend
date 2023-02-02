migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tbl6d29ioyh9lq4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jd0i3l44",
    "name": "managers",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tbl6d29ioyh9lq4")

  // remove
  collection.schema.removeField("jd0i3l44")

  return dao.saveCollection(collection)
})
