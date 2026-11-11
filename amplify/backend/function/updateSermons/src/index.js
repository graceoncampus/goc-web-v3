/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_SERMONS_BUCKETNAME
Amplify Params - DO NOT EDIT */
const Parser = require("rss-parser");
const SERMONS_TABLE_NAME = process.env.SERMONS_TABLE_NAME || "Sermons";
const {
  DynamoDBClient,
  PutItemCommand,
  ScanCommand,
} = require("@aws-sdk/client-dynamodb");

const { randomUUID: uuidv4 } = require("node:crypto");

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  try {
    // Initialize DynamoDB client
    const client = new DynamoDBClient({
      region: process.env.AWS_REGION || "us-west-2",
    });

    const existingURIs = await getExistingURIs(client);

    const sermons = await loadSermons(client);

    const sermonsToAdd = sermons.filter((sermon) => {
      const uri = normalizeURI(sermon.URI);
      if (existingURIs.has(uri)) return false;
      existingURIs.add(uri);
      return true;
    });
    console.log(`Feed: ${sermons.length}; missing: ${sermonsToAdd.length}`);
    if (!event?.dryRun) await createSermons(sermonsToAdd, client);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      },
      body: JSON.stringify({
        message: "Sermons updated successfully",
        sermons: sermonsToAdd,
        count: sermonsToAdd.length,
      }),
    };
  } catch (error) {
    console.error("Error updating sermons:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      },
      body: JSON.stringify({
        message: "Error updating sermons",
        error: error.message,
      }),
    };
  }
};

// Add new sermons to the existing table.
const createSermons = async (sermons, client) => {
  await Promise.all(
    sermons.map(async ({ title, date, speaker, passage, URI }) => {
      const putCommand = new PutItemCommand({
        TableName: SERMONS_TABLE_NAME,
        Item: {
          id: { S: uuidv4() },
          title: { S: title },
          date: { S: date.toISOString() },
          speaker: { S: speaker },
          passage: { S: passage },
          URI: { S: URI },
        },
      });
      await client.send(putCommand);
      console.log("Added sermon:", title, date.toISOString());
    }),
  );
};

const parser = new Parser();

const loadSermons = async (client) => {
  try {
    const feed = await parser.parseURL(
      "http://feeds.feedburner.com/gracechurch-ucla?fmt=xml",
    );
    const sermons = feed.items.map((item) => ({
      title: item.title,
      speaker: item.creator,
      date: new Date(item.isoDate),
      passage: item.content.split(" • ")[1],
      URI: item.enclosure.url,
    }));
    // await cleanupSermons(client);
    // await createSermons(sermons, client);

    return sermons;
  } catch (error) {
    console.error("Error loading sermons:", error);
    throw error;
  }
};

const normalizeURI = (uri) => {
  const url = new URL(uri);
  return `${url.host.toLowerCase()}${url.pathname}${url.search}`;
};

const getExistingURIs = async (client) => {
  const uris = new Set();
  let key;
  do {
    const response = await client.send(new ScanCommand({
      TableName: SERMONS_TABLE_NAME,
      ProjectionExpression: "#uri",
      ExpressionAttributeNames: { "#uri": "URI" },
      ExclusiveStartKey: key,
    }));
    for (const item of response.Items || []) {
      if (!item.URI?.S) throw new Error("Existing sermon is missing its URI");
      uris.add(normalizeURI(item.URI.S));
    }
    key = response.LastEvaluatedKey;
  } while (key);
  return uris;
};
