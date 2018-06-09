import React from 'react';
import { connect } from 'react-redux';
import { AddEdgeAction } from '../actions/EdgeAction';
import css from '../../css/styles.css';

@connect((store) => {
  return {
    edges: store.edges.edges,
  };
})

class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      error: "",
    }
  }

  newEdge(e) {
    if(e.which === 13) {
      let edgeVals = e.target.value;
      //console.log(edgeVals.length);

      if(edgeVals.length == 3) {
        let u = edgeVals.split(" ")[0];
        let v = edgeVals.split(" ")[1];
        this.props.dispatch(AddEdgeAction(u, v));
        e.target.value = "";

        console.log(u);
        console.log(v);
        this.setState({ error: "" });
      }
      else {
        this.setState({ error: "Not a valid edge, please check !" });
      }
    }
  }



  dfs(v, visited, adjList) {
    console.log(v);
    visited[v] = true;

    var get_neighbours = adjList.get(v);

    console.log(get_neighbours);

    for (var i in get_neighbours) {
        var get_elem = get_neighbours[i];
        //console.log(get_elem);
        if (!visited[get_elem]) {
            this.dfs(get_elem, visited, adjList);
        }
    }
  }

  dfsStart(e) {
    var n = 0;
    var adjList = new Map();
    for(var i=0;i<this.props.edges.length;i++) {
      n = Math.max(n, Math.max(this.props.edges[i].u, this.props.edges[i].v));
      adjList.set(this.props.edges[i].u, []);
    }
    for(var i=0;i<this.props.edges.length;i++) {
      adjList.get(this.props.edges[i].u).push(this.props.edges[i].v);
    }
    var visited = [];
    for(i=1;i<=n;i++) {
      visited[i] = false;
    }
    this.dfs(1, visited, adjList);
  }

  render() {
    const { edges } = this.props;
    const edgesMapped = edges.map(edge => <li key={edge.edge_id}>{edge.u} and {edge.v}</li>);
    return (
      <div className="mainDiv">
        <table>
          <tbody>
            <tr>
              <td><input className="edge" onKeyPress={this.newEdge.bind(this)} /></td>
              <td>{this.state.error}</td>
            </tr>
          </tbody>
        </table>
        <ul className="list">{edgesMapped}</ul>
        <br />
        <button className="dfs" onClick={this.dfsStart.bind(this)}>DFS</button>
      </div>
    );
  }
}

module.exports = Layout;
