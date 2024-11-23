import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage";
import AboutUsPage from "./pages/AboutUsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />        
          <Route path="/about" element={<AboutUsPage />} />   
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
