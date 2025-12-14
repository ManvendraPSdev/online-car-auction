import { Link } from "react-router";

export const Hero = () => {
  const highlights = [
    "White-glove onboarding for collectors",
    "Cinematic live auctions with escrow",
    "Concierge inspections & delivery",
  ];

  return (
    <section className="relative overflow-hidden bg-black py-12 md:py-18">
      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="space-y-6">
          <p className="text-white/70 text-sm uppercase tracking-[0.25em]">
            Premium Car Auction SaaS
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight">
            Elevate every auction with{" "}
            <span className="text-white/90">
              cinematic precision
            </span>
          </h1>
          <p className="text-white/70 text-lg max-w-xl">
            Curated hypercars, secure bidding, concierge logistics, and analytics—crafted for elite sellers and serious buyers.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/signup">
              <button className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-colors">
                Start a premium auction
              </button>
            </Link>
            <Link to="/auction">
              <button className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-colors">
                Explore live auctions
              </button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 pt-4">
            {highlights.map((item) => (
              <div key={item} className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-xs">
                <p className="text-sm text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
