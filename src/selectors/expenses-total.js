export default (expenses) => {
    return expenses
        .map((expense) => expense.amount)
        .reduce((totalAmount, amount) => totalAmount + amount, 0);
};