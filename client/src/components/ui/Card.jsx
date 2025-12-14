import { cn } from "../../utils/cn";

export function Card({ className, children }) {
  return (
    <div
      className={cn(
        "glass-panel  border border-white/10 p-6",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;

