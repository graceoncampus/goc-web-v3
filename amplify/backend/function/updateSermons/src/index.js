/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_SERMONS_BUCKETNAME
Amplify Params - DO NOT EDIT */const Parser = require("rss-parser");
const {
  DynamoDBClient,
  DeleteTableCommand,
  DescribeTableCommand,
  CreateTableCommand,
  PutItemCommand,
  GetItemCommand,
  QueryCommand,
} = require("@aws-sdk/client-dynamodb");

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    
    try {
        // Initialize DynamoDB client
        const client = new DynamoDBClient({
            region: process.env.AWS_REGION || 'us-west-2'
        });
        

        // Get the latest sermon from the table
        const latestSermon = await getLatestSermon(client);
        console.log(latestSermon);
        
        // const sermons = await loadSermons(client);
        
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
            },
            body: JSON.stringify({
                message: 'Sermons updated successfully',
                sermons: latestSermon,
                count: latestSermon.length
            }),
        };
    } catch (error) {
        console.error('Error updating sermons:', error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
            },
            body: JSON.stringify({
                message: 'Error updating sermons',
                error: error.message
            }),
        };
    }
};

// Delete and Recreate Sermons Table
const cleanupSermons = async (client) => {
  const deleteCommand = new DeleteTableCommand({
    "TableName": "Sermons",
  });
  try {
    await client.send(deleteCommand);
  } catch (err) {
    console.error("Sermons Table does not exist, nothing to delete.");
  }

  // Check the status of table Sermons
  // If throws exception "ResourceNotFound", then the table has finished deleting
  // and we can proceed with table creation
  const statusCommand = new DescribeTableCommand({
    "TableName": "Sermons",
  });

  try {
    const maxTries = 500;
    let tries = 0;
    while (true && tries < maxTries) {
      await client.send(statusCommand);
      tries += 1;
    }
  } catch (e) {
    console.log("Table Does not exist anymore, finished deleting.");
  }

  // Create Sermons Table
  const createInput = {
    "AttributeDefinitions": [
      {
        "AttributeName": "id",
        "AttributeType": "S",
      },
      {
        "AttributeName": "date",
        "AttributeType": "S",
      }
    ],
    "KeySchema": [
      {
        "AttributeName": "id",
        "KeyType": "HASH",
      },
      {
        "AttributeName": "date",
        "KeyType": "RANGE",
      },
    ],
    "BillingMode": "PAY_PER_REQUEST",
    "TableName": "Sermons",
  }
  const createCommand = new CreateTableCommand(createInput);

  try {
    await client.send(createCommand);
    console.log("Sermons Table being created.");
  } catch (err) {
    console.log(err)
    // console.error("Sermons Table already exists, not recreated.");
  }
}

const createSermons = async (sermons, client) => {
  const statusCommand = new DescribeTableCommand({
    "TableName": "Sermons",
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
  // sermons.forEach(async (sermon) => {
  //   const {
  //     title,
  //     date,
  //     speaker,
  //     passage,
  //     URI,
  //   } = sermon;
  //   const putInput = {
  //     "TableName": "Sermons",
  //     "Item": {
  //       "id": {
  //         "S": id.toString(),
  //       },
  //       "title": {
  //         "S": title,
  //       },
  //       "date": {
  //         "S": date,
  //       },
  //       "speaker": {
  //         "S": speaker,
  //       },
  //       "passage": {
  //         "S": passage,
  //       },
  //       "URI": {
  //         "S": URI,
  //       },
  //     },
  //   }
  //   const putCommand = new PutItemCommand(putInput);
  //   id += 1

  //   try {
  //     await client.send(putCommand);
  //   } catch (err) {
  //     console.error(`Failed to add Sermon: ${passage}`);
  //     console.log(err)
  //   }
  // });
}

const parser = new Parser();

const loadSermons = async (client) => {
  try {
    const feed = await parser.parseURL(
      "http://feeds.feedburner.com/gracechurch-ucla?fmt=xml"
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
  const queryCommand = new QueryCommand({
    TableName: "Sermons",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": { S: "1" }
    },
    ScanIndexForward: false,
    Limit: 1
  });

  try {
    const response = await client.send(queryCommand);
    if (response.Items && response.Items.length > 0) {
      return response.Items[0];
    }
    return null;
  } catch (error) {
    console.error("Error getting latest sermon:", error);
    throw error;
  }
};
