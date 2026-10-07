/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_SERMONS_BUCKETNAME
Amplify Params - DO NOT EDIT */
const Parser = require("rss-parser");
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

    // Get the latest sermon from the table
    const latestSermon = await getLatestSermon(client);

    const sermons = await loadSermons(client);

    const sermonsToAdd = sermons.filter(
      (sermon) => !latestSermon || sermon.date > new Date(latestSermon.date.S),
    );
    await createSermons(sermonsToAdd, client);

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
        TableName: "Sermons",
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

const getLatestSermon = async (client) => {
  const scanCommand = new ScanCommand({
    TableName: "Sermons",
  });

  try {
    const response = await client.send(scanCommand);
    if (response.Items && response.Items.length > 0) {
      const sortedSermons = response.Items.sort(
        (a, b) => new Date(b.date.S) - new Date(a.date.S),
      );

      const latestSermon = sortedSermons[0];

      return latestSermon;
    }
    return null;
  } catch (error) {
    console.error("Error getting latest sermon:", error);
    throw error;
  }
};
