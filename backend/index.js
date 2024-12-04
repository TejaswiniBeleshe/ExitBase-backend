const express = require("express");
const app = express();
const cors = require('cors')
const employeeRouter = require('./routes/employee.route.js');
const adminRouter = require('./routes/admin.routes.js')
const jsonBody = require('body-parser');
const connectMongoDB = require('./config/config.js')

require("dotenv").config()

let port = process.env.PORT || 8080
connectMongoDB();
app.use(cors())

app.use(jsonBody.json())



app.use('/api',employeeRouter);
app.use('/api',adminRouter);

app.listen(port,()=>{
    console.log(`Server has started on port:${port}`)
})