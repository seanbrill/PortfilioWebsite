import logo from './logo.svg';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/home/home';
import ThemeContext from './context/ThemeContext';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [initialLoad,setInitialLoad] = useState(true);
  const [theme,setTheme] = useState('light');

  //once per render
  useEffect(()=>{

    if(localStorage.getItem('theme')==null){
      console.log('initally saving theme preference: ' + theme);
      localStorage.setItem('theme',theme);
    }

    if(initialLoad && localStorage.getItem('theme')!=null){
      setTheme(localStorage.getItem('theme'));
      setInitialLoad(false);
    }
    updateSiteTheme();
  },[theme]);

  function updateSiteTheme(){
    var r = document.querySelector(':root');
    switch(theme){
      case 'light':
        r.style.setProperty('--primary-color', '#ffffff');
        r.style.setProperty('--secondary-color', '#589ce6');
        r.style.setProperty('--tertiary-color', '#857e76');
        r.style.setProperty('--text-color', '#000');
        break;
      case 'dark':
        r.style.setProperty('--primary-color', '#202026');
        r.style.setProperty('--secondary-color', '#ffffff');
        r.style.setProperty('--tertiary-color', '#6255d1');
        r.style.setProperty('--text-color', '#dddddd');
        break;
    }
    //save theme in local storage
    if(!initialLoad){
      console.log('saving theme preference: ' + theme);
      localStorage.setItem('theme',theme);
    }
    
    
    

  }

  return (
    <ThemeContext.Provider value={{theme,setTheme}}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
          </Routes>
        </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
