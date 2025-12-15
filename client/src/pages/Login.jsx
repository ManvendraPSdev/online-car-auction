import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../store/auth/authSlice";
import { Link } from "react-router";
import LoadingScreen from "../components/LoadingScreen";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(formData)).unwrap();
      navigate("/");
    } catch (error) {
      console.log("Login Failed", error);
      setIsError(error || "something went wrong");
      setTimeout(() => {
        setIsError("");
      }, 10000);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ 
      backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 25%, #0f0f0f 50%, #0a0a0a 75%, #1a1a1a 100%)' 
    }}>
      <main className="relative flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="border border-white/10 rounded-md bg-white/5 backdrop-blur-xs p-8">
            <div className="text-center space-y-3 mb-6">
              <p className="text-xs uppercase tracking-[0.25em] text-white/70">
                SECURE ACCESS
              </p>
              <h1 className="text-3xl font-semibold text-white">Log in</h1>
              <p className="text-white/70 text-sm">
                Continue to your garage, bids, and concierge.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white/80">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@collector.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white placeholder:text-white/50 outline-none focus:border-white/20 focus:bg-white/10 transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-white/80">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white placeholder:text-white/50 outline-none focus:border-white/20 focus:bg-white/10 transition-colors"
                  required
                />
              </div>

              {isError && (
                <div className="rounded-md border border-red-400/50 bg-red-500/10 text-red-200 px-4 py-3 text-sm">
                  {isError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-center py-3 px-4 rounded-md font-medium transition-colors"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>

            <div className="mt-4 text-center text-sm text-white/70">
              <Link to="#" className="text-white hover:text-white/80 underline">
                Forgot your password?
              </Link>
            </div>

            <div className="mt-6 text-center text-sm text-white/70">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-white hover:text-white/80 underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
