import { tryParse } from "./genericUtils";
import packageJson from "../../package.json";

const api_url = packageJson.isDev ? "LogEvent?code=M0uryJy7Dvg2GMejzpy3GfPNLRA6vHlcVP9U7Ilg8i-4AzFuzLuGeg==" : "https://portfolio-site-services.azurewebsites.net/api/LogEvent?code=M0uryJy7Dvg2GMejzpy3GfPNLRA6vHlcVP9U7Ilg8i-4AzFuzLuGeg==";

export function LogEvent(event) {
  return new Promise((resolve) => {
    try {
      let request = new XMLHttpRequest();
      request.open("POST", api_url);
      request.send(JSON.stringify({ event }));
      request.onload = () => {
        let response = tryParse(request.response);
        if (response) {
          return resolve({ success: true, response });
        } else {
          return resolve({ success: false, error: "unable to parse response" });
        }
      };
    } catch (error) {
      return resolve({ success: true, error });
    }
  });
}
