import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense } from '../actions';

class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: 'CAD',
      method: 'Cartão de crédito',
      tag: 'Alimentação',
      currencies: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
  }

  componentDidMount() {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          currencies: Object.keys(data),
        });
      });
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClickSubmit() {
    const { dispatch, expense, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    if (expense) {
      dispatch(addExpense({
        id: expense.id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates: expense.exchangeRates,
      }));
    } else {
      fetch('https://economia.awesomeapi.com.br/json/all')
        .then((response) => response.json())
        .then((data) => {
          dispatch(addExpense({
            id: expenses.length,
            value,
            description,
            currency,
            method,
            tag,
            exchangeRates: data,
          }));
          this.setState({
            value: 0,
          });
        });
    }
  }

  render() {
    const { expense } = this.props;
    const { currencies, value, method, tag, description, currency } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor
            <input
              type="number"
              data-testid="value-input"
              value={ value }
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
              value={ description }
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
              value={ currency }
            >
              {currencies.map((curr) => curr !== 'USDT' && (
                <option key={ curr } value={ curr }>{ curr }</option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select
              data-testid="method-input"
              id="method"
              name="method"
              value={ method }
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
              value={ tag }
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
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  expense: state.wallet.expense,
});
export default connect(mapStateToProps)(Form);
