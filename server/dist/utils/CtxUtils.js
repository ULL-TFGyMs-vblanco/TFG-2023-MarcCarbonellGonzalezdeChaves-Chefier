"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CtxUtils {
}
exports.default = CtxUtils;
CtxUtils.setResponse = (response, status, body) => {
    response.status = status;
    response.body = body;
};
