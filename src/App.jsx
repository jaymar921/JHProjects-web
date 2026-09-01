import { Suspense, lazy } from "react";
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

/**
 * The admin dashboard is the one route that is loaded on demand, and it is
 * deliberately not in the barrel file with the rest. A visitor who never goes
 * to /admin never downloads it, which keeps the login form, the charts and the
 * whole admin API client out of the bundle every other page pays for.
 */
const AdminPage = lazy(() => import("./components/pages/AdminPage"));

/** Shown for the moment the admin chunk is in flight. */
function AdminFallback() {
  return (
    <div className="flex min-h-screen w-full place-items-center justify-center bg-[#0e1014]">
      <p className="pixel-font text-[10px] tracking-widest text-slate-600">LOADING</p>
    </div>
  );
}

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
        {/* Unlinked, noindexed, and useless without a session. */}
        <Route
          path="admin"
          element={
            <Suspense fallback={<AdminFallback />}>
              <AdminPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
