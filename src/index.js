const express = require('express');

const app = express();
const port = process.env.PORT || 3000;


// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use(require('./routes/index.js'));

app.listen(port,()=>{
    console.log("servidor en Puerto ==> ", port);
});