import AWS from 'aws-sdk'
import commonMiddleware from '../lib/commonMiddleware';
import createError from 'http-errors';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function getAuctionById(){

    let auction;
    const { id } = event.pathParameters;

try{
    const result  = await dynamoDB.get({
        TableName: process.env.AUCTIONS_TABLE_NAME,
        Key: { id }
    }).promise();

    auction = result.Item;

    } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
}

    if(!auction){
        throw new createError.NotFound(`Auction with ID "${id}" not found`);
    }

    return auction;
}

async function getAuction(event, context) {

    const auction = await getAuctionById();

  return {
    statusCode: 200,
    body: JSON.stringify(auction),
  };
}

export const handler = commonMiddleware(createAuction)


