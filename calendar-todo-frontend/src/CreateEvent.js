import React, { useContext, useState } from 'react'
import { AuthContext } from "./App";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Axios from './Axios';
import Container from '@material-ui/core/Container';
import './CreateEvent.css';
import CalendarData from './CalendarData';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

function CreateEvent() {
    const context = useContext(AuthContext);
    const [startEvent, setstartEvent] = useState();
    const [endEvent,setendEvent]=useState();
    const [title, settitle] = useState("");
    const [loading, setloading] = useState(false);
    const [response, setresponse] = useState("")   
        const postData=async()=>{
            // await setaddEvent()
            const res= await  Axios
            .post('./calendar/add',{
                title:title,
                startEvent:startEvent,
                endEvent:endEvent,
                email:context
            })
            setresponse(res.data);
            settitle("");
        }
        
    const AddEvent=(e)=>{
        setloading(true);
        setresponse("");
       e.preventDefault(); 
       postData();
    };
    const changedData=(event)=>{
        setloading(false);
    }

    const classes = useStyles();
    
    return (
        <>
            {context && (
                <>
                <Container>
                <div className="header_event">
                <form className={classes.container} noValidate>
                    <TextField id="standard-basic" label="Standard" onChange={(e)=>settitle(e.target.value)}
                        value={title} />
                    <TextField
                        id="date"
                        label="Event Start"
                        type="datetime-local"
                        onChange={(e)=>setstartEvent(e.target.value)}
                        value={startEvent}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField
                        id="time"
                        label="Event End"
                        type="datetime-local"
                        onChange={(e)=>setendEvent(e.target.value)}
                        value={endEvent}                     
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 300, // 5 min
                        }}
                    />

                    <Button variant="contained" color="primary" size="small" onClick={AddEvent}>Add Event</Button>
                    {loading?(
                    <>
                       <CircularProgress/> 
                    </>
                ):null}
                </form>
                </div>
              
                <CalendarData response={response} changedData={changedData}/>
                {/* {response.length!==0 ? ():(<CalendarData/>)} */}
               
                </Container>
                </>
            )}

        </>
    )
}

export default CreateEvent
