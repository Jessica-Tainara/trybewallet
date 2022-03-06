// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SEND_EXPENSE':
    if (state.expense !== undefined) {
      delete state.expense;
      return {
        ...state,
        expenses: state.expenses.map((ex) => {
          if (ex.id === action.expense.id) {
            return action.expense;
          }
          return ex;
        }),
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
  default:
    return state;
  }
}

export default walletReducer;
