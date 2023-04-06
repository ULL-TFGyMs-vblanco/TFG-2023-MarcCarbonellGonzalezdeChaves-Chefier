export default class CtxUtils {
  public static setResponse = (response: any, status: number, body: any) => {
    response.status = status;
    response.body = body;
    return;
  };
}
