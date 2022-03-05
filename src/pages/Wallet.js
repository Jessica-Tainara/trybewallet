import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
      id: 0,
      total: 0.00,
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
    const { value,
      description,
      currency,
      method,
      tag,
      id,
      total } = this.state;
    const { dispatch } = this.props;
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          id: id + 1,
          total: parseFloat(total) + parseFloat(value * data[currency].ask),
          value: 0,
        });
        dispatch(addExpense({
          id,
          value,
          description,
          currency,
          method,
          tag,
          exchangeRates: data,
        }));
      });
  }

  render() {
    const { email } = this.props;
    const { total, currencies, value, method } = this.state;
    return (
      <div>
        <header>
          <span data-testid="email-field">{`Email: ${email}`}</span>
          <span data-testid="total-field">{`Despesa Total: R$ ${total}`}</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
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
            >
              {currencies.map((currency) => currency !== 'USDT' && (
                <option key={ currency } value={ currency }>{ currency }</option>
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
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria
            <select
              data-testid="tag-input"
              id="tag"
              name="tag"
              onChange={ this.handleInputChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.handleClickSubmit }
          >
            Adicionar despesa
          </button>
        </form>
        <table border="1">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
        </table>
      </div>);
  }
}
Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  email: state.user.email });

export default connect(mapStateToProps)(Wallet);
