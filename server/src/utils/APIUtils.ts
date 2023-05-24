// Utils for API
export default class APIUtils {
  // Function to set response
  public static setResponse = (response: any, status: number, body: any) => {
    response.status = status;
    response.body = body;
  };
}
