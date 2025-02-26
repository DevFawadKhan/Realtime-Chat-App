// import React from 'react'
import { useRef } from "react";
function LogInPage() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // Input field par focus karne ka function
  };

  return (
    <div>
      <h1 className="text-center text-[25px]">LogInPage</h1>
      <input ref={inputRef} type="text" placeholder="Type here..." />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  )
}

export default LogInPage
