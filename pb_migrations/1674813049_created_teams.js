migrate((db) => {
  const collection = new Collection({
    "id": "tbl6d29ioyh9lq4",
    "created": "2023-01-27 09:50:49.330Z",
    "updated": "2023-01-27 09:50:49.330Z",
    "name": "teams",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rmrfessb",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": true,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "s81p6u4v",
        "name": "deleted_at",
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
  const collection = dao.findCollectionByNameOrId("tbl6d29ioyh9lq4");

  return dao.deleteCollection(collection);
})
