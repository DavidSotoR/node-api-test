var userRouter = require('./router/router');
const express = require('express');
const dbSetup = require('./db/db-setup');
const app = express()
const port = 3000

dbSetup()

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})