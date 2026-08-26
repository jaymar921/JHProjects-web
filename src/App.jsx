import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  CE3Page,
  HomePage,
  KumandrasEconomyPage,
  DonationPage,
} from "./components/pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="customenchantments3" element={<CE3Page />} />
        <Route path="kumandras-economy" element={<KumandrasEconomyPage />} />
        <Route path="donation" element={<DonationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
