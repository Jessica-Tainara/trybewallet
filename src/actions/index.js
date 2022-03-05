// Coloque aqui suas actions
export const addUserEmail = (email) => ({
  type: 'SEND_USER_EMAIL',
  email,
});

export const addExpense = (expense) => ({
  type: 'SEND_EXPENSE',
  expense,
});
