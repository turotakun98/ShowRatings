export const setMinValue = (newValue) => {
  return {
    type: "SET_VALUE_MIN",
    value: newValue,
  };
};

export const setMaxValue = (newValue) => {
  return {
    type: "SET_VALUE_MAX",
    value: newValue,
  };
};
