const line = require('@line/bot-sdk');
const fs = require('fs');

let rawdata = fs.readFileSync('database.json');

const client = new line.Client({
  channelAccessToken: 'KlxiBiuRL5Mg1y95dpSHmimok7LhahN8Cc0HdV/jhggZje55DCv0vhobao2Rgev7y1iWyk4VGvWIgLP7NTiC9EcV1XGacT15W9LKYXCjn7qyfMSXjamHqbsrI7FAznSSCda0LOO2gTO5IBNc8CDouAdB04t89/1O/w1cDnyilFU='
});

const slot = 'เช้า'  // Check slot by compare with time range

let medicineSchedule = JSON.parse(rawdata);

const column = medicineSchedule
    .filter(user => {
        const data = user.data[0].time.find(e => e.title === slot)
        return data && data.status === false
    })
    .map(user => {
    // const user = medicineSchedule[1].displayName
    const detail = user.data.map(med => `- ${med.name}`).join('\n')
    return {
        "title": "ยา" + slot + "ของ" + user.displayName,
        "text": detail,
        "thumbnailImageUrl": "https://www.ideas.org.my/wp-content/uploads/2017/05/img-medicine-malaysia.jpg",
        "actions": [
            {
                "type": "message",
                "label": "กินแล้ว!",
                "text": "กินยาครบแล้ว"
            }
        ]
    }
})
// const user = medicineSchedule[1].displayName
// const detail = medicineSchedule[1].data.map(med => `- ${med.name}`).join('\n')
// console.log(result)
// console.log(detail);

// const flexMessage = {
//     "type": "template",
//     "altText": "this is a buttons template",
//     "template": {
//         "type": "buttons",
//         "thumbnailImageUrl": "https://www.ideas.org.my/wp-content/uploads/2017/05/img-medicine-malaysia.jpg",
//         "title": "ยากลางวันของ" + user,
//         "text": detail,
//         "actions": [
//         {
//             "type": "uri",
//             "label": "กินแล้ว",
//             "uri": "https://liff.line.me/1655752521-Qo4E0V15"
//         }
//         ]
//     }
// }

const carouselTemplate = {
    "type": "template",
    "altText": "this is a carousel template",
    "template": {
      "type": "carousel",
      "columns": column
    }
  }

// console.log(carouselTemplate)

client.pushMessage('Ca5a753e3ccaf237467afcf6e813bbab4', carouselTemplate)
  .then((err) => {
    console.log(err)
  })
  .catch((err) => {
    // error handling
});