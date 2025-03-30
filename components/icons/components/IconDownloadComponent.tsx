import * as React from "react";
import { SVGProps } from "react";

const IconDownloadComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    height={props.height || 24}
    width={props.width || 24}
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="currentColor" d="M5 20h14v-2H5m14-9h-4V3H9v6H5l7 7 7-7Z" />
  </svg>
);

export default IconDownloadComponent;
