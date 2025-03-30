import * as React from "react";
import { SVGProps } from "react";

const IconPlusComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    height={props.height || 24}
    width={props.width || 24}
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z" />
  </svg>
);

export default IconPlusComponent;
