
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

app.get('/count', (req, res) => {
  client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
    if (err) console.log('pg_count_err', err);
    // for (let row of res.rows) {
    //   console.log(JSON.stringify(row));
    // }
    res.json({count: res && res.rows});
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
