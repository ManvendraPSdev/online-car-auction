import { Link } from "react-router";

export default function AuctionCard({ auction }) {
  const timeLeft = auction.timeLeft || 0;
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  const getTimerDisplay = () => {
    if (days > 0) return `${days}d ${remainingHours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m`;
    return "Ended";
  };

  const getTimerColor = () => {
    if (days > 1) return "green";
    if (hours > 5) return "orange";
    return "red";
  };

  const timerColor = getTimerDisplay() === "Ended" ? "gray" : getTimerColor();
  const timerBg = {
    green: "rgba(34, 197, 94, 0.15)",
    orange: "rgba(249, 115, 22, 0.15)",
    red: "rgba(239, 68, 68, 0.15)",
    gray: "rgba(107, 114, 128, 0.15)",
  };
  const timerBorder = {
    green: "rgba(34, 197, 94, 0.3)",
    orange: "rgba(249, 115, 22, 0.3)",
    red: "rgba(239, 68, 68, 0.3)",
    gray: "rgba(107, 114, 128, 0.3)",
  };
  const timerText = {
    green: "rgba(74, 222, 128, 0.9)",
    orange: "rgba(251, 146, 60, 0.9)",
    red: "rgba(248, 113, 113, 0.9)",
    gray: "rgba(156, 163, 175, 0.9)",
  };

  return (
    <Link to={`/auction/${auction._id}`}>
      <div
        className="group relative rounded-[18px] overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow = "0 30px 70px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)";
        }}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={auction.itemPhoto || "https://picsum.photos/300"}
            alt={auction.itemName}
            className="w-full h-full object-cover"
            style={{ borderRadius: "14px" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          
          <div
            className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5"
            style={{
              backgroundColor: timerBg[timerColor],
              backdropFilter: "blur(10px)",
              border: `1px solid ${timerBorder[timerColor]}`,
              color: timerText[timerColor],
              boxShadow: "0 4px 12px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)",
            }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{getTimerDisplay()}</span>
          </div>

          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg backdrop-blur-[10px] border border-white/10 text-white/90 text-xs font-medium" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
            {auction.itemCategory}
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-1.5 text-[#ffffff] leading-tight line-clamp-1">
              {auction.itemName}
            </h3>
            <p className="text-[#b5b5b5] text-sm leading-relaxed line-clamp-2">
              {auction.itemDescription}
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-[#b5b5b5] uppercase tracking-wide">
                Current Bid
              </span>
              <span className="font-bold text-xl text-[#ffffff]">
                ${(auction.currentPrice || auction.startingPrice || 0).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-white/5">
              <span className="text-xs text-[#b5b5b5]">Bids</span>
              <span className="text-sm font-semibold text-[#b5b5b5]">
                {auction.bidsCount || 0}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/5">
            <p className="text-xs text-[#b5b5b5] mb-4">
              Seller: <span className="text-[#b5b5b5] font-medium">{auction?.sellerName || auction?.seller?.name || "Unknown"}</span>
            </p>

            <button
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/auction/${auction._id}`;
              }}
              className="w-full text-[#ffffff] py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 relative overflow-hidden"
              style={{
                backgroundColor: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.2), inset 0 0 20px rgba(255,255,255,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Place Bid
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
