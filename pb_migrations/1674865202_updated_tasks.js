migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hjsvo4ogrkk25ge")

  // remove
  collection.schema.removeField("b1fszux2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qk73czcm",
    "name": "activity",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "ttamzv0ap52o6qa",
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
    "id": "b1fszux2",
    "name": "name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("qk73czcm")

  return dao.saveCollection(collection)
})
