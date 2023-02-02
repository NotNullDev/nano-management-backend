migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hjsvo4ogrkk25ge")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tia6qxbi",
    "name": "duration",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hjsvo4ogrkk25ge")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tia6qxbi",
    "name": "durationMin",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
