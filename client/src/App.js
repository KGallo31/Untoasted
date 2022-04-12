import {React, useState,useEffect} from 'react'
import ClockIn from './components/ClockIn'
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from './components/Home';

function App() {

  const [user, setUser] = useState(null)
  const [items,setItems] = useState([])

  useEffect(() => {

  fetch('/items').then(r=> r.json()).then(setItems)
  },[])

  useEffect(() => {
    fetch('/me').then(r =>{
      if(r.ok){
        r.json().then(setUser)
      }
    })
    .then()
  },[]
  )



  return (
    <div>
      <Routes>
        <Route path='/' element={<ClockIn user={user} setUser={setUser}/>}/>
        <Route path='/home' element={<Home items={items}/>}/>
      </Routes>
      {/* <ClockIn user={user} setUser={setUser}/> */}
  </div>
  );
}

export default App;
