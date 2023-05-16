"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class APIUtils {
}
exports.default = APIUtils;
APIUtils.setResponse = (response, status, body) => {
    response.status = status;
    response.body = body;
};
