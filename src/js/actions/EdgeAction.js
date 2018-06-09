let edge_id = 0;

export function AddEdgeAction(u, v) {
  edge_id++;
  return {
    type: "ADD_NEW_EDGE",
    payload: { id: edge_id, u: u, v: v},
  }
}
