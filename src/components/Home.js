import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
        <div>
          <img src="https://i.pinimg.com/originals/39/f2/c1/39f2c11bdf52fb989ec2e70f03919a7b.jpg" alt="bank"/>
          <h1>Bank of React</h1>
          <Link to="/Login">Login </Link>
          <br></br>
          <Link to="/userProfile">User Profile </Link>
          <br></br>
          <Link to="/credits">Credits </Link>
          <br></br>
          <Link to="/debits">Debits</Link>
          <AccountBalance accountBalance={this.props.accountBalance}/>
        </div>
    );
  }
}

export default Home;