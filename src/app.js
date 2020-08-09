
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

app.get('/create_table', (req, res) => {
  client.query('CREATE TABLE counter (id int PRIMARY KEY, count int NOT NULL);', (err, result) => {
    if (err || !result) {
      res.json({
        error : err || !result
      })
    } else {
      res.json({result})
    }
  })
})

app.get('/init', (req, res) => {
  client.query('INSERT INTO counter (id, count) VALUES (1, 574);', (err, result) => {
    if (err || !result) {
      res.json({
        error : err || !result
      })
    } else {
      res.json({result})
    }
  })
})

app.get('/count', (req, res) => {
  client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, result) => {
    if (err) console.log('pg_count_err', err);
    // for (let row of res.rows) {
    //   console.log(JSON.stringify(row));
    // }
    res.json({count: result && result.rows});
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
