import "bootstrap/dist/css/bootstrap.min.css";
import React,{useEffect, useState,createContext, useContext} from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import AuthContextProvider from "./context/AuthContext";
import DataContextProvider from "./context/DataContext";
import Routes from "./routes/routes";
import { createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import { blue, pink } from '@material-ui/core/colors';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const ThemeContext = createContext();

export const useTheme = ()=> useContext(ThemeContext)

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode,setDarkMode] = useState(prefersDarkMode);
  useEffect(()=>{
    setDarkMode(prefersDarkMode);
    const mode = localStorage.getItem("mode");
    mode&& setDarkMode(JSON.parse(mode));
  },[prefersDarkMode]);
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkMode ? 'dark' : 'light',
          primary : {
            main: blue[darkMode ? 300 : 700],
            dark: blue[darkMode ? 500 : 800],
            light: blue[darkMode ? 200 : 600],
          },
          secondary: {
            main: pink[darkMode ? "A400" : "A700"],
            dark: pink[darkMode ? 500 : 800],
            light: pink[darkMode ? 200 : 600]
          }
        }
      }),
    [darkMode],
  );
  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{setDarkMode: (func)=>{
        localStorage.setItem("mode",JSON.stringify(!darkMode))
        setDarkMode(func);
      },darkMode}}>
        <ThemeProvider theme={theme}>
          <AuthContextProvider>
            <DataContextProvider>
              <div style={{backgroundColor: theme.palette.background.default}}>
                <Header />
                <div className="pb-5">
                  <Routes />
                </div>
                <Footer />
              </div>
            </DataContextProvider>
          </AuthContextProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </BrowserRouter>
);
}
export default App;
