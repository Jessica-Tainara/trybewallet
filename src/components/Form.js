import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense, getCurrencies, editExpense } from '../actions';

const initialState = {
  value: 0,
  description: '',
  currency: 'EUR',
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

  componentDidMount = () => {
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
    const { dispatch, expense, expenses, edit } = this.props;
    const form = document.getElementsByClassName('form');
    form[0].classList.toggle('visible');

    if (expense && !edit) {
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
            id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 0,
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
      <div className="form">
        <form>
          <label htmlFor="value">
            Valor
            <input
              type="number"
              data-testid="value-input"
              value={ edit && expense ? expense.value : value }
              id="value"
              name="value"
              onChange={ this.handleInputChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <div className="custom-select" style={ { width: '200px' } }>
              <select
                id="currency"
                name="currency"
                onChange={ this.handleInputChange }
                value={ edit && expense ? expense.currency : currency }
              >
                {currencies.map((curr) => curr !== 'USDT' && (
                  <option key={ curr } value={ curr }>{ curr }</option>
                ))}
              </select>
            </div>
          </label>
          <label htmlFor="description">
            Descrição
            <input
              type="text"
              id="description"
              name="description"
              value={ edit && expense ? expense.description : description }
              onChange={ this.handleInputChange }
            />
          </label>
          <label htmlFor="tag">
            Categoria
            <div className="custom-select" style={ { width: '200px' } }>
              <select
                data-testid="tag-input"
                id="tag"
                name="tag"
                onChange={ this.handleInputChange }
                value={ edit && expense ? expense.tag : tag }
              >
                {['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde']
                  .map((category) => (
                    <option key={ category } value={ category }>{ category }</option>
                  ))}
              </select>
            </div>
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select
              data-testid="method-input"
              id="method"
              name="method"
              value={ edit && expense ? expense.method : method }
              onChange={ this.handleInputChange }
            >
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
              <option value="Dinheiro">Dinheiro</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.handleClickSubmit }
            className="new"
          >
            {expense ? 'Editar despesa' : 'Adicionar despesa'}
          </button>
          <button
            type="button"
            className="new cancel"
            onClick={ () => {
              const form = document.getElementsByClassName('form');
              form[0].classList.toggle('visible');
              if (expense) {
                this.setState({
                  ...initialState,
                });
              }
            } }
          >
            Cancelar
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
