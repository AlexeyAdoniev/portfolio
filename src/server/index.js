import http from "node:http";
import React from "react";
import {
  secureTraversal,
  errorResponse,
  htmlTemplate,
  prepareFile,
} from "./utils.js";
import App from "../client/App.js";
import ReactDOMServer from "react-dom/server";
import ReactDOM from "react-dom";
import path from "node:path";

//ReactDOM.hydrate(<App />, document.getElementById("root"));

const routes = {
  "/": {
    GET: () => htmlTemplate(ReactDOMServer.renderToString(<App />)),
  },
};

const STATIC_PATH = path.join(process.cwd(), "./build");

const serveStatic = async (route, res) => {
  const paths = [STATIC_PATH, route];
  const file = await prepareFile(path.join(...paths));
  if (!file) return errorResponse(404)(res);
  file.stream.pipe(res);
};

const server = http
  .createServer(async (req, res) => {
    const { url, method } = req;
    const route = secureTraversal(url);
    console.log(route);

    const handler = routes[route];

    if (handler) {
      const respone = await handler[method]();
      return res.end(respone);
    }

    return await serveStatic(route, res);
  })
  .listen(process.env.PORT || 3000);
