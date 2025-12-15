import { useRef, useState } from "react";
import { useParams, Link } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { placeBid, viewAuction } from "../api/auction.js";
import { useSelector } from "react-redux";
import LoadingScreen from "../components/LoadingScreen.jsx";

export const ViewAuction = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();
  const inputRef = useRef();
  const [bidError, setBidError] = useState("");
  const [bidSuccess, setBidSuccess] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["viewAuctions", id],
    queryFn: () => viewAuction(id),
    staleTime: 30 * 1000,
    placeholderData: () => undefined,
  });

  const placeBidMutate = useMutation({
    mutationFn: ({ bidAmount, id }) => placeBid({ bidAmount, id }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["viewAuctions", id] });
      queryClient.invalidateQueries({ queryKey: ["viewAuctions"] });
      queryClient.invalidateQueries({ queryKey: ["allAuction"] });
      queryClient.invalidateQueries({ queryKey: ["myauctions"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      if (inputRef.current) inputRef.current.value = "";
      setBidSuccess(data?.message || "Bid placed successfully!");
      setBidError("");
      setTimeout(() => setBidSuccess(""), 5000);
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || error?.message || "Failed to place bid";
      setBidError(errorMessage);
      setBidSuccess("");
      setTimeout(() => setBidError(""), 10000);
    },
  });

  if (isLoading) return <LoadingScreen />;

  const handleBidSubmit = (e) => {
    e.preventDefault();
    setBidError("");
    setBidSuccess("");
    let bidAmount = e.target.bidAmount.value.trim();
    
    if (!bidAmount || isNaN(bidAmount)) {
      setBidError("Please enter a valid bid amount");
      return;
    }

    const bidNum = Number(bidAmount);
    const minBid = data.currentPrice + 1;
    const maxBid = data.currentPrice + 10;

    if (bidNum < minBid) {
      setBidError(`Bid must be at least $${minBid}`);
      return;
    }

    if (bidNum > maxBid) {
      setBidError(`Bid must be at most $${maxBid}`);
      return;
    }

    placeBidMutate.mutate({ bidAmount: bidNum, id });
  };

  const daysLeft = Math.ceil(
    Math.max(0, new Date(data.itemEndDate) - new Date()) / (1000 * 60 * 60 * 24)
  );
  const isActive = Math.max(0, new Date(data.itemEndDate) - new Date()) > 0;

  return (
    <div className="min-h-screen mx-auto container" style={{ 
      backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 25%, #0f0f0f 50%, #0a0a0a 75%, #1a1a1a 100%)' 
    }}>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4 grid grid-cols-1 place-items-center content-start">
            <div className="max-w-xl aspect-square bg-white/5 backdrop-blur-xs border border-white/10 rounded-2xl  overflow-hidden flex items-center justify-center">
              <img
                src={data.itemPhoto || "https://picsum.photos/601"}
                alt={data.itemName}
                className="h-full w-full object-fill"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/10 text-ink-200 px-2 py-1 rounded-2xl text-xs font-medium border border-white/10">
                  {data.itemCategory}
                </span>
                <span
                  className={`px-2 py-1 rounded-2xl text-xs font-medium border ${
                    isActive
                      ? "bg-white/10 text-white border-white/20"
                      : "bg-white/5 text-ink-300 border-white/10"
                  }`}
                >
                  {isActive ? "Active" : "Ended"}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">
                {data.itemName}
              </h1>
              <p className="text-ink-200 leading-relaxed">
                {data.itemDescription}
              </p>
            </div>

            {/* Pricing Info */}
            <div className="bg-white/5 backdrop-blur-xs border border-white/10 p-6 rounded-2xl ">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-ink-300">Starting Price</p>
                  <p className="text-lg font-semibold text-white">
                    ${data.startingPrice}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-ink-300">Current Price</p>
                  <p className="text-2xl font-bold text-white">
                    ${data.currentPrice}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-ink-300">Total Bids</p>
                  <p className="text-lg font-semibold text-white">
                    {data.bids.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-ink-300">Time Left</p>
                  <p
                    className={`text-lg font-semibold ${
                      isActive ? "text-white" : "text-ink-400"
                    }`}
                  >
                    {isActive ? `${daysLeft} days` : "Ended"}
                  </p>
                </div>
              </div>
            </div>

            {/* Bid Form */}
            {data.seller._id != user?.user?._id && isActive && (
              <div className="bg-white/5 backdrop-blur-xs border border-white/10 p-6 rounded-2xl ">
                <h3 className="text-lg font-semibold mb-4 text-white">Place Your Bid</h3>
                {bidSuccess && (
                  <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 text-green-200 rounded-xl text-sm">
                    {bidSuccess}
                  </div>
                )}
                {bidError && (
                  <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-200 rounded-xl text-sm">
                    {bidError}
                  </div>
                )}
                <form onSubmit={handleBidSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="bidAmount"
                      className="block text-sm font-medium text-white/80 mb-1"
                    >
                      Bid Amount (minimum: ${data.currentPrice + 1} maximum: $
                      {data.currentPrice + 10})
                    </label>
                    <input
                      type="number"
                      name="bidAmount"
                      id="bidAmount"
                      ref={inputRef}
                      min={data.currentPrice + 1}
                      max={data.currentPrice + 10}
                      step="1"
                      className="w-full px-3 py-2 border border-white/10 bg-white/5 rounded-2xl text-white placeholder:text-white/50 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-colors"
                      placeholder="Enter your bid amount"
                      required
                      disabled={placeBidMutate.isPending}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={placeBidMutate.isPending}
                    className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 px-4 rounded-2xl transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {placeBidMutate.isPending ? "Placing Bid..." : "Place Bid"}
                  </button>
                </form>
              </div>
            )}

            {/* Seller Info */}
            <div className="bg-white/5 backdrop-blur-xs border border-white/10 p-6 rounded-2xl ">
              <h3 className="text-lg font-semibold mb-3 text-white">Seller Information</h3>
              <p className="text-white font-medium">{data.seller.name}</p>
            </div>
          </div>
        </div>

        {/* Bid History */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Bid History</h2>
          <div className="bg-white/5 backdrop-blur-xs border border-white/10 rounded-2xl  overflow-hidden">
            {data.bids.length === 0 ? (
              <div className="p-8 text-center text-ink-300">
                No bids yet. Be the first to bid!
              </div>
            ) : (
              <div className="divide-y divide-white/10">
                {data.bids.map((bid, index) => (
                  <div
                    key={index}
                    className="p-4 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-white">
                        {bid.bidder?.name}
                      </p>
                      <p className="text-sm text-ink-300">
                        {new Date(bid.bidTime).toLocaleDateString()} at{" "}
                        {new Date(bid.bidTime).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-white">
                        ${bid.bidAmount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
