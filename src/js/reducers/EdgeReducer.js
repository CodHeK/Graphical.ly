export default function reducer(state={
  edges: [],
  dfs: [],
}, action) {
  switch(action.type) {
    case "ADD_NEW_EDGE": {
      state = {...state, edges: [...state.edges, action.payload]};
      break;
    }
    case "NEW_VERTEX_TO_DFS_OUTPUT": {
      state = {...state, dfs: [...state.dfs, action.payload]};
      break;
    }
  }
  return state;
}
