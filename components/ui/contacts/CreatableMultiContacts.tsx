import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { ActionMeta, OnChangeValue } from "react-select";
import { hexToRgb } from "../../../utils/helper-utils";

export interface MultiSelectOption {
  label: string;
  value?: string;
}

export const createOption = ({ label, value }: MultiSelectOption) => ({
  label: label,
  value: value || label.toLowerCase().replace(/\W/g, ""),
});

const CreatableMultiContacts = ({
  options = [],
  selected = [],
  // isLoading = false,
  onCreateNew = (listName: string) => {},
  onSelect = () => {},
  error = "",
}: {
  options: MultiSelectOption[];
  selected: MultiSelectOption[];
  // isLoading?: boolean;
  onCreateNew?: Function;
  onSelect?: Function;
  error?: string;
}) => {
  const [state, setState] = useState(() => ({
    isLoading: false,
    updatedOptions: options,
    values: selected,
    error: "",
  }));

  useEffect(() => {
    if (error !== "") {
      updateState({ error });
    } else {
      updateState({ error: "" });
    }
  }, [error]);

  const selectedOptionsLength = selected.length;

  useEffect(() => {
    updateState({ values: selected });
  }, [selectedOptionsLength]);

  const updateState = (newState = {}) =>
    setState((prev) => ({
      ...prev,
      ...newState,
    }));

  const handleChange = (
    newValue: OnChangeValue<MultiSelectOption, false>[],
    actionMeta: ActionMeta<MultiSelectOption>
  ) => {
    updateState({ values: newValue });
    onSelect(newValue);
  };

  const handleCreate = async (inputValue: string) => {
    updateState({ isLoading: true, error: "" });
    try {
      const dataId = await onCreateNew(inputValue);
      // const { options } = state;
      const newOption = createOption({ label: inputValue, value: dataId });
      updateState({
        isLoading: false,
        updatedOptions: [...state.updatedOptions, newOption],
        values: [...state.values, newOption],
      });
    } catch (error) {
      console.log(error, "Error while creating new list!");
      updateState({
        isLoading: false,
        error: "Error while creating new list!",
      });
    }
  };

  const styles = {
    option: (provided: any, state: any) => {
      const style = getComputedStyle(document.body);
      const primaryColor = style.getPropertyValue("--primary");
      const rgbaColorObject = hexToRgb(primaryColor);

      return {
        ...provided,
        backgroundColor: "none",
        color: state.isSelected ? "var(--primary) !important" : "",
        "&:hover": {
          backgroundColor: `rgba(${rgbaColorObject?.r}, ${rgbaColorObject?.g}, ${rgbaColorObject?.b}, 0.2)`,
          color: "var(--primary) !important",
        },
      };
    },
    control: (base: any, inputState: any) => {
      let border = inputState.isFocused
        ? "1px solid var(--primary)"
        : "1px solid #eae7e7";
      if (state.error) {
        border = "1px solid var(--toastify-color-error)";
      }
      return {
        ...base,
        border,
        boxShadow: "none",
        "&:hover": {
          border: "1px solid var(--primary)",
        },
      };
    },
  };

  return (
    <>
      <CreatableSelect
        placeholder="Enter name for your list..."
        styles={styles}
        isClearable
        isMulti
        isDisabled={state.isLoading}
        isLoading={state.isLoading}
        onChange={handleChange}
        onCreateOption={handleCreate}
        options={state.updatedOptions}
        value={state.values}
      />
      {state.error && <p className="help is-danger m-0 pt-3">{state.error}</p>}
    </>
  );
};

export default CreatableMultiContacts;

// action: 'select-option';
// action: 'deselect-option';
// action: 'remove-value';
// action: 'pop-value';
// action: 'clear';
// action: 'create-option';
