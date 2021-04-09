const mongoose=require('mongoose');

const calendarSchema=mongoose.Schema({
    email:String,
    title:String,
    startEvent:String,
    endEvent:String,  
})

const calendarEvent=mongoose.model('calendarEvents',calendarSchema);
module.exports =calendarEvent;