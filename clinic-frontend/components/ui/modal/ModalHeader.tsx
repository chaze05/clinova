import { ReactNode } from "react";

interface ModalHeaderProps {
  title: string;
  subtitle?: string;
  rightContent?: ReactNode;
  badge?: string; // optional status like "Pending", "New", etc.
}

export default function ModalHeader({
  title,
  subtitle,
  rightContent,
  badge,
}: ModalHeaderProps) {
  return (
    <div className="">

      {/* Top Row */}
      <div className="flex items-start justify-between gap-4">

        {/* LEFT */}
        <div className="min-w-0">

          <div className="flex items-center gap-2 flex-wrap">

            <h2 className="text-xl font-semibold text-gray-900 leading-tight capitalize">
              {title}
            </h2>

            {/* Optional badge */}
            {badge && (
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                {badge}
              </span>
            )}

          </div>

          {subtitle && (
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              {subtitle}
            </p>
          )}

        </div>

        {/* RIGHT */}
        {rightContent && (
          <div className="flex items-center gap-2 shrink-0">
            {rightContent}
          </div>
        )}

      </div>

      {/* Subtle divider */}
      <div className="mt-4 h-px bg-gray-100" />
    </div>
  );
}