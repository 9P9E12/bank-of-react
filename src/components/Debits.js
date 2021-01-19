import React from 'react';
import {Link} from 'react-router-dom';
import DataCard from './DataCard';

export default function Debits(props){
  return (
        <div>
          <h1>Debits</h1>
          <h2>Account Balance: {props.balance}</h2>
          <div className="Debits">
          {props.debits.map(debit => {
              return (
                <DataCard key={debit.id} description={debit.description} amount={debit.amount} date={debit.date}/>
              )
            })
          }
          </div>
          <div className="AddDebit">
            <h2>Add a Debit</h2>
            <form onSubmit={props.addDebit} id="debitForm">
              <label htmlFor="debitDesc">Debit Description:</label>
              <input type="text" id="debitText" name="debitText" required/>
              <br></br>
              <label htmlFor="debitAmt">Debit Amount:</label>
              <input type="number" id="debitAmt" name="debitAmt" required/>
              <br></br>
              <input type="submit" value="Submit"/>
            </form>
          </div>
          <div className="BackHome">
          <Link to="/">Back to Home</Link>
          </div>
        </div>
  );
}