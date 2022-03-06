// Coloque aqui suas actions
export const getCurrencies = (list) => ({
  type: 'GET_CURRENCIES',
  list,
});

export const addUserEmail = (email) => ({
  type: 'SEND_USER_EMAIL',
  email,
});

export const addExpense = (expense) => ({
  type: 'SEND_EXPENSE',
  expense,
});

export const deleteExpense = (expense) => ({
  type: 'DELETE_EXPENSE',
  expense,
});
export const editExpense = (expense) => ({
  type: 'EDIT_EXPENSE',
  expense,
});
