import AuctionCard from "../components/AuctionCard.jsx";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { dashboardStats } from "../api/auction.js";
import LoadingScreen from "../components/LoadingScreen.jsx";

const Dashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: () => dashboardStats(),
    staleTime: 30 * 1000,
  });

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen" style={{ 
      backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 25%, #0f0f0f 50%, #0a0a0a 75%, #1a1a1a 100%)' 
    }}>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-xs border border-white/10 p-6 rounded-2xl ">
            <h3 className="text-sm font-medium text-ink-300">
              Total Auctions
            </h3>
            <p className="text-2xl font-bold text-white mt-1">
              {data.totalAuctions}
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-xs border border-white/10 p-6 rounded-2xl ">
            <h3 className="text-sm font-medium text-ink-300">
              Active Auctions
            </h3>
            <p className="text-2xl font-bold text-white mt-1">
              {data.activeAuctions}
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-xs border border-white/10 p-6 rounded-2xl ">
            <h3 className="text-sm font-medium text-ink-300">Your Auctions</h3>
            <p className="text-2xl font-bold text-white mt-1">
              {data.userAuctionCount}
            </p>
          </div>
        </div>

        {/* All Auctions Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">All Auctions</h2>
            <Link
              to="/auction"
              className="text-ink-200 hover:text-white font-medium text-sm hover:underline transition-colors"
            >
              View More
            </Link>
          </div>

          {data.latestAuctions.length === 0 ? (
            <div className="text-center py-12 bg-white/5 backdrop-blur-xs border border-white/10 rounded-2xl ">
              <p className="text-ink-300 text-lg">
                No auctions available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-4">
              {data.latestAuctions.map((auction) => (
                <AuctionCard key={auction._id} auction={auction} />
              ))}
            </div>
          )}
        </div>

        {/* Your Auctions Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Your Auctions</h2>
            <Link
              to="/myauction"
              className="text-ink-200 hover:text-white font-medium text-sm hover:underline transition-colors"
            >
              View More
            </Link>
          </div>

          {data.latestUserAuctions.length === 0 ? (
            <div className="text-center py-12 bg-white/5 backdrop-blur-xs border border-white/10 rounded-2xl ">
              <p className="text-ink-300 text-lg">
                You haven't created any auctions yet.
              </p>{" "}
              <Link to="/create">
                <button className="mt-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-2 rounded-2xl transition-all duration-300">
                  Create Your First Auction
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-4">
              {data.latestUserAuctions.map((auction) => (
                <AuctionCard key={auction._id} auction={auction} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
