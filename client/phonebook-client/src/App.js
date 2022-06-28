import "./App.css";

import { ContactList } from "./screens/ContactList/ContactList";

function App() {
  return (
    <div className="app flex-column flex-center">
      <ContactList />
    </div>
  );
}

export default App;

// figure out cors for post request
