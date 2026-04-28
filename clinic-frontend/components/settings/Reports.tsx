import React from "react";

type Props = {
  isPro: boolean;
  title: string;
  description?: string;
  children: React.ReactNode;
  onUpgrade?: () => void;
};

const ProBadge = () => (
  <span className="text-[10px] bg-yellow-400 text-black px-2 py-0.5 rounded-full font-bold ml-1">
    PRO
  </span>
);

export default function Reports({
  isPro,
  title,
  description,
  children,
  onUpgrade,
}: Props) {
  return (
    <div className="relative">
      {/* Content */}
      <div className={!isPro ? "blur-sm pointer-events-none select-none" : ""}>
        {children}
      </div>

      {/* Lock Overlay */}
      {!isPro && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center bg-white/90 backdrop-blur-sm p-5 rounded-lg shadow-md max-w-sm">
            <div className="font-semibold text-lg flex items-center justify-center">
              {title} <ProBadge />
            </div>

            {description && (
              <p className="text-sm text-gray-500 mt-2">{description}</p>
            )}

            <button
              onClick={onUpgrade}
              className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}