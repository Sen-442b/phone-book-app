import "./App.css";
import { AddContactModal } from "./components/AddContactModal/AddContactModal";
import { ContactList } from "./screens/ContactList/ContactList";

function App() {
  return (
    <div className="App">
      <AddContactModal />
      <ContactList />
    </div>
  );
}

export default App;

// figure out cors for post request
