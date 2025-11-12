import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./page/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./page/Signup";
import Login from "./page/Login";
import NotFound from "./page/NotFound";
import About from "./page/About";
import ContactUs from "./page/ContactUs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./page/Profile";
import AvailableFood from "./page/AvailableFood";
import Donate from "./page/Donate";
import ProtectedRoute from "./ProtectedRoute";
import EditProfile from "./page/EditProfile";
import ClaimedFood from "./page/ClaimedFood";
import DonatedFood from "./page/DonatedFood";
import ForgotPassword from "./page/ForgotPassword";
import VolunteerDashboard from "./page/VolunteerDashboard";
import VolunteerTasks from "./page/VolunteerTasks";
import VolunteerLogin from "./page/VolunteerLogin";
import FoodDetails from "./page/FoodDetails";
import Terms from "./page/Terms";
import Privacy from "./page/Privacy";
import Legal from "./page/Legal";

function App() {
  return (
    <Router>
      {" "}
      {/* Ensure everything is inside BrowserRouter */}
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* Common capitalization redirects */}
        <Route path="/Login" element={<Navigate to="/login" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/profile/:email" element={<Profile />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/food-available" element={<AvailableFood />} />
          <Route
            path="/profile/:email/edit-profile"
            element={<EditProfile />}
          />
          <Route path="/donate" element={<Donate />} />
          <Route path="/claimed/:email" element={<ClaimedFood />} />
          <Route path="/donated/:email" element={<DonatedFood />} />
        </Route>
        <Route path="/volunteer" element={<VolunteerDashboard />} />
        <Route path="/volunteer/tasks" element={<VolunteerTasks />} />
        <Route path="/volunteer-login" element={<VolunteerLogin />} />
        <Route path="/food/:id" element={<FoodDetails />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/legal" element={<Legal />} />
        <Route
          path="/Volunteer-Login"
          element={<Navigate to="/volunteer-login" replace />}
        />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />{" "}
        {/* Wildcard route to catch unknown paths */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
