var express = require("express");
var app = express();
var cors = require("cors");

var db = require("./MongoDB/Connection");
var Calendar=require("./MongoDB/CalendarSchema");
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port= process.env.PORT || 8001;

app.post("/calendar/getData", (req, res) => {
    const emailData = req.body;
    Calendar.find({ email: emailData.email }, (err, data) => {
      if (err) {
        res.send(err);
      } else {
          console.log("get");
          console.log(data);
        res.send(data);
      }
    });
  });

  app.post("/calendar/add",(req,res)=>{
    const calendarData= req.body;
    Calendar.create(calendarData,(err,data)=>{
       if(err)
       {
         res.send(err);
       }
       else
       {
        console.log("add");
           console.log(data);
         res.send(data);
       }
     }) 
  })

app.listen(port,()=>{
    console.log(`Port ${port}`);
})