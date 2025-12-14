import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../store/auth/authSlice";
import { Link } from "react-router";
import LoadingScreen from "../components/LoadingScreen";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signup(formData)).unwrap();
      navigate("/");
    } catch (error) {
      console.log("Signup Failed", error);
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
    <div className="min-h-screen bg-carbon-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-lux-gradient opacity-70 pointer-events-none" />
      <main className="relative flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <Card className="bg-white/5 border-white/8 p-8 shadow-elevated backdrop-blur-xs">
            <div className="text-center space-y-3 mb-6">
              <p className="text-xs uppercase tracking-[0.25em] text-ink-300">
                Premium Access
              </p>
              <h1 className="text-3xl font-semibold text-white">
                Create your account
              </h1>
              <p className="text-ink-300 text-sm">
                Join the invite-only marketplace for high-end auctions.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="name"
                label="Full Name"
                placeholder="Alex Carter"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              <Input
                id="email"
                label="Email"
                type="email"
                placeholder="you@collector.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />

              <Input
                id="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                minLength={8}
                helper="Minimum 8 characters for secure access."
              />

              {isError && (
                <div className="rounded-xl border border-red-400/50 bg-red-500/10 text-red-200 px-4 py-3 text-sm">
                  {isError}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-ink-200">
              Already have an account?{" "}
              <Link to="/login" className="text-accent hover:underline">
                Log in
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Signup;
