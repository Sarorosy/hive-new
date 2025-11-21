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
import CookiePolicy from "../pages/CookiePolicy";
import BlogsListPage from "../pages/blogs/BlogsListPage";
import BlogDetails from "../pages/blogs/BlogDetails";
import CareersListPage from "../pages/careers/CareersListPage";
import AccountForm from "../pages/account/AccountForm";
import Profile from "../pages/account/Profile";
import AllFaq from "../pages/faq/AllFaq";
import DayPass from "../pages/daypass/DayPass";
import MarzipanoViewer from "../pages/MarzipanoViewer";
import Test from "../pages/account/Test";
import EcosystemPage from "../pages/EcosystemPage";
import AdminPrivateRoute from "./AdminPrivateRoute";
import WebmasterLayout from "../layouts/WebmasterLayout";
import Login from "../pages/webmaster/Login";
import Dashboard from "../pages/webmaster/pages/Dashboard";
import ManageUsers from "../pages/webmaster/pages/users/ManageUsers";
import VerifyToken from "../pages/account/VerifyToken";
import AddBlog from "../pages/webmaster/pages/blog/AddBlog";
import ManageBlogs from "../pages/webmaster/pages/blog/ManageBlogs";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/constants";
import ManageJobs from "../pages/webmaster/pages/jobs/ManageJobs";
import Locations from "../pages/webmaster/pages/common/Locations";
import Others from "../pages/webmaster/pages/Others";
import JobCategories from "../pages/webmaster/pages/common/JobCategories";
import Tags from "../pages/webmaster/pages/common/Tags";
import Category from "../pages/webmaster/pages/common/Category";
import CareerDetails from "../pages/careers/CareerDetails";
import JobApplications from "../pages/webmaster/pages/jobs/JobApplications";
import ProductCategories from "../pages/webmaster/pages/common/ProductCategories";
import ProductTags from "../pages/webmaster/pages/common/ProductTags";
import ManageProducts from "../pages/webmaster/pages/products/ManageProducts";
import ManageOrders from "../pages/webmaster/pages/orders/ManageOrders";
import Cart from '../pages/account/Cart';
import { useAuth } from "../utils/idb";
import AboutUs from "../pages/about/AboutUs";
import Contact from "../pages/contact/Contact";
import AllLocations from "../pages/AllLocations";


export default function AppRouter() {

  const [blogs, setBlogs] = useState([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const fetchBlogs = async () => {
    try {
      setBlogLoading(true);
      const res = await fetch(`${API_URL}/api/blogs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.status) {
        setBlogs(data.blogs || []);
        // setTotal(data.total || 0);
        // setTotalBlogs(data.total_blogs || 0);
      } else {
        console.error(data.message || "Failed to fetch blogs");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setBlogLoading(false)
    }
  };

  const [jobs, setJobs] = useState([]);
  const [jobLoading, setJobLoading] = useState(false);
  const fetchJobs = async () => {
    try {
      setJobLoading(true);
      const res = await fetch(`${API_URL}/api/jobs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.status) {
        setJobs(data.jobs || []);
        // setTotal(data.total || 0);
        // setTotalBlogs(data.total_blogs || 0);
      } else {
        console.error(data.message || "Failed to fetch blogs");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setJobLoading(false)
    }
  };


  useEffect(() => {
    fetchBlogs();
    fetchJobs();
  }, []);

  const { user } = useAuth();

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/:city/:branch" element={<Center />} />
            <Route path="/:city" element={<Center />} />
            <Route path="/locations" element={<AllLocations />} />

            <Route
              path="/landlord-relationships"
              element={<LandlordRelationship />}
            />

            <Route path="/workspaces/:slug" element={<WorkspacePage />} />

            <Route path="/product/:slug" element={<ProductPage />} />

            <Route path="/explore/:location/:offering" element={<ExplorePage />} />


            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />

            <Route path="/blog" element={<BlogsListPage blogs={blogs} blogLoading={blogLoading} />} />
            <Route path="/blog/:slug" element={<BlogDetails blogs={blogs} blogLoading={blogLoading} />} />

            <Route path="/careers" element={<CareersListPage jobs={jobs} jobLoading={jobLoading} />} />
            <Route path="/job/:slug" element={<CareerDetails />} />

            <Route path="/account/login/:SESSION_EXPIRED?" element={<AccountForm />} />
            <Route path="/account/profile" element={<Profile />} />

            <Route path="/support/faq" element={<AllFaq />} />
            <Route path="/day_pass" element={<DayPass />} />
            <Route path="/Ecosystem" element={<EcosystemPage />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="/m" element={<MarzipanoViewer />} />

            <Route path="/test" element={<Test />} />


            <Route path="*" element={<NotFound />} />
            <Route path="/404" element={<NotFound />} />
          </Route>
        </Route>
        <Route path="/verify-email" element={<VerifyToken />} />


        <Route element={<AdminPrivateRoute />}>
          <Route element={<WebmasterLayout />}>
            <Route path="/webmaster" element={<Dashboard />} />
            <Route path="/webmaster/users/" element={<ManageUsers />} />
            <Route path="/webmaster/blogs/" element={<ManageBlogs />} />
            <Route path="/webmaster/jobs/" element={<ManageJobs />} />
            <Route path="/webmaster/others/" element={<Others />} />
            <Route path="/webmaster/locations/" element={<Locations />} />
            <Route path="/webmaster/job-categories/" element={<JobCategories />} />
            <Route path="/webmaster/tags/" element={<Tags />} />
            <Route path="/webmaster/blog-categories/" element={<Category />} />
            <Route path="/webmaster/product-categories/" element={<ProductCategories />} />
            <Route path="/webmaster/product-tags/" element={<ProductTags />} />


            <Route path="/webmaster/products/" element={<ManageProducts />} />
            <Route path="/webmaster/orders/" element={<ManageOrders />} />


            <Route path="/webmaster/job-applications/" element={<JobApplications />} />


          </Route>
        </Route>

        <Route path="/webmaster/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
