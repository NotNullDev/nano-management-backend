migrate((db) => {
  const collection = new Collection({
    "id": "0wcqycg38fbr5o3",
    "created": "2023-01-27 09:57:06.125Z",
    "updated": "2023-01-27 09:57:06.125Z",
    "name": "roles",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rf7oiqls",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": true,
        "options": {
          "min": 1,
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
  const collection = dao.findCollectionByNameOrId("0wcqycg38fbr5o3");

  return dao.deleteCollection(collection);
})
