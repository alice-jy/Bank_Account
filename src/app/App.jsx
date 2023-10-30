import TransactionHistory from "../features/transactions/TransactionHistory";
import Transactions from "../features/transactions/Transactions";
import React, { useState } from 'react';
import { deposit, withdrawal, transfer } from './redux/accountSlice';
import { useDispatch, useSelector } from 'react-redux';
import "./app.css";

// TODO: Import the Redux store and provide it to this component using <Provider>.
const App = () => {
  const [depositTotal, setDepositTotal] = useState(0);
  const [withdrawalTotal, setWithdrawalTotal] = useState(0);
  const [transferAccount, setTransferAccount] = useState("");
  const [transferTotal, setTransferTotal] = useState(0); 

  const accBalance = useSelector(state => state.account.balance); //useSelector hook "called with entire Redux store state as its only argument" 
  const dispatchBalance = useDispatch(); //hook will compare the previous selector result value to the current 

  const handleDeposit = () => {
    dispatchBalance(deposit{amount: Number(depositTotal)});
    setDepositTotal(0); //reset after withdrawn
  }

  const handleWithdrawal = () => {
    dispatchBalance(withdrawal{amount: Number(withdrawalTotal)});
    setWithdrawalTotal(0); //reset after withdrawn
  }

  const handleTransfer = () => {
    dispatchBalance(transfer({ name: transferAccount, amount: Number(transferTotal)}));
    setTransferAccount('');//reset value
    setTransferTotal=(0);//reset value
  }

  //return code taken from solution
  return (
    <div className="app-container">
    <h1>Bank Account</h1>
    <div className="balance-container">
      <h2>Current Balance: {balance}</h2>
      <div className="transaction-container">
        <h3>Deposit</h3>
        <input
          type="number"
          value={depositTotal}
          onChange={e => setDepositTotal(e.target.value)}
        />
        <button onClick={handleDeposit}>Deposit</button>
      </div>
      <div className="transaction-container">
        <h3>Withdrawal</h3>
        <input
          type="number"
          value={withdrawalTotal}
          onChange={e => setWithdrawalTotal(e.target.value)}
        />
        <button onClick={handleWithdrawal}>Withdraw</button>
      </div>
      <div className="transaction-container">
        <h3>Transfer</h3>
        <input
          type="text"
          placeholder="Recipient Name"
          value={transferAccount}
          onChange={e => setTransferAccount(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={transferTotal}
          onChange={e => setTransferTotal(e.target.value)}
        />
        <button onClick={handleTransfer}>Transfer</button>
      </div>
    </div>
    <TransactionHistory />
  </div>
  );
};

export default App;
