// currently works by running node load-sermons.ts
// make sure to have correct .env file
// todo: aws lambda to run this every week
// require('dotenv').config();
// const Parser = require("rss-parser");
// const { Amplify } = require("aws-amplify");
// const AWS = require("aws-sdk");

// const {
//   DynamoDBClient,
//   DeleteTableCommand,
//   DescribeTableCommand,
//   CreateTableCommand,
//   BatchWriteItemCommand,
//   PutItemCommand,
// } = require("@aws-sdk/client-dynamodb");

// const client = new DynamoDBClient({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_KEY_ID,
//   },
// });

// // Delete and Recreate Sermons Table
// const cleanupSermons = async () => {
//   const deleteCommand = new DeleteTableCommand({
//     "TableName": "Sermons",
//   });
//   try {
//     await client.send(deleteCommand);
//   } catch (err) {
//     console.error("Sermons Table does not exist, nothing to delete.");
//   }

//   // Check the status of table Sermons
//   // If throws exception "ResourceNotFound", then the table has finished deleting
//   // and we can proceed with table creation
//   const statusCommand = new DescribeTableCommand({
//     "TableName": "Sermons",
//   });

//   try {
//     const maxTries = 500;
//     let tries = 0;
//     while (true && tries < maxTries) {
//       await client.send(statusCommand);
//       tries += 1;
//     }
//   } catch (e) {
//     console.log("Table Does not exist anymore, finished deleting.");
//   }

//   // Create Sermons Table
//   const createInput = {
//     "AttributeDefinitions": [
//       {
//         "AttributeName": "id",
//         "AttributeType": "S",
//       },
//       {
//         "AttributeName": "date",
//         "AttributeType": "S",
//       }
//     ],
//     "KeySchema": [
//       {
//         "AttributeName": "id",
//         "KeyType": "HASH",
//       },
//       {
//         "AttributeName": "date",
//         "KeyType": "RANGE",
//       },
//     ],
//     "BillingMode": "PAY_PER_REQUEST",
//     "TableName": "Sermons",
//   }
//   const createCommand = new CreateTableCommand(createInput);

//   try {
//     await client.send(createCommand);
//     console.log("Sermons Table being created.");
//   } catch (err) {
//     console.log(err)
//     // console.error("Sermons Table already exists, not recreated.");
//   }
// }

// const createSermons = async (sermons) => {
//   const statusCommand = new DescribeTableCommand({
//     "TableName": "Sermons",
//   });

//   const maxTries = 1000;
//   let tries = 0;
//   let status = "";
//   while (true && tries < maxTries && status != "ACTIVE") {
//     try {
//       const response = await client.send(statusCommand);
//       status = response.Table.TableStatus;
//       tries += 1;
//     } catch (e) {
//       // console.log(e);
//     }
//   }

//   let id = 0;
//   sermons.forEach(async (sermon) => {
//     const {
//       title,
//       date,
//       speaker,
//       passage,
//       URI,
//     } = sermon;
//     const putInput = {
//       "TableName": "Sermons",
//       "Item": {
//         "id": {
//           "S": id.toString(),
//         },
//         "title": {
//           "S": title,
//         },
//         "date": {
//           "S": date,
//         },
//         "speaker": {
//           "S": speaker,
//         },
//         "passage": {
//           "S": passage,
//         },
//         "URI": {
//           "S": URI,
//         },
//       },
//     }
//     const putCommand = new PutItemCommand(putInput);
//     id += 1

//     try {
//       await client.send(putCommand);
//     } catch (err) {
//       console.error(`Failed to add Sermon: ${passage}`);
//       console.log(err)
//     }
//   });
// }

// const parser = new Parser();

// const loadSermons = async () => {
//   try {
//     const feed = await parser.parseURL(
//       "http://feeds.feedburner.com/gracechurch-ucla?fmt=xml"
//     );
//     const sermons = feed.items.map((item) => ({
//       title: item.title,
//       speaker: item.creator,
//       date: new Date(item.isoDate),
//       passage: item.content.split(" • ")[1],
//       URI: item.enclosure.url,
//     }));
//     await cleanupSermons();
//     await createSermons(sermons);
//   } catch (error) {
//     console.log(error);
//   }
// };


// loadSermons();
