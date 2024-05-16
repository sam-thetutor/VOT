import { useState } from 'react';
import { backend } from 'declarations/backend';

function App() {
  const [greeting, setGreeting] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  return (
   <h2>Elekshuniz VOT</h2>
  );
}

export default App;
