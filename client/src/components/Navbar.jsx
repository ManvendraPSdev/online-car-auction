import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { logout } from "../store/auth/authSlice";
import { RiAuctionLine } from "react-icons/ri";
import { MdMenuOpen, MdOutlineAccountCircle } from "react-icons/md";
import { IoCloseSharp, IoLogOutOutline } from "react-icons/io5";
import { Button } from "./ui/Button";

const navGroups = [
  {
    id: "auctions",
    label: "Auctions",
    items: [
      { title: "Live Auctions", desc: "Bid in real time on curated supercars", href: "/auction" },
      { title: "Upcoming Drops", desc: "Get notified for next hypercar releases", href: "/create" },
      { title: "Private Sales", desc: "White-glove deals for collectors", href: "/contact" },
    ],
  },
  {
    id: "platform",
    label: "Platform",
    items: [
      { title: "Seller Console", desc: "List vehicles with concierge assistance", href: "/myauction" },
      { title: "Buyer Guard", desc: "Escrow, inspections, secure payouts", href: "/privacy" },
      { title: "Analytics", desc: "Market intel & pricing guidance", href: "/" },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    items: [
      { title: "How it works", desc: "From verification to final delivery", href: "/about" },
      { title: "Support", desc: "Concierge & priority assistance", href: "/contact" },
      { title: "Legal", desc: "Compliance, terms, and policies", href: "/legal" },
    ],
  },
];

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/5 bg-black/95 backdrop-blur-xs">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center" style={{ boxShadow: "0 16px 45px rgba(0,0,0,0.35)" }}>
              <RiAuctionLine className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg font-semibold text-white tracking-tight">
              CarTradeHub
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-2 relative">
            {navGroups.map((group) => (
              <div
                key={group.id}
                onMouseEnter={() => setOpenMenu(group.id)}
                onMouseLeave={() => setOpenMenu(null)}
                className="relative px-2"
              >
                <button className="text-white hover:text-white/80 px-3 py-2 rounded-xl transition duration-200">
                  {group.label}
                </button>
                <AnimatePresence>
                  {openMenu === group.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-0 mt-3 w-[380px] rounded-2xl bg-white/8 backdrop-blur-md border border-white/10 shadow-elevated p-4"
                    >
                      <div className="grid grid-cols-1 gap-3">
                        {group.items.map((item) => (
                          <Link
                            key={item.title}
                            to={item.href}
                            className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition duration-200"
                          >
                            <div className="text-white font-semibold text-sm">
                              {item.title}
                            </div>
                            <p className="text-white/70 text-xs mt-1">
                              {item.desc}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
                >
                  <MdOutlineAccountCircle className="h-5 w-5 text-white" />
                  <span className="text-sm">Account</span>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-white border border-white/10 hover:bg-white/10 transition"
                >
                  Log in
                </Link>
                <Button size="sm" onClick={() => navigate("/signup")}>
                  Get Started
                </Button>
              </>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden text-white hover:text-white/80"
            aria-label="Open menu"
          >
            <MdMenuOpen className="h-7 w-7" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute right-0 top-0 h-full w-80 bg-black shadow-elevated border-l border-white/10 p-5 space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center" style={{ boxShadow: "0 16px 45px rgba(0,0,0,0.35)" }}>
                    <RiAuctionLine className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-white">
                    CarTradeHub
                  </span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white hover:text-white/80"
                  aria-label="Close menu"
                >
                  <IoCloseSharp className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                {navGroups.map((group) => (
                  <div key={group.id}>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-2">
                      {group.label}
                    </p>
                    <div className="space-y-2">
                      {group.items.map((item) => (
                        <Link
                          key={item.title}
                          to={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white hover:bg-white/10 transition"
                        >
                          <div className="font-semibold text-sm">
                            {item.title}
                          </div>
                          <p className="text-white/70 text-xs mt-1">
                            {item.desc}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white"
                    >
                      <MdOutlineAccountCircle className="h-5 w-5 text-white" />
                      Account
                    </Link>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-white hover:bg-white/10 transition"
                    >
                      <IoLogOutOutline className="h-5 w-5" />
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-center rounded-xl border border-white/10 px-4 py-3 text-white hover:bg-white/10 transition"
                    >
                      Log in
                    </Link>
                    <Button
                      className="w-full"
                      onClick={() => {
                        navigate("/signup");
                        setIsMenuOpen(false);
                      }}
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const LoginSignup = () => {
  return (
    <div className="hidden lg:flex items-center space-x-3">
      <Link
        to="/login"
        className="px-4 py-2 rounded-xl text-white border border-white/10 hover:bg-white/10 transition"
      >
        Log in
      </Link>
      <Link to="/signup">
        <Button size="sm">Get Started</Button>
      </Link>
    </div>
  );
};
