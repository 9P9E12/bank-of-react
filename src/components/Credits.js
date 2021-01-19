import React from 'react';
import {Link} from 'react-router-dom';
import DataCard from './DataCard';

export default function Credits(props){
  return (
        <div>
          <h1>Credits</h1>
          <h2>Account Balance: {props.balance}</h2>
          <div className="Credits">
          {props.credits.map(credit => {
              return (
                <DataCard key={credit.id} description={credit.description} amount={credit.amount} date={credit.date}/>
              )
            })
          }
          </div>
          <div className="AddCredit">
            <h2>Add a Credit</h2>
            <form onSubmit={props.addCredit} id="creditForm">
              <label htmlFor="creditDesc">Credit Description:</label>
              <input type="text" id="creditText" name="creditText" required/>
              <br></br>
              <label htmlFor="creditAmt">Credit Amount:</label>
              <input type="number" id="creditAmt" name="creditAmt" required/>
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