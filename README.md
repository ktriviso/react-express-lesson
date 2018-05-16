# React and Express

## Learning Objectives

*After this lesson, you will be able to:*

- Explain what the heck `create-react-app` is doing anyways
- Identify the reasons for building a back-end
- Consider various ways to structure a full-stack app using React.js on the front end and Express.js on the back
- Set up and work in a development environment for an Express/React app
  - Describe the processes necessary to fascilitate this
  - Write npm scripts to streamline these processes
- Build an Express.js app that serves a React.js front-end
- Build a React front-end that consumes a JSON data API exposed by the same Express app that serves it

## What is `create-react-app` doing?

- `create-react-app` gives us [these features](https://github.com/facebook/create-react-app#whats-included) out of the box.
- This [article](https://github.com/facebook/create-react-app#whats-included) describes how `create-react-app` uses these tool in more detail.

### Doc Dive

Using the links above, define and explain why we care about (BONUS: describe `create-react-app`'s approach to the topic'):

- Bundling
- Transpiling
- Linting
- Testing

#### What is the [`webpack-dev-server`](https://webpack.js.org/guides/development/#using-webpack-dev-server)?

## Why do we need a server at all?

- Hosting the app in the first place (`webpack-dev-server`, as the name might suggest, is **not** suited for production -- it is a tool to fascilitate rapid development)
- Control of how requests are handled
- Integrating various services
- Shared persistent datastore
- Keeping sensitive code/keys private
- Processing power, other apps, freedom, lots of reasons our own machines are nice

## Ways to structure

- We have two conceptual parts,
  - the Express back-end which runs on our server someplace
  - the React front-end (bundled set of static assets -- .html, .js, and .css) which runs in the client's browser

- First issue is how does React get to the client's browser

### Seperate servers

- While our React app is running exclusively on the client, the static assets (i.e. the html, js, css, and various other kinds of files necessary to run) need to be hosted someplace.
  - First we need to build
  - Could host the built assets on a static site hosting service like [GitHub Pages](https://help.github.com/articles/what-is-github-pages/) or [Surge](https://surge.sh/)
  - Heroku makes it [easy](https://blog.heroku.com/deploying-react-with-zero-configuration)
  - Could write a very simple Express app and deploy that someplace
- Now we need to deploy a second server that will provide a JSON API to the React app
  - React app will need to make requests to the correct domain
  - Express API needs to be set up to [enable cors](https://github.com/expressjs/cors)
- Have already seen fetch requests from a React front end to an API exposed by a different server.
- This structure makes the most sense if we have multiple clients consuming our API (web and native app) or are following a micro-services architecture.

### One server

- We would rather keep things simple by having a single Express app serve the React app *and* expose the JSON API that is consumed by the React app (discussion is about production and emphasizes static assets produced by webpack

## (I Do) Setting up a development environment:

### Generally

- In development:
  - We want the tightest a feedback loop possible between making changes and seeing results
  - We can devote more resoures (memory and processing power) to ensuring a tight feeback loop than we can expect production clients to have
- In production:
  - We change code much less frequently and are very deleberate when we do
  - We don't want to pay to overhead we do in development for immediate feedback


### Specifically

- In development:
  - We want the node process running the Express app to restart when changes are made to the Express app
  - We want webpack to re-transpile and re-bundle our code, and refresh the browser whenever changes are made to the React app
- In production:
  - We want our continually running Express app to serve the static assets produced by building our React app

#### Directory structure

- Because our Express app will serve our React app in production, we want our React directory within our Express repo.
- This is a little funny to have two projects in one repo. Git has an idea of [submodules](https://www.atlassian.com/blog/git/git-submodules-workflows-tips) we could use to maintain one repo inside of another. We won't today for the sake of simplicity.

*Code can be found in `/hello-world` in this repo*

##### Express App

- We start building an Express app (notice, no `/views` or `/public`):

```
├── package.json
├── db
│   ├── schema.sql
│   └── seed.sql
├── config
│   ├── connection.js
│   └── dbConfig.js
├── models
│   └── greeting.js
├── controllers
│   ├── greetingsController.js
│   └── responseController.js
├── routes
│   ├── api.js
│   └── greetings.js
└── server.js
```
- The express app handles the following request:
```
GET /api/greetings => return JSON all greetings
POST /api/greetings => create new greeting and return JSON new greeting
DELETE /api/greetings/:id => delete message with given id and return JSON ok status
```
- We can run our server with `npm run start-server` in the `hello-world/` directory

##### React App

- Within the Express app we create a react app and name the directory `client`
- Now our `hello-world` project looks like:
```
├── client
│   ├── README.md
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   └── registerServiceWorker.js
│   └── yarn.lock
├── config
│   ├── connection.js
│   └── dbConfig.js
├── controllers
│   ├── greetingsController.js
│   └── responseController.js
├── db
│   ├── schema.sql
│   └── seed.sql
├── models
│   └── greeting.js
├── package.json
├── routes
│   ├── api.js
│   └── greetings.js
└── server.js
```

- In production, Express will serve the built React app from `client/build` as the default response using `express.static`.
  - cd into `client/` and build the React app with `npm run build` -- Read output of `create-react-app` carefully; it is full of usefull advice
  - Now our directory structure is:

  ```
  ├── client
  │   ├── README.md
  │   ├── build
  │   │   ├── asset-manifest.json
  │   │   ├── favicon.ico
  │   │   ├── index.html
  │   │   ├── manifest.json
  │   │   ├── service-worker.js
  │   │   └── static
  │   │       ├── css
  │   │       ├── js
  │   │       └── media
  │   ├── package.json
  │   ├── public
  │   │   ├── favicon.ico
  │   │   ├── index.html
  │   │   └── manifest.json
  │   ├── src
  │   │   ├── App.css
  │   │   ├── App.js
  │   │   ├── App.test.js
  │   │   ├── index.css
  │   │   ├── index.js
  │   │   ├── logo.svg
  │   │   └── registerServiceWorker.js
  │   └── yarn.lock
  ├── config
  │   ├── connection.js
  │   └── dbConfig.js
  ├── controllers
  │   ├── greetingsController.js
  │   └── responseController.js
  ├── db
  │   ├── schema.sql
  │   └── seed.sql
  ├── models
  │   └── greeting.js
  ├── package.json
  ├── routes
  │   ├── api.js
  │   └── greetings.js
  └── server.js
  ```

- Finally, we want to add a line to our Express app telling it to serve `client/build` at the root route. In `server.js`
```js
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
```
- We can trigger this condition with: `$ NODE_ENV='production' npm start`
- Check out `localhost:3000`, React devtools should indicate that the page is using a production build of React.

- We now have a React app served by an Express backend.
- Now we just need to remember to rebuild our React app everytime we make a change to it. Is this ideal?

![no](https://media.giphy.com/media/W5YVAfSttCqre/giphy.gif)

### Setting Up a Development Workflow

- When we are developing, we want as tight of a feedback loop as possible
- `create-react-app` does a lot for us towards thigs goal espescially with the `webpack-dev-server`
- With a bit of tinkering, we can set up a development environment where the webpack dev server runs on port 3000 (so we get all of our auto retranspile, rebuild, rebundle goodies) but will pass requests for things other than assets that will eventually be in the `build/` directory on to our Express server
  - The we can tell webpack where to find our Express server by adding a ["proxy"](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#proxying-api-requests-in-development) property to **the react app's** `package.json`, `"proxy": "http://localhost:3001"` (we need to use something other than 3000 since that is what `create-react-app` defaults to -- be sure to update `server.js`)
  - We start our Express server with `npm run dev` in one terminal
  - We start our React app in another terminal with `npm start`
  - The browser opens and we see our React app (dev tools tell us it is a development build)
  - At the developer console we can try:
  ```
  fetch('/api/greetings')
  .then(res => res.json())
  .then(console.log)
  ```

- This is really close to what we want but we can make things even better using a module [concurrently](https://github.com/kimmobrunfeldt/concurrently) which we will install as a development dependency.
- Add update our npm scripts:
```js
"scripts": {
    "start": "node server.js",
    "dev": "concurrently \"npm run start-server\" \"npm run start-client\"",
    "start-server": "nodemon server.js",
    "start-client": "cd client && npm start",
    "reset-db": "psql -f db/schema.sql && psql -f db/seed.sql"
}
```

- Now we can use the single command `npm run dev` from the root of our Express app to kick off both the server and client.

- This excellent [blog post](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/) does a great job describing this organization.

- Now we are ready to start building out the front end.
