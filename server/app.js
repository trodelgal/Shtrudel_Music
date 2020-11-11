const express = require("express");

const playlists = require('./data/playlist');

const albums = require('./data/albums');

const app = express();
const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  cloud: {
    id:
      "my-cluster:ZXVyb3BlLXdlc3QzLmdjcC5jbG91ZC5lcy5pbyRmNzMxYmQ1MWNmZDM0MzU5YjE1NjY0NWQ1NDZjOGM5YiQwMWYzYmM3MWQxZTc0ZmI4OTM4Njk2YTcwMGM0MzU4Mg==",
  },
  auth: {
    username: "elastic",
    password: "qHwY9vazBIE7U5d2FLUhV9gz",
  },
});

app.use(express.json());

app.use("/api", require("./api"));

// client.search({
//     index: 'kibana_sample_data_ecommerce',
//     body: {
//       query: {
//         match: {
//             customer_full_name: {
//               query : "Nir Rivera"
//             }
//           }
//       }
//     }
//   }, (err, result) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(result.body.hits.hits)
//     }
//   });




module.exports = app;
