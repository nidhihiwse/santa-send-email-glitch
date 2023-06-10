import React from "react";
import ReactDOM from "react-dom/client";
import SantaForm from "./components/SantaForm";
import 'bootstrap/dist/css/bootstrap.css';
import ErrorPage from "./components/ErrorPage";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import PageNotFound from "./components/PageNotFound";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PageNotFound />}/>
        <Route path={"/"} element={<SantaForm/>}/>
        <Route path={"error"} element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
