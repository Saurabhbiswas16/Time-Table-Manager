import React, { useContext, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AuthContext } from "./App";
import Axios from "./Axios";

const localizer = momentLocalizer(moment);

var myEventsList = [
 
];


export default function CalendarData(props) {
    const context = useContext(AuthContext);  
    const [finalTodo, setfinalTodo] = useState([])
    

    useEffect(() => {
        const postData=async()=>{
            var data={email:context}
            const res= await  Axios
            .post('./calendar/getData',data);
            
            var dum=res.data;
            setfinalTodo([]);
            myEventsList=[];     
            dum?.map((data)=>(
            myEventsList = [...myEventsList,{ start: new Date((new Date(data.startEvent)).getFullYear(), (new Date(data.startEvent)).getMonth(), (new Date(data.startEvent)).getDate(), (new Date(data.startEvent)).getHours(), (new Date(data.startEvent)).getMinutes()), end: new Date((new Date(data.endEvent)).getFullYear(), (new Date(data.endEvent)).getMonth(), (new Date(data.endEvent)).getDate(), (new Date(data.endEvent)).getHours(), (new Date(data.endEvent)).getMinutes()), title: data.title }]
            
        ))
          setfinalTodo(myEventsList);
          props.changedData(false);
        } 
        if(context)
        {
          postData();
        }
        
        return () => {
            postData();
        }
    }, [context,props.response]);
    
  return (
    <>
    <div className="App">
      <Calendar
        localizer={localizer}
        events={finalTodo}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}   
      />
    </div>
    </>
  );
}