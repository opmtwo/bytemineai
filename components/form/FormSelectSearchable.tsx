import {
  KeyboardEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import classNames from "classnames";
import ReactSelect, { ActionMeta, MultiValue, components } from "react-select";
import CardAnimatePresence from "../cards/CardAnimatePresence";
import FormField from "./FormField";
import FormLabel from "./FormLabel";
import formStyle from "./form.module.css";

const styles = {
  control: (provided: object, state: any) => ({
    ...provided,
    borderWidth: "0 0 1px 0",
    minHeight: "42px",
    borderRadius: "0",
    boxShadow: "none",
    borderColor: state.isFocused ? "var(--primary)" : "transparent",
    "&:hover": {
      borderColor: state.isFocused ? "var(--primary)" : "#b5b5b5",
    },
  }),
  valueContainer: (provided: object, state: any) => ({
    ...provided,
    borderWidth: "0 0 1px 0",
    minHeight: "40px",
    padding: "6px 0",
    borderRadius: "0",
    boxShadow: "none",
    borderColor: state.isFocused ? "var(--primary)" : "transparent",
    "&:hover": {
      borderColor: state.isFocused ? "var(--primary)" : "#b5b5b5",
    },
  }),
  indicatorsContainer: (provided: object, state: any) => ({
    ...provided,
    borderWidth: "0 0 1px 0",
    minHeight: "36px",
    borderRadius: "0",
    boxShadow: "none",
    borderColor: state.isFocused ? "var(--primary)" : "transparent",
    "&:hover": {
      borderColor: state.isFocused ? "var(--primary)" : "#b5b5b5",
    },
  }),
  menu: (provided: object, state: any) => ({
    ...provided,
    zIndex: 2,
    margin: 0,
    border: "none",
    borderRadius: "0 0 6px 6px",
    boxShadow: "0 0 30px 5px rgba(0, 0, 0, 0.1)",
  }),
  menuList: (provided: object, state: any) => ({
    ...provided,
  }),
  singleValue: (provided: object, state: any) => ({
    ...provided,
  }),
  multiValue: (provided: object, state: any) => ({
    ...provided,
    zIndex: 1,
    position: "relative",
    backgroundColor: `${state.data.included ? "#90EE90" : "transparent"}`,
    borderRadius: "20px",
    "&::after": {
      content: "''",
      zIndex: -1,
      opacity: 0.1,
      position: "absolute",
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      backgroundColor: "var(--primary)",
      borderRadius: "20px",
    },
  }),
};

const FormSelectSearchable = ({
  options,
  idField = "id",
  nameField = "name",
  isMulti = false,
  minChars = 0,
  name,
  value,
  label,
  placeholder,
  className,
  color,
  size = "is-normal",
  error,
  isLast = false,
  isClearable = true,
  onChange,
  iconLeft = null,
  iconRight = null,
  onSubmit,
  showSelectes,
  setIncluded,
  setExcluded,
  callBack,
  removedValue
}: {
  options: any[];
  idField?: string;
  nameField?: string;
  isMulti?: boolean;
  minChars?: number;
  name?: string;
  value?: any[];
  label?: string;
  placeholder?: string;
  className?: string;
  color?:
  | "is-primary"
  | "is-secondary"
  | "is-error"
  | "is-info"
  | "is-success"
  | "is-warning";
  size?: "is-small" | "is-normal" | "is-medium" | "is-large";
  error?: Error;
  isLast?: boolean;
  isClearable?: boolean;
  required?: boolean;
  onChange?: Function;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  showSelectes?: boolean;
  onSubmit?: Function;
  setIncluded?: any;
  setExcluded?: any;
  callBack?: Function;
  removedValue?: Function

}) => {
  const [textValue, setTextValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [lastKey, setLastKey] = useState<string>();

  useEffect(() => {
    setShowOptions(textValue.trim().length >= minChars);
  }, [value]);

  const handleInputChange = useCallback((newValue: string) => {
    setShowOptions(newValue.trim().length >= minChars);
    setTextValue(newValue);
  }, []);

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    setLastKey(e.key);
    if (lastKey === e.key && e.key === "Enter") {
      onSubmit && onSubmit();
    }
  };

  const cssClassNames = classNames(
    "is-react-select is-react-select-input",
    color,
    size,
    className,
    {
      "is-danger": error,
    }
  );

  const handleChange = (
    newValue?: MultiValue<string | number>,
    actionMeta?: ActionMeta<string | number>
  ) => { removedValue?.(actionMeta, newValue) };

  const Option = (props: any) => (
    <components.Option {...props}>
      <div className={classNames({ [formStyle["mainWrap"]]: true })}>
        <div style={{ maxWidth: "90%", minWidth: "90%" }}
          className={classNames("is-flex is-justify-content-space-between")}>
          <span onClick={() => { setIncluded({ data: props.data, options: value }, callBack) }} className={classNames({
            [formStyle["mainWrap"]]: false
          })}>{props.data.label}</span>

          <div className="is-flex is-justify-content-end">
            <span className={formStyle.iconColorWrap}
            >
              <span onClick={() => { setIncluded({ data: props.data, options: value }, callBack) }}
                className={`${formStyle.iconColorTick} ${props?.data?.included && props.isSelected ? "active" : ""
                  }`}
              >Include</span>

            </span>
            <span onClick={() => { setExcluded({ data: props.data, options: value }, callBack) }} className={`${formStyle.iconColorClose} ${props?.data?.excluded && props.isSelected ? "active" : ""
              }`} >&nbsp;Exclude</span>
          </div>
        </div>
      </div>
    </components.Option>
  );



  const optionStyles = (baseStyles: any, state: any) => ({
    ...baseStyles,
    backgroundColor: undefined,
    color: "#000",
    ".active": {
      color: "var(--primary)",
      fill: "var(--primary)",
    },

    ":active": {
      ...baseStyles[":active"],
      backgroundColor: undefined,
    },
  });

  const multiValueRemoveStyles = (baseStyles: any, state: any) => ({
    ...baseStyles,
    // display: "none",
    backgroundColor: `${state.data.included ? "#90EE90" : "transparent"}`,
    opacity: 0.5,
    borderRadius: "20px",
    color: "#000000",
    borderLeft: "1px solid #d8d8d8",
    zIndex: 1,

  });

  return (
    <FormField isLast={isLast}>
      <FormLabel label={label} error={error} />
      <FormField>
        {iconLeft}

        <ReactSelect
          name={name}
          placeholder={placeholder}
          className={cssClassNames}
          isMulti={isMulti}
          onChange={handleChange}
          onInputChange={handleInputChange}
          options={showOptions ? options : []}
          noOptionsMessage={({ inputValue }) =>
            showOptions
              ? "No results found"
              : `Type at least ${minChars} characters`
          }
          value={value}
          styles={{
            ...(styles as any),
            option: optionStyles,
            multiValueRemove: multiValueRemoveStyles
          }}
          isClearable={isClearable}
          onKeyDown={onKeyDown}
          components={{ Option }}
          hideSelectedOptions={false}

        />
        {iconRight}
      </FormField>
      <CardAnimatePresence isActive={error !== undefined}>
        <p className="help is-danger m-0 pt-3">{error?.message}</p>
      </CardAnimatePresence>
    </FormField>
  );
};

export default FormSelectSearchable;



