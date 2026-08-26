import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  CE3Page,
  HomePage,
  KumandrasEconomyPage,
  DonationPage,
  CustomWarpsPage,
  FishingContestPage,
  GraphicsUtilsPage,
  CustomEnchants2Page,
  MoreFoodsPage,
} from "./components/pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="customenchantments3" element={<CE3Page />} />
        <Route path="kumandras-economy" element={<KumandrasEconomyPage />} />
        <Route path="donation" element={<DonationPage />} />
        <Route path="2dgraphic-utils" element={<GraphicsUtilsPage />} />
        {/* Archived. Kept routed so the old Spigot listings still land somewhere. */}
        <Route path="custom-warps" element={<CustomWarpsPage />} />
        <Route path="fishing-contest" element={<FishingContestPage />} />
        <Route path="custom-enchantments-2" element={<CustomEnchants2Page />} />
        <Route path="more-foods-and-crops" element={<MoreFoodsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
