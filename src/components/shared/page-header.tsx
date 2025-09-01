// components/dashboard/page-header.tsx
import { ReactNode } from "react";

type PageHeaderProps = {
  title: string | ReactNode;
  subtitle?: string;
  children?: ReactNode; // buttons, search bar, dropdowns etc.
};

export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-2">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-x-2">{title}</h1>
        {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
