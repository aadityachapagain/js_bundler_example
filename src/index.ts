import { Handler, useEvent } from "sst/context";

export const handler = Handler("api", async (evt, ctx) => {
  const method = useEvent('api')['requestContext']['http']['method']

    if (method === "OPTIONS") {
      return {
        statusCode: 200
      }
    } else if (method === "GET") {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "get request requested!"
        })
      }
    } else if (method === "POST") {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "post request requested!"
        })
      }
    } else {
      return {
        statusCode: 404,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Not Found"
        })
      }
    }
});