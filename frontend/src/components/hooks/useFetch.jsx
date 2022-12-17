import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function useFetch() {

  const [data, setData] = useState('');


  useEffect(() => {
    const fetchData = async() => {
      const data = await axios.get('/save');
      console.log(response);
      setData(response);
    }
    fetchData();
  }, [])

  return (
    <div>{data}</div>
  )



}