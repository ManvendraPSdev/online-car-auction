import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../utils/cn";

export function Select({ label, options = [], value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className="space-y-2 relative">
      {label && (
        <label className="text-sm font-medium text-ink-100 tracking-tight">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xs text-left px-4 py-3 text-ink-50 focus:outline-none focus:ring-2 focus:ring-accent/40"
      >
        <span className="text-ink-50">
          {selected ? selected.label : placeholder || "Select"}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute z-20 mt-2 w-full rounded-2xl bg-carbon-800/90 border border-white/10 backdrop-blur-xs shadow-elevated overflow-hidden"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={cn(
                  "w-full text-left px-4 py-3 text-sm text-ink-50 hover:bg-white/5 transition",
                  option.value === value && "bg-white/10"
                )}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Select;


