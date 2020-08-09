
const express = require('express')
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
client.connect();


const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  // increment in pg
})

// app.get('/create_table', (req, res) => {
//   client.query('CREATE TABLE counter (id int PRIMARY KEY, count int NOT NULL);', (err, result) => {
//     if (err || !result) {
//       res.json({
//         error : err || !result
//       })
//     } else {
//       client.query('INSERT INTO counter (id, count) VALUES (1, 574);', (err, result) => {
//         if (err || !result) {
//           res.json({
//             error : err || !result
//           })
//         } else {
//           res.json({result})
//         }
//       })
//     }
//   })
// })

app.get('/count', (req, res) => {
  client.query('SELECT count from counter where id = 1;', (err, result) => {
    if (err) console.log('pg_count_err', err);
    res.json({count: result});
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
