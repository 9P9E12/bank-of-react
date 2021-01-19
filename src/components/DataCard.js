import React from 'react';

export default function DataCard(props){
  return (
      <div>
        <p>
        Desc= <i>{props.description}</i><br></br>
        Amount= <b><u>${props.amount}</u></b><br></br>
        Date= <i>{props.date}</i><br></br>
        </p>
      </div>
  );
}