import { LockIcon } from "./icons";

type AppWindowProps = {
  src: string;
  alt: string;
  /** Hero image: load eagerly and zoom in on phones so the app stays legible. */
  priority?: boolean;
  className?: string;
};

/** A screenshot of the app in a light browser frame. */
export function AppWindow({ src, alt, priority = false, className = "" }: AppWindowProps) {
  return (
    <div className={`overflow-hidden bg-white ring-1 ring-black/5 ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-black/5 bg-[#fbfbfe] px-3 py-2.5 sm:px-4 sm:py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57] sm:size-3" />
        <span className="size-2.5 rounded-full bg-[#febc2e] sm:size-3" />
        <span className="size-2.5 rounded-full bg-[#28c840] sm:size-3" />
        <span className="mx-auto inline-flex items-center gap-1.5 truncate rounded-full bg-brand-50 px-3 py-1 text-[11px] font-medium text-muted sm:px-4 sm:text-xs">
          <LockIcon className="size-3 text-brand-600" />
          app.h2m.marketing
        </span>
        <span className="w-[38px] sm:w-[46px]" />
      </div>
      {priority ? (
        <img src={src} alt={alt} width={1600} height={1000} fetchPriority="high"
          className="block h-auto w-[165%] max-w-none sm:w-full sm:max-w-full" />
      ) : (
        <img src={src} alt={alt} width={1600} height={1000} loading="lazy" className="block h-auto w-full" />
      )}
    </div>
  );
}
