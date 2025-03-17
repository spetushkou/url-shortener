# URL Shortener

## How to start (local development environment)

```bash
cd url-shortener
docker compose up --build
```

Navigate to a browser and enter URL: `http://localhost:5173/`

## How to stop (local development environment)

```bash
cd url-shortener
docker compose down
```

## Project structure

The client is implemented with React, Vite, TypeScript and the template I have developed myself for my daily work tasks. 

The backend is implemented with NestJS, TypeScript and the template I have developed myself for my daily work tasks. 

## Task notes

- "Allow users to create short versions of links to make them easier to speak and share." - DONE.
- "Here's what the simple interface could look like..." - DONE.
- "Build a web page with a form for entering a URL" - DONE.
- "When the form is submitted, return a shortened version of the URL" - DONE.
- "Save a record of the shortened URL to a database" - DONE.
- "Ensure the slug of the URL (abc123 in the screenshot above) is unique" - DONE.
- "When the shortened URL is accessed, redirect to the stored URL" - DONE.
- "If an invalid slug is accessed, display a 404 Not Found page" - DONE.
- "React w/ typescript for the front end" - DONE.
- "Node.JS w/ typescript for the backend" - DONE.
- "Docker" - DONE.
- EXTRA "Add support for accounts so people can view the URLs they created" - DONE.
- EXTRA "Validate the URL provided is an actual URL, display an error message if invalid" - DONE.
- EXTRA "Make it easy to copy the shortened URL to the clipboard " - DONE.
- EXTRA "Allow users to modify the slug of their URL" - NOT DONE.
- EXTRA "Track visits to the shortened URL" - DONE.
- EXTRA "Add rate-limiting to prevent bad-actors from spamming the service" - DONE.
- EXTRA "Update API to follow a known spec (such as json:api)" - NOT DONE.

## Developer notes

- I am using a MongoDB.
- There is a `MongoBaseRepository` base class (`url-shortener-be/src/common/database/mongo/mongo.base.repository.ts`) to work with MongoDB to avoid code duplication.
- I am using atomical incremental of user visits in order to avoid race conditions under high load: `url-shortener-be/src/url/url.service.ts` in the `findOneBySlug` method.
- I have added the original task assignment and some screenshorts of the app to this project.

```bash
./Senior_Backend_Take-Home_Project_2.0.pdf
./pic1.png
./pic2.png
./pic3.png
```
