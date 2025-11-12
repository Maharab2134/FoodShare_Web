import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  // Redirect volunteers away from public landing page
  useEffect(() => {
    if (user && user.role === "volunteer") {
      navigate("/volunteer");
    }
  }, [user, navigate]);

  return (
    <>
      <Hero />
      <Testimonials />
      <FAQ />
    </>
  );
}
