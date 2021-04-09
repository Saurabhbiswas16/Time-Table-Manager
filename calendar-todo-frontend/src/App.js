import React,{ useState,createContext} from 'react'
import './App.css';
import Authentication from "./Authentication";
import CreateEvent from './CreateEvent';

const AuthContext=createContext();
function App() {
  const [user, setuser] = useState("")
  
  const userstatus=(details)=>{
    setuser(details)
  }
  return (
    <div className="todo">   
      <Authentication  userstatus={userstatus} />
        <div className="todo_body">
          {user?(           
          <AuthContext.Provider value={user}>
            <CreateEvent/>
          </AuthContext.Provider>
          ):null}
        </div>
    </div>
  );
}

export default App;
export {AuthContext};
