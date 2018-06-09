export default function reducer(state={
  edges: [],
}, action) {
  switch(action.type) {
    case "ADD_NEW_EDGE": {
      state = {...state, edges: [...state.edges, action.payload]};
      break;
    }
  }
  return state;
}
