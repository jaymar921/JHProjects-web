import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { CE3Page, HomePage } from "./components/pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="ce3" element={<CE3Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
