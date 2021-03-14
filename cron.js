const line = require("@line/bot-sdk");
const { log } = require("console");
const fs = require("fs");
const request = require("request");
const client = new line.Client({
  channelAccessToken:
    "KlxiBiuRL5Mg1y95dpSHmimok7LhahN8Cc0HdV/jhggZje55DCv0vhobao2Rgev7y1iWyk4VGvWIgLP7NTiC9EcV1XGacT15W9LKYXCjn7qyfMSXjamHqbsrI7FAznSSCda0LOO2gTO5IBNc8CDouAdB04t89/1O/w1cDnyilFU=",
});
// let rawdata = fs.readFileSync("database.json");

const slot = "เช้า"; // Check slot by compare with time range

request(
  "https://21e7be8a5125.ngrok.io/x-group-290609/asia-east2/apiNutin/getAll", (error, response, body) => {
    // console.error('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
    let medicineSchedule = JSON.parse(body);
    // console.log(medicineSchedule);

    // console.log(medicineSchedule)
    const column = medicineSchedule[0].data
    // .filter((user) => {
    //   // console.log(user.data.reduce((total, cur) => total || cur.time.find(e => e.title === slot), false))
    //   // const result = user.data.reduce((total, cur) => total || cur.time.find(e => e.title === slot), false)
    //   // console.log(result)
    //   return user.data.find(e => e.title === slot)
    //   // const data = user.data[0].time.find((e) => e.title === slot);
    //   // return data && data.status === false;
    // })
    // .map((user) => {
      
    // const user = medicineSchedule[1].displayName

    let detail = []
    let query = '='
    column.forEach((item) => {
      item.time.forEach(t => {
        if(t.title === slot) {
          detail.push(item.name)
          query += item.index
        }
      })
    })
    // console.log(query)
    request.post(
      "https://21e7be8a5125.ngrok.io/x-group-290609/asia-east2/apiNutin",
      { 
        form: { 
          LIST_LIGHT: query
        } 
      }
    , (err, res, body) => { /* console.log(body) */});
    // const detail = column
    //   .(med => med.title === slot)
    //   .map((med) => `- ${med.name}`).join("\n");
    // return {
    //   title: "ยา" + slot + "ของ" + user.displayName,
    //   text: detail,
    //   thumbnailImageUrl:
    //     "https://www.ideas.org.my/wp-content/uploads/2017/05/img-medicine-malaysia.jpg",
    //   actions: [
    //     {
    //       type: "message",
    //       label: "กินแล้ว!",
    //       text: "กินยาครบแล้ว",
    //     },
    //   ],
    // };
    // });

    // const carouselTemplate = {
    //   type: "template",
    //   altText: "this is a carousel template",
    //   template: {
    //     type: "carousel",
    //     columns: [{
    //       title: "ยา" + slot + "ของ" + medicineSchedule[0].displayName,
    //       text: detail,
    //       thumbnailImageUrl:
    //         "https://www.ideas.org.my/wp-content/uploads/2017/05/img-medicine-malaysia.jpg",
    //       actions: [
    //         {
    //           type: "message",
    //           label: "กินแล้ว!",
    //           text: "กินยาครบแล้ว",
    //         },
    //       ],
    //     }],
    //   },
    // };

    const templateMsg = {
      "type": "template",
      "altText": "this is a buttons template",
      "template": {
        "type": "buttons",
        "thumbnailImageUrl": "https://www.ideas.org.my/wp-content/uploads/2017/05/img-medicine-malaysia.jpg",
        "title": "ยา" + slot + "ของ " + medicineSchedule[0].displayName,
        "text": detail.join("\n"),
        "actions": [
          {
            type: "message",
            label: "กินแล้ว!",
            text: "กินยาครบแล้ว " + slot,
          }
        ]
      }
    }

    console.log(templateMsg)

    client
      .pushMessage("Ca5a753e3ccaf237467afcf6e813bbab4", templateMsg)
      .then((err) => {
        console.log(err);
      })
      .catch((err) => {
        // error handling
      });
  }
);
// console.log(res);
