import React from 'react'
import { useRef } from 'react';

const Start = ({setUsername}) => {
    const inputref=useRef();
    const handleclick=()=>{
        inputref.current.value && setUsername(inputref.current.value);
    }
  return (
    <div>
        <input class Name="startInput"
        placeholder='Enter your name'
        ref={inputref} >
        </input>
        <button onClick={handleclick}>start</button>        
    </div>
  )
}

export default Start