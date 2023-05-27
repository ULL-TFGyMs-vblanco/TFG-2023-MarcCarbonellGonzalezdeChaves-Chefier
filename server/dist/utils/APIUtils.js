"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Utils for API
class APIUtils {
}
exports.default = APIUtils;
// Function to set response
APIUtils.setResponse = (response, status, body) => {
    response.status = status;
    response.body = body;
};
