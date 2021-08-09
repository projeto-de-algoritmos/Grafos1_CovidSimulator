import Graph from "react-graph-vis";
import {useState} from 'react';

export function GraphComponent({isAdd}) {

  const bfs = () => {
    const nodes = graph.nodes.filter(node => {return node.color == "red"});
    for(var i = 0; i < nodes.length; i++) {
      let v = nodes[i];

      var s = [];
      var verified = Array(adj.length).fill(false);

      verified[v.id] = true;
      s.push(v.id);
      while(s.length > 0){
        var w = s.pop();
        graph.nodes[w].color = colors[graph.nodes[w].color];
        setState(({ graph, ...rest }) => {
          return {
            graph,
            ...rest
          }
        });
        for(var j = 0; j < adj[w].length; j++) {
          let u = adj[w][j];
          if (!verified[u]) {
            s.push(u);
            verified[u] = true;
          }
        }
      }
      
    }
  }
  const adj = [
    [1],
    [0, 2],
    [1, 3],
    [2, 4],
    [3, 5],
    [4, 6],
    [5, 7],
    [6, 8],
    [7, 9],
    [8, 10],
    [9, 11],
    [10, 12],
    [11, 13],
    [12]
  ]


  const buildNodes = () => {
    const nodes = []
    for (var i = 0; i < adj.length; i++) {
      nodes.push({id: i, color: "gray"});
    }
    return nodes;
   
  }

  const buildEdges = () => {
    const edges = []
    for (var i = 0; i < adj.length; i++) {
      for(var j = 0; j < adj[i].length; j++) {
        edges.push({from: i, to: adj[i][j]});
      }
    }
    return edges;
  }

  const colors = {
    "gray": "black",
    "black": "red",
    "red": "pink",
    "pink": "gray"
  }

  const changeState = (id) => {
    const node = graph.nodes.find(node => {return node.id == id});
    const color = node.color;
    node.color = colors[color];
    setState(({ graph, ...rest }) => {
      return {
        graph,
        ...rest
      }
    });
  }


  const options = {
    layout: {
      hierarchical: false,
      randomSeed: 10
    },
    edges: {
      color: "#000000"
    },
    nodes: {
        fixed: true
    },
    height: "100%",
    interaction: {
        selectConnectedEdges: false,
        multiselect: true
    }
  };

  const [state, setState] = useState({
    counter: 5,
    graph: {
      nodes: buildNodes(),
      edges: buildEdges()
    },
    events: {
      selectNode: ({ nodes}) => {
        changeState(nodes[0]);
      },
      doubleClick: () => {
        bfs();
      }
    }
  })

  const { graph, events } = state;

  return (
      <Graph
      key = {Math.random()}
        graph={graph}
        options={options}
        events={events}
        getNetwork={network => {
        //  if you want access to vis.js network api you can set the state in a parent component using this property
        }}
      />
  );
}

