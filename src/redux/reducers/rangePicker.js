const defState = {
  minValue: 0,
  maxValue: 10,
};

const rangePickerReducer = (state = [defState], action) => {
  switch (action.type) {
    case "INCREMENT_MIN":
      return { ...state, minValue: state.minValue + 1 };
    case "INCREMENT_MAX":
      return { ...state, maxValue: state.maxValue + 1 };
    case "DECREMENT_MIN":
      return { ...state, minValue: state.minValue - 1 };
    case "DECREMENT_MAX":
      return { ...state, maxValue: state.maxValue - 1 };
    case "SET_VALUE_MIN":
      return { ...state, minValue: action.value };
    case "SET_VALUE_MAX":
      return { ...state, maxValue: action.value };
    default:
      return state;
  }
};

export default rangePickerReducer;
