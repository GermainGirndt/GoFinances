import React, { useState, useEffect } from 'react';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import formatDate from '../../utils/formatDate';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface APIData {
  transactions: Array<Transaction>;
  balance: Balance;
}

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  console.log('Transactions: ');
  console.log(transactions);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get<APIData>('/transactions');
      console.log(response.data);
      const receivedTransactions = await response.data.transactions;
      console.log(receivedTransactions);
      setTransactions([...transactions, ...receivedTransactions]);

      const receivedBalance = await response.data.balance;
      setBalance({ ...receivedBalance });
      console.log(receivedBalance);
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">
              {formatValue(Number(balance.income))}
            </h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">
              {formatValue(Number(balance.outcome))}
            </h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">
              {formatValue(Number(balance.total))}
            </h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>
            {transactions.map(transaction => (
              <tbody key={transaction.id}>
                <tr>
                  <td className="title">{transaction.title}</td>
                  <td className={transaction.type}>
                    {transaction.type === 'income'
                      ? formatValue(transaction.value)
                      : `- ${formatValue(transaction.value)}`}
                  </td>
                  <td>{transaction.category.title}</td>
                  <td>{formatDate(transaction.created_at)}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
