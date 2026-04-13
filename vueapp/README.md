# JSON Server and db.json Documentation

This document provides an overview of how to utilize JSON Server alongside your Vue.js application. Below, you will find detailed information about setting up the JSON Server, the structure of the `db.json` file, and the relationship between your Vue app and the JSON server.

## JSON Server Setup

1. **Installation**: To install JSON Server, run the following command:
   ```bash
   npm install -g json-server
   ```
2. **Creating db.json**: You need a `db.json` file to serve your data. Create this file in the root of your project.
3. **Running the server**: Start the JSON Server with:
   ```bash
   json-server --watch db.json
   ```
   By default, it runs on `http://localhost:3000`.

## db.json Structure
Here’s an example of how a `db.json` file might look:
```json
{
  "posts": [
    { "id": 1, "title": "Post 1", "author": "Author 1" },
    { "id": 2, "title": "Post 2", "author": "Author 2" }
  ],
  "comments": [
    { "id": 1, "body": "Comment 1", "postId": 1 },
    { "id": 2, "body": "Comment 2", "postId": 1 }
  ]
}
```
This JSON structure allows for multiple resources to be accessed via RESTful APIs.

## Relationship Between Vue App and JSON Server

The Vue app interacts with the JSON server through HTTP requests. Here’s a diagram showing this relationship:

```plaintext
+----------------+     GET/POST/DELETE     +----------------+ 
|    Vue App     | <-------------------+  |  JSON Server   | 
|   (Axios/HTTP) |                       |    (db.json)    | 
+----------------+                       +----------------+
``` 

### Key Points
- The Vue app uses Axios or Fetch API to make calls to the JSON server.
- Resources represented in `db.json` can be directly accessed via endpoints like `http://localhost:3000/posts`.

## Conclusion
With these instructions, you should now be able to integrate JSON Server into your Vue application effectively. Happy coding!