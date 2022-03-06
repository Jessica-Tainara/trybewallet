// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SEND_EXPENSE':
    if (state.expense) {
      delete state.expense;
      return {
        ...state,
        expenses: state.expenses
          .map((ex) => (ex.id === action.expense.id ? action.expense : ex)),
      };
    }
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter((ex) => ex !== action.expense),

    };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      expense: action.expense,
    };
  case 'GET_CURRENCIES':
    return {
      ...state,
      currencies: action.list,
    };
  default:
    return state;
  }
}

export default walletReducer;
