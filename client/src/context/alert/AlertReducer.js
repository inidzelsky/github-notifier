export default (state, action) => {
  const { type, payload } = action;

  const actions = {
    SET_ALERT: [...state, payload],
    REMOVE_ALERT: state.filter(alert => alert.id !== action.payload)
  };

  const actionType = actions[type];
  return actionType ? actionType : state;
};