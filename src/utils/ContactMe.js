import { tryParse } from "./genericUtils";
import packageJson from "../../package.json";

const api_url = packageJson.isDev ? "SendEmail?code=77KxXG0DNj0og2avgdPvKWWE19gKQh6KRxY5yn71rLkrAzFuRos9fA==" : "https://portfolio-site-services.azurewebsites.net/api/SendEmail?code=77KxXG0DNj0og2avgdPvKWWE19gKQh6KRxY5yn71rLkrAzFuRos9fA==";

export function SendMessage(subject, email, givenName, message) {
  return new Promise((resolve) => {
    try {
      let request = new XMLHttpRequest();
      request.open("POST", api_url);
      request.send(
        JSON.stringify({
          subject,
          email,
          givenName,
          message,
        })
      );
      request.onload = () => {
        let response = tryParse(request.response);
        if (response) {
          return resolve({ success: true, response });
        } else {
          return resolve({ success: false, error: "unable to parse response" });
        }
      };

      request.onerror = () => {
        return resolve({ success: false, error: "unkown network error occured" });
      };
    } catch (error) {
      return resolve({ success: false, error });
    }
  });
}
