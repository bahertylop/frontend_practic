import React from "react";
import AppRoutes from "./Routes/Routes.jsx";
import Header from "./Header/Header.jsx";
import Footer from "./Footer/Footer.jsx";
import Sidebar from "./Sidebar/Sidebar.jsx";

const App = () => {
    return (
        <div className="app">
            <Header />
            
        <div className="container">
            <Sidebar />
            <AppRoutes />
        </div>
        
            <Footer />
        </div>
    );
};

export default App;