define({ "api": [
  {
    "type": "post",
    "url": "/api/justify",
    "title": "Justify text",
    "name": "Justify_text",
    "group": "API",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>text to justify.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>justified text.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/app.js",
    "groupTitle": "API"
  },
  {
    "type": "post",
    "url": "/api/token",
    "title": "obtain a token",
    "name": "Token",
    "group": "API",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "email",
            "description": "<p>user's email.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{ \"email\": \"foo@foo.com\" }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "token",
            "description": "<p>user's token.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/app.js",
    "groupTitle": "API"
  }
] });
