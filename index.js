const ADD = 'ADD';
const SUBTRACT = 'SUBTRACT';
const RESET = 'RESET';

function tallyReducer(state = { count : 0 }, action) {
    switch (action.type) {
        case ADD:
            return { count: state.count + 1 };
            case SUBTRACT:
                return { count: state.count -1 };
                case RESET:
                    return {count: 0 };
                default:
                    return state;
    }
}

// Store creator
function createStore(reducer) {
   let state;
   let listeners = [];     //Array of subscriber function

    // Returns the current state
   const getState = () => state

   const dispatch = (action) => {
    state = reducer(state, action);      //compute next state
    listeners.forEach((listener) => listener());    //Notify subscribers
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  // Initialize with default state
  dispatch({ type: '@@INIT' });

  return {
    getState,
    dispatch,
    subscribe,
  };
}

// Usage
const store = createStore(tallyReducer);

// Log state on every update
store.subscribe(() => {
  console.log('Updated state:', store.getState());
});

// --- Simulating Scenarios from User Stories ---

// SCENARIO 1: Initial State
console.log('Initial state:', store.getState()); // Should log: { count: 0 }

// SCENARIO 2: Incrementing the Counter
store.dispatch({ type: ADD });
store.dispatch({ type: ADD }); // Should log: { count: 2 }

// SCENARIO 3: Decrementing the Counter
store.dispatch({ type: SUBTRACT }); // Should log: { count: 1 }

// SCENARIO 4: Resetting the Counter
store.dispatch({ type: RESET }); 