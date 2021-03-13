const line = require("@line/bot-sdk");
const fs = require("fs");

const request = require('request');
request('https://21e7be8a5125.ngrok.io/x-group-290609/asia-east2/apiNutin/data', function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

let rawdata = fs.readFileSync("database.json");

const client = new line.Client({
  channelAccessToken:
    "KlxiBiuRL5Mg1y95dpSHmimok7LhahN8Cc0HdV/jhggZje55DCv0vhobao2Rgev7y1iWyk4VGvWIgLP7NTiC9EcV1XGacT15W9LKYXCjn7qyfMSXjamHqbsrI7FAznSSCda0LOO2gTO5IBNc8CDouAdB04t89/1O/w1cDnyilFU=",
});

const slot = "กลางวัน"; // Check slot by compare with time range

let medicineSchedule = JSON.parse(rawdata);

const column = medicineSchedule
  .filter((user) => {
    const data = user.data[0].time.find((e) => e.title === slot);
    return data && data.status === false;
  })
  .map((user) => {
    // const user = medicineSchedule[1].displayName
    const detail = user.data.map((med) => `- ${med.name}`).join("\n");
    return {
      title: "ยา" + slot + "ของ" + user.displayName,
      text: detail,
      thumbnailImageUrl:
        "https://www.ideas.org.my/wp-content/uploads/2017/05/img-medicine-malaysia.jpg",
      actions: [
        {
          type: "message",
          label: "กินแล้ว!",
          text: "กินยาครบแล้ว",
        },
      ],
    };
  });

const carouselTemplate = {
  type: "template",
  altText: "this is a carousel template",
  template: {
    type: "carousel",
    columns: column,
  },
};

// console.log(carouselTemplate)

// client
//   .pushMessage("Ca5a753e3ccaf237467afcf6e813bbab4", carouselTemplate)
//   .then((err) => {
//     console.log(err);
//   })
//   .catch((err) => {
//     // error handling
//   });
