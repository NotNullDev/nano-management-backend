migrate((db) => {
  const collection = new Collection({
    "id": "7q24thwnsa8eu8b",
    "created": "2023-01-27 10:14:42.495Z",
    "updated": "2023-01-27 10:14:42.495Z",
    "name": "tags",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "nfc5rjp6",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("7q24thwnsa8eu8b");

  return dao.deleteCollection(collection);
})
