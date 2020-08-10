
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

const tweets = [
  'https://ctt.ac/ove5r',
  'https://ctt.ac/N94du',
  'https://ctt.ac/17qn8',
  'https://ctt.ac/e2q7f',
  'https://ctt.ac/BD7S0'
]

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/tweet', (req, res) => {
  const tweet = tweets[Math.floor(Math.random() * tweets.length)]
  res.redirect(tweet)
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
    res.json({count: result && result.rows && result.rows.length && result.rows[0] && result.rows[0].count});
  });
})

app.get('/count_incr', (req, res) => {
  client.query('UPDATE counter SET count = count + 1 WHERE id = 1;', (err, result) => {
    if (err) console.log('pg_incr_err', err);
  });
  res.send('OK')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
