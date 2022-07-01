import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpense } from '../actions';
import excluir from '../excluir.png';
import editar from '../editar.png';
import Alimentação from '../suprimentos.png';
import Trabalho from '../pasta.png';
import Saúde from '../saude.png';
import Lazer from '../guarda-sol.png';
import Transporte from '../carro.png';

const icons = { Alimentação, Trabalho, Saúde, Lazer, Transporte };

class Table extends React.Component {
  render() {
    const { expenses, dispatch } = this.props;

    return (
      <div>
        <table className="table" border="1">
          <thead>
            <tr className="cabeçalho">
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
          <tbody className="body">
            {expenses
              .map((item) => {
                const {
                  id, description, tag, method, value,
                  exchangeRates, currency } = item;
                return (
                  <tr className="line" key={ id }>
                    <td className="first" role="cell">{description}</td>
                    <td role="cell">
                      <abbr title={ tag }>
                        <img
                          alt={ tag }
                          src={ icons[tag] }
                          style={ { width: '40px', margin: '0', padding: '0' } }
                        />
                      </abbr>
                    </td>
                    <td role="cell">{method}</td>
                    <td
                      role="cell"
                      name="valor"
                    >
                      {parseFloat(value) % 1 === 0 ? `${value}.00` : value}
                    </td>
                    <td
                      role="cell"
                      name="moeda"
                    >
                      {exchangeRates[currency].name.split('/')[0]}
                    </td>
                    <td
                      role="cell"
                      name="cambio"
                    >
                      {parseFloat(exchangeRates[currency].ask).toFixed(2)}
                    </td>
                    <td
                      role="cell"
                      name="valor-convertido"
                    >
                      {(exchangeRates[currency].ask * value).toFixed(2)}
                    </td>
                    <td role="cell">Real</td>
                    <td className="last" role="cell">
                      <button
                        type="button"
                        data-testid="edit-btn"
                        className="favorite-button"
                        onClick={ () => {
                          dispatch(editExpense(item, true));
                          const form = document.getElementsByClassName('form');
                          form[0].classList.toggle('visible');
                        } }
                      >
                        <input
                          type="image"
                          alt="button-favorite"
                          src={ editar }
                          style={ { width: '20px', margin: '0', padding: '0' } }
                        />
                      </button>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        className="favorite-button"
                        onClick={ () => {
                          dispatch(deleteExpense(item));
                        } }
                      >
                        <input
                          type="image"
                          alt="button-favorite"
                          src={ excluir }
                          style={ { width: '20px', margin: '0', padding: '0' } }
                        />
                      </button>
                    </td>
                  </tr>
                );
              }) }

          </tbody>
        </table>
      </div>);
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});
export default connect(mapStateToProps)(Table);
