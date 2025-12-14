import { FaClock, FaArrowRight, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router";
// import { AdsComponent } from "../AdsComponent";

export const Auction = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Live Auctions</h2>
          <Link
            to="/signup"
            className="text-white/70 hover:text-white flex items-center"
          >
            View all <FaChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-2">
          {/* Auction Item 1 */}
          <div className="border border-white/10 rounded-md overflow-hidden transition-shadow bg-white/5 backdrop-blur-xs">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1506610654-064fbba4780c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Florian Schneider"
                className="w-full h-48 object-contain"
              />
              <div className="absolute top-2 right-2 bg-red-500/80 backdrop-blur-sm text-white px-2 py-1 rounded-sm text-xs font-medium">
                <FaClock className="inline h-3 w-3 mr-1" />
                2h 15m
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-white mb-2 line-clamp-2">
                Florian Schneider's Porsche 911 GT3 RS
              </h3>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-white/70">Current Bid</p>
                  <p className="text-lg font-bold text-white">$24500.00</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/70">Bids</p>
                  <p className="text-sm font-medium text-white/80">12</p>
                </div>
              </div>
              <Link to='/signup'>
              <div className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-center py-2 px-4 rounded-sm font-medium transition-colors">
                Place Bid
              </div>
              </Link>
            </div>
          </div>

          {/* Auction Item 2 */}
          <div className="border border-white/10 rounded-md overflow-hidden transition-shadow bg-white/5 backdrop-blur-xs">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1592853625597-7d17be820d0c?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Antique Watch"
                className="w-full h-48 object-contain"
              />
              <div className="absolute top-2 right-2 bg-orange-500/80 backdrop-blur-sm text-white px-2 py-1 rounded-sm text-xs font-medium">
                <FaClock className="inline h-3 w-3 mr-1" />
                5h 42m
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-white mb-2 line-clamp-2">
                Grey Porche 718 Cayman
              </h3>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-white/70">Current Bid</p>
                  <p className="text-lg font-bold text-white">$1,25900.00</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/70">Bids</p>
                  <p className="text-sm font-medium text-white/80">28</p>
                </div>
              </div>
              <Link to='/signup'>
              <div className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-center py-2 px-4 rounded-sm font-medium transition-colors">
                Place Bid
              </div>
              </Link>
            </div>
          </div>

          {/* Auction Item 3 */}
          <div className="border border-white/10 rounded-md overflow-hidden transition-shadow bg-white/5 backdrop-blur-xs">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1524102724373-bcf6ed410592?q=80&w=2055&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Art Painting"
                className="w-full h-48 object-contain"
              />
              <div className="absolute top-2 right-2 bg-green-500/80 backdrop-blur-sm text-white px-2 py-1 rounded-sm text-xs font-medium">
                <FaClock className="inline h-3 w-3 mr-1" />
                1d 3h
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-white mb-2 line-clamp-2">
                BMW 3 Series E21
              </h3>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-white/70">Current Bid</p>
                  <p className="text-lg font-bold text-white">$89000.00</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/70">Bids</p>
                  <p className="text-sm font-medium text-white/80">7</p>
                </div>
              </div>
              <Link to='/signup'>
              <div className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-center py-2 px-4 rounded-sm font-medium transition-colors">
                Place Bid
              </div>
              </Link>
            </div>
          </div>
        </div>
        {/* <AdsComponent dataAdSlot="5537585913" /> */}
      </div>
    </section>
  );
};
