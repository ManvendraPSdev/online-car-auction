import { useState } from "react";
import AuctionCard from "../components/AuctionCard";
import { useQuery } from "@tanstack/react-query";
import { getAuctions } from "../api/auction";
import LoadingScreen from "../components/LoadingScreen";

export const AuctionList = () => {
  const [filter, setFilter] = useState("all");
  const { data, isLoading } = useQuery({
    queryKey: ["allAuction"],
    queryFn: getAuctions,
    staleTime: 30 * 1000,
  });

  if (isLoading) return <LoadingScreen />;

  const categories = [
    "all",
    ...new Set(data?.map((auction) => auction.itemCategory)),
  ];
  const filteredAuctions =
    filter === "all"
      ? data
      : data?.filter((auction) => auction.itemCategory === filter);

  return (
    <div className="min-h-screen" style={{ 
      backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 25%, #0f0f0f 50%, #0a0a0a 75%, #1a1a1a 100%)' 
    }}>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-white">
            Filter by Category
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 ${
                  filter === category
                    ? "bg-white/20 text-white border border-white/30"
                    : "bg-white/5 text-ink-200 border border-white/10 hover:bg-white/10"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            {filter === "all" ? "All Auctions" : `${filter} Auctions`}
            <span className="text-sm font-normal text-ink-300 ml-2">
              ({filteredAuctions.length} items)
            </span>
          </h2>
        </div>

        {filteredAuctions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-ink-300 text-lg">
              No auctions found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 place-items-center gap-6">
            {filteredAuctions.map((auction) => (
              <AuctionCard key={auction._id} auction={auction} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
