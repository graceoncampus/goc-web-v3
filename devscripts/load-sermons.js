const Parser = require("rss-parser");
const { Amplify } = require("aws-amplify");
const { uploadData } = require("aws-amplify/storage");

// try {
//   const result = uploadData({
//     key: filename,
//     data: file,
//     options: {
//       accessLevel: "guest", // defaults to `guest` but can be 'private' | 'protected' | 'guest'
//       onProgress, // Optional progress callback.
//     },
//   }).result;
//   console.log("Succeeded: ", result);
// } catch (error) {
//   console.log("Error : ", error);
// }

const parser = new Parser();

const loadSermons = async () => {
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
    console.log(sermons);
    // exportSermons(sermons);
  } catch (error) {
    console.log(error);
  }
};

loadSermons();
