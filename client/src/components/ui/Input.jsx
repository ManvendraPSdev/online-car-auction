import { cn } from "../../utils/cn";

export function Input({
  label,
  helper,
  error,
  className,
  id,
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-ink-100 tracking-tight"
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          "relative group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xs shadow-bordered",
          error
            ? "border-red-400/60"
            : "focus-within:border-accent/60 focus-within:shadow-[0_0_0_1px_rgba(159,135,255,0.45)]",
          className
        )}
      >
        <input
          id={id}
          className="w-full bg-transparent text-ink-50 placeholder:text-ink-400 px-4 py-3 rounded-2xl outline-none"
          {...props}
        />
      </div>
      {(helper || error) && (
        <p className={cn("text-xs", error ? "text-red-300" : "text-ink-300")}>
          {error || helper}
        </p>
      )}
    </div>
  );
}

export default Input;

