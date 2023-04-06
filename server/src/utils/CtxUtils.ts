export default class CtxUtils {
  public static setResponse = (response, status, body) => {
    response.status = status;
    response.body = body;
    return;
  };
}
