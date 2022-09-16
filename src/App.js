// import  React , { useState, useEffect } from 'react';
// import {MyFunction} from './myfunction';
import './App.css';
// import ChatSection from './ChatSection';
import Sidebar from './Sidebar';
// import theme from './Sidebar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './Login';
import { useStateValue } from './StateProvider';
import ChatSection from './ChatSection';
// import { createContext, useState } from 'react';
// import { Switch } from '@mui/material';

// import MyFunction from './myfunction';
// export const ThemeContext = createContext(null);

function App() {
  // const MyFunction = () => {
  //   const [isDesktop, setDesktop] = useState(window.innerWidth > 700);

  //   const updateMedia = () => {
  //     setDesktop(window.innerWidth > 700);
  //   };

  //   useEffect(() => {
  //     window.addEventListener("resize", updateMedia);
  //     return () => window.removeEventListener("resize", updateMedia);
  //   });

  //   return (
  //     <div>
  //       {isDesktop ? (
  //         <div className='app__body'>
  //           <Sidebar />
  //           <ChatSection />
  //         </div>
  //       ) : (
  //         <div className='app__body'>
  //           <ChatSection />
  //         </div>
  //       )}
  //     </div>
  //   );
  // }



  const [{ user }, dispatch] = useStateValue();
  // const[theme, setTheme] = useState("dark");
  // const toggleTheme = () => {
  //   setTheme((curr)=> (curr==="light" ? "dark":"light"))
  // }

  return (
    // BEM naming convention
    // <ThemeContext.Provider value = {{theme, toggleTheme}}>
    <div className="app">

      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>


            <Switch>
              <Route path="/rooms/:roomId">
                <Sidebar />
                <ChatSection />
              </Route>



              <Route path="/">
                <Sidebar />
                <ChatSection />

              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
    // </ThemeContext.Provider>
  );
}


export default App;
