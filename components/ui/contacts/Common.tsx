import * as React from "react";

export const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="py-1 px-5 dropdown-item">{children}</div>
);

export const Header = ({
  className = "",
  children,
  ...rest
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={`has-text-primary is-size-6-1 has-text-weight-semibold ${className}`}
    {...rest}
  >
    {children}
  </div>
);

export const THROTTLE_LIMIT = 50;
export const THROTTLE_TIME = 1000;
