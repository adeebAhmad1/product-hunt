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

export default App;
