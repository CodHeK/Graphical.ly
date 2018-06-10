import React from 'react';
import { connect } from 'react-redux';
import { AddEdgeAction, DFSOutput, Refresh } from '../actions/EdgeAction';
import css from '../../css/styles.css';
import $ from 'jquery';

@connect((store) => {
  return {
    edges: store.edges.edges,
    dfs: store.dfs.dfs,
  };
})

class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      error: "",
      start: 1,
    }
  }

  newEdge(e) {
    if(e.which === 13) {
      let edgeVals = e.target.value;

      if(edgeVals.length >= 3) {
        let u = edgeVals.split(" ")[0];
        let v = edgeVals.split(" ")[1];
        this.props.dispatch(AddEdgeAction(u, v));
        e.target.value = "";

        this.setState({ error: "" });
      }
      else {
        this.setState({ error: "Not a valid edge, please check !" });
      }
    }
  }



  dfs(v, visited, adjList) {
    console.log(v);
    this.props.dispatch(DFSOutput(v));
    visited[v] = true;

    var get_neighbours
    for(var key of adjList.keys()) {
      if(key == v) {
        get_neighbours = adjList.get(key);
      }
    }

    for (var i in get_neighbours) {
        var get_elem = get_neighbours[i];
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
      adjList.set(this.props.edges[i].v, []);
    }
    for(var i=0;i<this.props.edges.length;i++) {
      adjList.get(this.props.edges[i].u).push(this.props.edges[i].v);
      adjList.get(this.props.edges[i].v).push(this.props.edges[i].u);
    }
    var visited = [];
    for(i=1;i<=n;i++) {
      visited[i] = false;
    }
    if(this.state.start != "") {
      this.dfs(this.state.start, visited, adjList);
    }
  }

  sendVertex(e) {
    this.props.dispatch(Refresh());
    this.setState({ start: e.target.value });
  }

  componentDidUpdate() {
    var n = this.props.dfs.length;
    console.log(n);
    for(var i=1;i<=n;i++) {
      this.douche(i);
    }
  }

  douche(i) {
    var str = ".vertex:nth-child(" + (i) + ")";
    var str1 = ".dfs_list:nth-child(" + (i) + ")";
    setTimeout(function() {
      $(str).addClass("activeNode");
      $(str1).addClass("magic");
      setTimeout(function() {
        $(str).removeClass("activeNode"); 
      }, 500);
    }, i*1000);
  }

  render() {
    const { edges, dfs } = this.props;
    console.log("dfs output" + dfs);
    const edgesMapped = edges.map(edge => <li className="edge_list" key={edge.edge_id}>( {edge.u} , {edge.v} )</li>);
    const dfs_output = dfs.map(v => <li className="vertex" key={v}>{v}</li>);
    const DFS = dfs.map(v => <li className="dfs_list" key={v}>{v}</li>);
    return (
      <div className="mainDiv">
        <table className="tab">
          <tbody>
            <tr>
              <td><h1>Insert Edges<br /></h1></td>
            </tr>
            <tr>
              <td><h4 className="error">{this.state.error}</h4></td>
            </tr>
            <tr>
              <td><input className="edge" onKeyPress={this.newEdge.bind(this)} /></td>
            </tr>
          </tbody>
        </table>
        <br />
        <ul className="list">{edgesMapped}</ul>
        <br />
        <input className="startV" onChange={this.sendVertex.bind(this)} placeholder="Start Vertex" />
        <button className="dfs" onClick={this.dfsStart.bind(this)}>DFS</button>
        <hr  className="line" />
        <h1>DFS Output</h1>
        <br />
        <ul className="list_dfs">{DFS}</ul>
        <br />
        <ul id="nodes" className="list_dfs">{dfs_output}</ul>
      </div>
    );
  }
}

module.exports = Layout;
