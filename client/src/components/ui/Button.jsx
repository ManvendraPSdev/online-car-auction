import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const variants = {
  primary:
    "bg-gradient-to-r from-white to-ink-100 text-carbon-900 shadow-elevated border border-white/20 hover:shadow-[0_24px_60px_rgba(255,255,255,0.12)]",
  ghost:
    "bg-white/5 text-ink-50 border border-white/10 hover:bg-white/10",
  outline:
    "bg-transparent text-ink-50 border border-white/20 hover:border-white/40",
};

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-base",
  lg: "h-14 px-6 text-lg",
};

export function Button({
  className,
  children,
  variant = "primary",
  size = "md",
  as = "button",
  ...props
}) {
  const Component = motion[as] || motion.button;

  return (
    <Component
      whileHover={{ y: -2, boxShadow: "0 20px 60px rgba(0,0,0,0.55)" }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center rounded-2xl font-semibold transition-all duration-300 ease-soft focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-0",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Button;

