import React from 'react';
import { withAuthenticator } from 'aws-amplify-react'

function App() {
  return (
    <div className="App">
      App
    </div>
  );
}

export default withAuthenticator(App, {
   includeGreetings: true });
