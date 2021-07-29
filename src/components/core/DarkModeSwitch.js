import React, { useState, useEffect } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi';

function DarkModeSwitch() {
  const darkModeOn = (window.localStorage.getItem('theme') === 'dark') || false;


  const [darkMode, setDarkMode] = useState(darkModeOn);
  const toggleDark = (e) => {
    setDarkMode(e.target.checked);
  }

  useEffect(() => {
    console.log("Local Storage",window.localStorage.getItem('theme'));
    if(darkMode) {
      window.localStorage.setItem('theme', 'dark');
      document.body.classList.add("is-dark");
    }
    else {
      window.localStorage.setItem('theme', 'light');
      document.body.classList.remove("is-dark");
    }
  }, [darkMode])

  return (
    <label className="theme-toggle">
      <input type="checkbox" onChange={toggleDark} checked={darkMode}/>
      <span className="toggler">
        <span className="dark">
          <FiMoon />
        </span>
        <span className="light">
          <FiSun />
        </span>
      </span>
    </label>
  )
}

export default DarkModeSwitch
