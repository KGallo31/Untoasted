import React,{useEffect,useState} from "react";
import {useParams} from 'react-router-dom'

function Receipt() {
  const [currentReceipt,setCurrentReceipt] = useState(null)
  const params = useParams()


  useEffect(() => {
    fetch(`/receipts/${params.id}`).then(r => r.json()).then(setCurrentReceipt)
  },[])
  console.log(currentReceipt)

  return( 
    <div>
      <h1>Receipt </h1>
    </div>
    );
}

export default Receipt;
