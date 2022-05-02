import * as AWS from 'aws-sdk';
import { APIGatewayProxyHandler } from 'aws-lambda'

export const fn_handler: APIGatewayProxyHandler = async (event) => {
    return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: "Hello World!!!",
    };
}