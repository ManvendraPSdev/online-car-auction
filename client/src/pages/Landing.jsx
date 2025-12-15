import { useSelector } from "react-redux";
import { CTA } from "../components/Landing/CTA";
import { Features } from "../components/Landing/Features";
import { Hero } from "../components/Landing/Hero";
import Dashboard from "./Dashboard";
import LoadingScreen from "../components/LoadingScreen";
import { Auction } from "../components/Landing/Auction";

export const Landing = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if(loading) return <LoadingScreen/>
  
  return (
    <div className="min-h-screen" style={{ 
      backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 25%, #0f0f0f 50%, #0a0a0a 75%, #1a1a1a 100%)' 
    }}>
      {!user && (
        <>
          <Hero />
          <Auction/>
          <Features />
          <CTA />
        </>
      )}
      {user && <Dashboard />}
    </div>
  );
};
