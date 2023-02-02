migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pikg81feng8lsut")

  // remove
  collection.schema.removeField("jeqo67aa")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2rus9yx9",
    "name": "organization",
    "type": "relation",
    "required": true,
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
  const collection = dao.findCollectionByNameOrId("pikg81feng8lsut")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jeqo67aa",
    "name": "teams",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": null,
      "collectionId": "tbl6d29ioyh9lq4",
      "cascadeDelete": false
    }
  }))

  // remove
  collection.schema.removeField("2rus9yx9")

  return dao.saveCollection(collection)
})
