import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';


//App is the brains of the entire application. All other components are purely visual
class App extends Component {

  constructor() {
    super();
    //Update the state upon changes to these values. The account balance, the number
    //of credits or debits, or the userName/memberSince values
    this.state = {
      accountBalance: 0,
      debits: [],
      credits: [],
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
      }
    }
  }
  //Given code
  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }
  //Pull the .json from the given website and return it
  getDebits = async () =>{
    let debitsURL = "https://moj-api.herokuapp.com/debits";
    try{
      let debitResponse = await fetch(debitsURL);
      if(!debitResponse.ok){
        throw new Error("Did not receive ok response from fetching of Debits");
      }
      let debitData = await debitResponse.json();
      return debitData;
    } catch(error){
      console.log("Error occurred: " + error);
    }
  }
  //Same as above but for credits
  getCredits = async () =>{
    let creditsURL = "https://moj-api.herokuapp.com/credits";
    try{
      let creditResponse = await fetch(creditsURL);
      if(!creditResponse.ok){
        throw new Error("Did not receive ok response from fetching of Debits");
      }
      let creditData = await creditResponse.json();
      return creditData;
    } catch(error){
      console.log("Error occurred: " + error);
    }
  }
  //update is a small misnomer, as it's only called once at the start of the application.
  //Pull the data for debits and credits from the given websites, store them,
  //then update the account balance to reflect any necessary changes
  updateAccount = async()=>{
    //Pull data from website for credits & debits and store
    this.setState({debits:  await this.getDebits()});
    if(!this.state.debits){
      alert("Didnt get any debit data!");
    }
    this.setState({credits:  await this.getCredits()});
    if(!this.state.credits){
      alert("Didnt get any credit data!");
    }
    //Update account balance
    let debitAmt = 0;
    this.state.debits.forEach(debit => {
      debitAmt -= debit.amount;
    });

    let creditAmt = 0;
    this.state.credits.forEach(credit => {
      creditAmt += credit.amount;
    });

    this.setState({accountBalance: creditAmt+debitAmt});
  }

  componentDidMount(){
    this.updateAccount();
  }
  //By default a form on submit refreshes the page, which causes componentDidMount to
  //be called again. This had to be altered to ensure the data added is kept.
  addDebit = (event) =>{
    event.preventDefault();
    //Store the name and value received
    const name = event.target[0].value;
    const value = event.target[1].value;
    //Construct the date in the required format
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = String(date.getHours()).padStart(2,"0");
    const minute = String(date.getMinutes()).padStart(2,"0");
    const second = String(date.getSeconds()).padStart(2,"0");
    const millisecond = String(date.getMilliseconds()).padStart(3,"0");
    const today = year.toString()+"-"+month.toString()+"-"+day.toString()+"T"+hour+":"+minute+":"+second+"."+millisecond+"Z";
    //Construct the new object
    const newDebit = {
      id: this.state.debits.length,
      description: name,
      amount: value,
      date: today
    };
    //Add the new object to the array of debits
    const debArr = this.state.debits;
    debArr.push(newDebit); 
    //Alter the state
    this.setState({debits: debArr});
    //Alter the account balance
    const newBalance = this.state.accountBalance - value;
    this.setState({accountBalance: newBalance});
    //Reset the form
    var debitForm = document.getElementById("debitForm");
    debitForm.reset();
  }
  //Follows the exact same logic as above
  addCredit = (event) =>{
    const name = event.target[0].value;
    const value = event.target[1].value;

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2,"0");
    const day = String(date.getDate()).padStart(2,"0");
    const hour = String(date.getHours()).padStart(2,"0");
    const minute = String(date.getMinutes()).padStart(2,"0");
    const second = String(date.getSeconds()).padStart(2,"0");
    const millisecond = String(date.getMilliseconds()).padStart(3,"0");
    const today = year.toString()+"-"+month.toString()+"-"+day.toString()+"T"+hour+":"+minute+":"+second+"."+millisecond+"Z";


    const newCredit = {
      id: this.state.credits.length,
      description: name,
      amount: value,
      date: today
    };
    this.setState(prevState=>({credits: [...prevState.credits,newCredit]}));
    const newBalance = this.state.accountBalance + value;
    this.setState({accountBalance: newBalance});

    var creditForm = document.getElementById("creditForm");
    creditForm.reset();
  }

  render() {

    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );

    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props}/>)

    const CreditComponent = () =>(<Credits credits={this.state.credits} balance={this.state.accountBalance} addCredit={this.addCredit}/>);
    const DebitComponent = () =>(<Debits debits={this.state.debits} balance={this.state.accountBalance} addDebit={this.addDebit}/>);

    return (
        <Router>
          <div>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
            <Route exact path="/credits" render={CreditComponent}/>
            <Route exact path="/debits" render={DebitComponent}/>
          </div>
        </Router>
    );
  }

}

export default App;