// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case '_USER_DATA':
    return {
      ...state };
  default:
    return state;
  }
}

export default walletReducer;
