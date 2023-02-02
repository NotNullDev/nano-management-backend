migrate((db) => {
  const collection = new Collection({
    "id": "ttamzv0ap52o6qa",
    "created": "2023-01-28 00:15:38.990Z",
    "updated": "2023-01-28 00:15:38.990Z",
    "name": "activities",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "u1pxs9mo",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "blvukxzx",
        "name": "team",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "tbl6d29ioyh9lq4",
          "cascadeDelete": false
        }
      },
      {
        "system": false,
        "id": "xszo6huv",
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
  const collection = dao.findCollectionByNameOrId("ttamzv0ap52o6qa");

  return dao.deleteCollection(collection);
})
