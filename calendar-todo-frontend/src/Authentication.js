import React,{ useState} from 'react'
import {auth,provider} from './firebase';
import './Authentication.css'
import { Button } from '@material-ui/core';

function Authentication(props) {
    const [userData, setuserData] = useState("")
    const signIn=()=>{
        auth.signInWithPopup(provider)
        .then((result)=> {
            setuserData(result.user.email);
            props.userstatus(result.user.email);
            console.log(result.user.email);
        })
        .catch((error)=>alert("Some problem,Please try again!!!!!"))
    }
    const signOut=()=>{
        window.location.reload();
    };
    return (
        <>
             <div className="header"> 
            { !userData?(
                 <Button variant="contained" color="primary" size="small" onClick={signIn}>Login</Button> 
            ):(
                <>
                <p>{userData}</p>
                <Button variant="contained" color="primary" size="small" onClick={signOut}>Logout</Button>
                </>
            )
            }
            </div>
        </>
    )
}

export default Authentication
  
