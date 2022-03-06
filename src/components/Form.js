import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense, getCurrencies, editExpense } from '../actions';

const initialState = {
  value: 0,
  description: '',
  currency: 'CAD',
  method: 'Cartão de crédito',
  tag: 'Alimentação',
};

class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      ...initialState,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        dispatch(getCurrencies(Object.keys(data)));
      });
  }

  handleInputChange({ target }) {
    const { expense, edit, dispatch } = this.props;
    const { name, value } = target;
    if (edit) {
      const { value: val, description, currency, method, tag } = expense;
      this.setState({ value: val, description, currency, method, tag });
      dispatch(editExpense(expense, false));
    }
    this.setState({
      [name]: value,
    });
  }

  handleClickSubmit() {
    const { dispatch, expense, expenses } = this.props;
    if (expense) {
      dispatch(addExpense({
        id: expense.id,
        ...this.state,
        exchangeRates: expense.exchangeRates,
      }));
      this.setState({
        ...initialState,
      });
    } else {
      fetch('https://economia.awesomeapi.com.br/json/all')
        .then((response) => response.json())
        .then((data) => {
          dispatch(addExpense({
            id: expenses.length,
            ...this.state,
            exchangeRates: data,
          }));
          this.setState({
            ...initialState,
          });
        });
    }
  }

  render() {
    const { expense, currencies, edit } = this.props;
    const { value, method, tag, description, currency } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor
            <input
              type="number"
              data-testid="value-input"
              value={ edit ? expense.value : value }
              id="value"
              name="value"
              onChange={ this.handleInputChange }
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              type="text"
              data-testid="description-input"
              id="description"
              name="description"
              value={ edit ? expense.description : description }
              onChange={ this.handleInputChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <select
              data-testid="currency-input"
              id="currency"
              name="currency"
              onChange={ this.handleInputChange }
              value={ edit ? expense.currency : currency }
            >
              {currencies.map((curr) => curr !== 'USDT' && (
                <option key={ curr } data-testid={ curr } value={ curr }>{ curr }</option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select
              data-testid="method-input"
              id="method"
              name="method"
              value={ edit ? expense.method : method }
              onChange={ this.handleInputChange }
            >
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
              <option value="Dinheiro">Dinheiro</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria
            <select
              data-testid="tag-input"
              id="tag"
              name="tag"
              onChange={ this.handleInputChange }
              value={ expense ? expense.tag : tag }
            >
              {['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde']
                .map((category) => (
                  <option key={ category } value={ category }>{ category }</option>
                ))}
            </select>
          </label>
          <button
            type="button"
            onClick={ this.handleClickSubmit }
          >
            {expense ? 'Editar despesa' : 'Adicionar despesa'}
          </button>
        </form>
      </div>);
  }
}

Form.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expense: PropTypes.string.isRequired,
  expenses: PropTypes.string.isRequired,
  currencies: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  expense: state.wallet.expense,
  currencies: state.wallet.currencies,
  edit: state.wallet.edit,
});
export default connect(mapStateToProps)(Form);
