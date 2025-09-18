import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Layout from "../layouts/Layout";
import ScrollToTop from "../components/ScrollToTop";
import Home from "../pages/Home";
import LandlordRelationship from "../pages/landlord/LandlordRelationship";
import Center from "../pages/center/Center";
import NotFound from "../components/NotFound";
import WorkspacePage from "../pages/workspace/WorkspacePage";
import ProductPage from "../pages/product/ProductPage";
import ExplorePage from "../pages/explore/ExplorePage";
import RefundPolicy from "../pages/RefundPolicy";
import TermsAndConditions from "../pages/TermsAndConditions";
import BlogsListPage from "../pages/blogs/BlogsListPage";
import BlogDetails from "../pages/blogs/BlogDetails";
import CareersListPage from "../pages/careers/CareersListPage";
import Account from "./Account";
import AllFaq from "../pages/faq/AllFaq";
import DayPass from "../pages/daypass/DayPass";
import MarzipanoViewer from "../pages/MarzipanoViewer";

export default function AppRouter() {
  return (
    <Router basename="/hive">
      <ScrollToTop />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/:city/:branch" element={<Center />} />
            <Route path="/:city" element={<Center />} />

            <Route
              path="/landlord-relationships"
              element={<LandlordRelationship />}
            />

            <Route path="/workspaces/:slug" element={<WorkspacePage />} />

            <Route path="/product/:slug" element={<ProductPage />} />

            <Route path="/explore/:location/:offering" element={<ExplorePage />} />


            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />

            <Route path="/blog" element={<BlogsListPage />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />

            <Route path="/careers" element={<CareersListPage />} />

            <Route path="/account" element={<Account />} />

            <Route path="/support/faq" element={<AllFaq />} />
            <Route path="/day_pass" element={<DayPass />} />


            <Route path="/m" element={<MarzipanoViewer />} />

            <Route path="*" element={<NotFound />} />
            <Route path="/404" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
