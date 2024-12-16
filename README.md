## Final project for backend part of the 5G00DM05-3008 course

Backend to store tasks using mongo

Task schema:

```json
{
  "title": { "type": String, "required": true },
  "status": { "type": String, "default": "todo" },
  "due": { "type": Date, "default": null },
}
```
