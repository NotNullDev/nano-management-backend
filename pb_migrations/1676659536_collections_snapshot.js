migrate((db) => {
  const snapshot = [
    {
      "id": "_pb_users_auth_",
      "created": "2023-01-27 09:09:35.612Z",
      "updated": "2023-01-31 03:50:11.523Z",
      "name": "users",
      "type": "auth",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "users_name",
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
          "id": "users_avatar",
          "name": "avatar",
          "type": "file",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "maxSize": 5242880,
            "mimeTypes": [
              "image/jpg",
              "image/jpeg",
              "image/png",
              "image/svg+xml",
              "image/gif",
              "image/webp"
            ],
            "thumbs": null
          }
        },
        {
          "system": false,
          "id": "mycmsuxn",
          "name": "roles",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "0wcqycg38fbr5o3",
            "cascadeDelete": false,
            "maxSelect": null,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "ptydi1v0",
          "name": "deleted",
          "type": "date",
          "required": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
          "system": false,
          "id": "lxmzyiua",
          "name": "webSettings",
          "type": "json",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "iwqnxkgj",
          "name": "teams",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "tbl6d29ioyh9lq4",
            "cascadeDelete": false,
            "maxSelect": null,
            "displayFields": []
          }
        }
      ],
      "listRule": "id = @request.auth.id || (\n  @collection.teams.members.id ?= id &&\n  @collection.teams.managers.id ?= @request.auth.id\n)",
      "viewRule": "id = @request.auth.id",
      "createRule": "",
      "updateRule": "id = @request.auth.id",
      "deleteRule": "id = @request.auth.id",
      "options": {
        "allowEmailAuth": true,
        "allowOAuth2Auth": true,
        "allowUsernameAuth": true,
        "exceptEmailDomains": null,
        "manageRule": null,
        "minPasswordLength": 8,
        "onlyEmailDomains": null,
        "requireEmail": false
      }
    },
    {
      "id": "tbl6d29ioyh9lq4",
      "created": "2023-01-27 09:50:49.330Z",
      "updated": "2023-01-31 03:07:54.607Z",
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
          "id": "hi2yyued",
          "name": "members",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "maxSelect": null,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "kj3hewxl",
          "name": "project",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "pikg81feng8lsut",
            "cascadeDelete": false,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "sds2pozi",
          "name": "tags",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "7q24thwnsa8eu8b",
            "cascadeDelete": false,
            "maxSelect": null,
            "displayFields": null
          }
        },
        {
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
        },
        {
          "system": false,
          "id": "beenjei8",
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
      "listRule": "@request.auth.id = members.id || (\n@request.auth.id = managers.id\n)",
      "viewRule": null,
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "pikg81feng8lsut",
      "created": "2023-01-27 09:54:40.621Z",
      "updated": "2023-01-29 00:18:37.045Z",
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
          "id": "re4llkym",
          "name": "deleted",
          "type": "date",
          "required": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
          "system": false,
          "id": "2rus9yx9",
          "name": "organization",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "howbra6dxqhlpf2",
            "cascadeDelete": false,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "pevygkyp",
          "name": "tags",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "7q24thwnsa8eu8b",
            "cascadeDelete": false,
            "maxSelect": null,
            "displayFields": null
          }
        }
      ],
      "listRule": "@collection.teams.project.id ?= id && \n@collection.teams.members.id ?= @request.auth.id",
      "viewRule": null,
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "howbra6dxqhlpf2",
      "created": "2023-01-27 09:56:24.132Z",
      "updated": "2023-01-29 00:22:32.016Z",
      "name": "organizations",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "wyqwwowc",
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
          "id": "98kwvdiv",
          "name": "deleted",
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
          "id": "geeul3em",
          "name": "tags",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "7q24thwnsa8eu8b",
            "cascadeDelete": false,
            "maxSelect": null,
            "displayFields": null
          }
        }
      ],
      "listRule": "@collection.teams.project.organization.id ?= id &&\n@collection.teams.members.id ?= @request.auth.id",
      "viewRule": null,
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
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
    },
    {
      "id": "hjsvo4ogrkk25ge",
      "created": "2023-01-27 10:05:22.057Z",
      "updated": "2023-02-05 19:03:23.965Z",
      "name": "tasks",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "qk73czcm",
          "name": "activity",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "ttamzv0ap52o6qa",
            "cascadeDelete": false,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "wcqnxc5c",
          "name": "comment",
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
          "id": "tia6qxbi",
          "name": "duration",
          "type": "number",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null
          }
        },
        {
          "system": false,
          "id": "n8jj5mxr",
          "name": "date",
          "type": "date",
          "required": true,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
          "system": false,
          "id": "jdyu5syc",
          "name": "user",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "ckihzumd",
          "name": "accepted",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "lhhln7iz",
          "name": "rejected",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "tfplaoha",
          "name": "deleted",
          "type": "date",
          "required": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
          "system": false,
          "id": "5lnjcars",
          "name": "team",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "tbl6d29ioyh9lq4",
            "cascadeDelete": false,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "dunoav3s",
          "name": "status",
          "type": "select",
          "required": true,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "accepted",
              "rejected",
              "none"
            ]
          }
        }
      ],
      "listRule": "user.id = @request.auth.id\n|| (\n  team.managers.id = @request.auth.id\n)",
      "viewRule": "user.id = @request.auth.id\n|| (\n  team.managers.id = @request.auth.id\n)",
      "createRule": "user.id = @request.auth.id",
      "updateRule": "user.id = @request.auth.id\n|| (\n  team.managers.id = @request.auth.id\n)",
      "deleteRule": null,
      "options": {}
    },
    {
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
    },
    {
      "id": "ttamzv0ap52o6qa",
      "created": "2023-01-28 00:15:38.990Z",
      "updated": "2023-02-05 18:46:21.982Z",
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
            "collectionId": "tbl6d29ioyh9lq4",
            "cascadeDelete": false,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "0wksxeuc",
          "name": "project",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "pikg81feng8lsut",
            "cascadeDelete": false,
            "maxSelect": 1,
            "displayFields": null
          }
        },
        {
          "system": false,
          "id": "ueony5ev",
          "name": "organization",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "howbra6dxqhlpf2",
            "cascadeDelete": false,
            "maxSelect": 1,
            "displayFields": null
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
      "listRule": "team.members.id ?= @request.auth.id",
      "viewRule": null,
      "createRule": null,
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})
