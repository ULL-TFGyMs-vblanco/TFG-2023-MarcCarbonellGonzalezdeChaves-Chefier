"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const http_1 = require("http");
const app_1 = require("./app");
const port = 3000;
exports.server = (0, http_1.createServer)(app_1.app.callback());
exports.server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
