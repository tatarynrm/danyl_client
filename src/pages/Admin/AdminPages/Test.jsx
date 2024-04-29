import React from 'react'

const Test = () => {
 const  openNewWindow = () => {
    // Open a new window with specified URL and window features
  return  window.open('https://google.com.ua', '_blank', 'width=600,height=400');
  };
  return (
    <div>
    <h1>Main React App</h1>
    <button onClick={openNewWindow}>Open New Window</button>
  </div>
  )
}

export default Test