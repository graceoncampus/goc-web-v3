/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_SERMONS_BUCKETNAME
Amplify Params - DO NOT EDIT */
const Parser = require("rss-parser");
const {
  DynamoDBClient,
  DeleteTableCommand,
  DescribeTableCommand,
  CreateTableCommand,
  PutItemCommand,
  ScanCommand,
} = require("@aws-sdk/client-dynamodb");

const { v4: uuidv4 } = require("uuid");

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
      (sermon) => sermon.date > new Date(latestSermon.date.S),
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

// Delete and Recreate Sermons Table
const createSermons = async (sermons, client) => {
  const statusCommand = new DescribeTableCommand({
    TableName: "Sermons",
  });

  const maxTries = 1000;
  let tries = 0;
  let status = "";
  while (true && tries < maxTries && status != "ACTIVE") {
    try {
      const response = await client.send(statusCommand);
      status = response.Table.TableStatus;
      tries += 1;
    } catch (e) {
      console.log(e);
    }
  }

  let id = 0;
  await Promise.all(
    sermons.map(async (sermon) => {
      const { title, date, speaker, passage, URI } = sermon;
      console.log("Putting sermon: ", sermon);
      const putInput = {
        TableName: "Sermons",
        Item: {
          id: {
            S: uuidv4(),
          },
          title: {
            S: title,
          },
          date: {
            S: date,
          },
          speaker: {
            S: speaker,
          },
          passage: {
            S: passage,
          },
          URI: {
            S: URI,
          },
        },
      };
      const putCommand = new PutItemCommand(putInput);
      id += 1;

      try {
        await client.send(putCommand);
        console.log("Added sermon: ", sermon);
      } catch (err) {
        console.error(`Failed to add Sermon: ${passage}`);
        console.log(err);
      }
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
    console.log(error);
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
