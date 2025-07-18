import logo from "./logo.svg";
import "./App.css";
import "./styles.css";
import { useReducer } from "react";
import TicketForm from "./components/TicketForm";
import ticketReducer from "./reducers/ticketReducer";
import TicketItem from "./components/TicketItem";
import TicketList from "./components/TicketList";
import { sortTickets } from "./utilities/sortingUtilities";

function App() {
  const initialState = {
    tickets: [],
    editingTicket: null,
    sortPreference: "High to low",
  };

  const [state, dispatch] = useReducer(ticketReducer, initialState);
  const sortedTickets = sortTickets(state.tickets, state.sortPreference);

  return (
    <div className="App">
      <div className="container">
        <h1> Todos List</h1>
        <TicketForm dispatch={dispatch} editingTicket={state.editingTicket} />

        {state.tickets.length > 0 && (
          <div className="results">
            <h2>All Tickets</h2>

            <select
            value={state.sortPreference}
              onChange={(e) =>
                dispatch({ type: "SET_SORTING", payload: e.target.value })
              }
            >
              <option value={"High to low"}>High to low</option>
              <option value={"Low to high"}>Low to high</option>
            </select>

            <TicketList
              tickets={sortedTickets}
              dispatch={dispatch}
            ></TicketList>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
