
const express = require('express')
const storage = require('node-persist')

let COUNTER = 0;

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  COUNTER++
  res.sendFile(__dirname + '/index.html')
  storage.setItem('counter', COUNTER)
  .then(()=>0).catch(e=>console.log('set_error', e))
})

app.get('/count', (req, res) => {
  res.json({count: COUNTER + 573});
})

storage.init()
.then(() => {
  storage.getItem('counter')
  .then(count => {
    COUNTER = count > 0 ? count : 0
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
  }).catch(e=>{
    console.log('get_error', e)
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
  })
}).catch(e=>{
  console.log('init_err', e)
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
})


