import React, { useEffect } from 'react';
import axios from 'axios';

const Test2 = (props) => {

  useEffect(() => {
    const apiCall = async () =>  {
      const response = await axios.get('http://localhost:8080/restapi/member'); 
      console.log(response.data); 
    };
    apiCall();
  }, [])
  return (
    <div>      
    </div>
  );
}; 

export default Test2;