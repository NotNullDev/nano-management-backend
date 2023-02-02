migrate((db) => {
  const collection = new Collection({
    "id": "pikg81feng8lsut",
    "created": "2023-01-27 09:54:40.621Z",
    "updated": "2023-01-27 09:54:40.621Z",
    "name": "projects",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "7eqyousa",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
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
      },
      {
        "system": false,
        "id": "re4llkym",
        "name": "deleted",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
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
  const collection = dao.findCollectionByNameOrId("pikg81feng8lsut");

  return dao.deleteCollection(collection);
})
