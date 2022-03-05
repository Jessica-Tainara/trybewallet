// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SEND_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
      total: action.total,
    };
  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter((ex) => ex !== action.expense),
      total: action.total,
    };
  default:
    return state;
  }
}

export default walletReducer;
