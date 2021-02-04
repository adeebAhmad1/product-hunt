import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import AuthContextProvider from "./context/AuthContext";
import DataContextProvider from "./context/DataContext";
import Routes from "./routes/routes";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const App = () => {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // const theme = React.useMemo(
  //   () =>
  //     createMuiTheme({
  //       palette: {
  //         type: prefersDarkMode ? 'dark' : 'light',
  //       },
  //     }),
  //   [prefersDarkMode],
  // );
  return (
    <BrowserRouter>
    <AuthContextProvider>
      <DataContextProvider>
        <div className="App">
          <Header />
          <Routes />
          <Footer />
        </div>
      </DataContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
}
export default App;
