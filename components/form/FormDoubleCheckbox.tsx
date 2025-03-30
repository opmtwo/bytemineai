import { ChangeEvent, useState } from "react";
import { v4 } from "uuid";
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";
import CardAnimatePresence from "../cards/CardAnimatePresence";
import FormField from "./FormField";
import FormLabel from "./FormLabel";

const icon = {
  hidden: {
    pathLength: 0,
    fill: "rgba(151, 151, 151, 0)",
    stroke: "rgba(151, 151, 151, 0)",
  },
  visible: {
    pathLength: 1,
    fill: "rgba(151, 151, 151, 1)",
    stroke: "rgba(151, 151, 151, 1)",
  },
};

const FormDoubleCheckbox = ({
  name,
  value,
  isChecked = false,
  label,
  className,
  error,
  onChange,
}: {
  name?: string;
  value?: string | number | boolean;
  isChecked?: boolean;
  label?: string;
  className?: string;
  error?: Error;
  onChange?: Function;
}) => {
  const [id, setId] = useState(v4());

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange && e && e.target) {
      onChange(e.target.checked);
    }
  };

  const cssClassNames = classNames(
    "icon is-flex is-relative has-border has-radius is-clickable has-text-grey is-unselectable p-3 mr-3",
    className
  );

  return (
    <>
      <label
        htmlFor={id}
        className="is-flex is-align-items-center is-clickable is-unselectable is-checkbox"
      >
        <input
          className="is-hidden"
          type="checkbox"
          id={id}
          name={name}
          value={value as any}
          onChange={handleChange}
          checked={isChecked}
        />
        <span className={cssClassNames} style={{ width: 20, height: 20 }}>
          <span className="is-overlay is-flex is-align-items-center is-justify-content-center">
            <AnimatePresence exitBeforeEnter={true}>
              {isChecked && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  width={16}
                  height={16}
                >
                  <motion.line
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    x1="3"
                    x2="12"
                    y1="16"
                    y2="25"
                    variants={icon}
                    initial="hidden"
                    animate="visible"
                  />
                  <motion.line
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    x1="12"
                    x2="29"
                    y1="25"
                    y2="7"
                    variants={icon}
                    initial="hidden"
                    animate="visible"
                  />
                </svg>
              )}
            </AnimatePresence>
          </span>
        </span>
        <span
          className={error ? "has-text-danger" : "has-text-grey"}
          style={{ whiteSpace: "nowrap", fontSize: "85%" }}
        >
          {label}
        </span>
      </label>
      <CardAnimatePresence isActive={error !== undefined}>
        <p className="help is-danger m-0 pt-3">{error?.message}</p>
      </CardAnimatePresence>
    </>
  );
};

export default FormDoubleCheckbox;
