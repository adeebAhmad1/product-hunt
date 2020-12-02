import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import AuthContextProvider from "./context/AuthContext";
import DataContextProvider from "./context/DataContext";
import Routes from "./routes/routes";

const App = () => (
  <AuthContextProvider>
    <DataContextProvider>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes />
          <Footer />
        </BrowserRouter>
      </div>
    </DataContextProvider>
  </AuthContextProvider>
);

export default App;
