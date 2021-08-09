import Graph from "react-graph-vis";
import {useState} from 'react';

export function GraphComponent({isAdd}) {

  const contaminate = (node_v, node_w) => {
    let v = adj[node_v.id];
    let w = adj[node_w.id];
    console.log(`vprob: ${v.prob} wprob: ${w.prob}`);
    let prob;
    if (v.mask && w.mask) {
      prob = 0.015;
    } else if (v.mask && !w.mask) {
      prob = 0.050;
    } else if (!v.mask && w.mask) {
      prob = 0.300;
    } else {
      prob = 0.900;
    }
    w.prob = (1 - (1 - (v.prob*prob)/100) * (1 - w.prob/100))*100;
    node_w.color = gradient[Math.round(w.prob/10)];
    console.log(`wprob: ${w.prob} round: ${Math.round(w.prob/10)} color: ${node_w.color}`);
  }

  const bfs = () => {
    const nodes = graph.nodes.filter(node => {return (node.color == "red" || node.color == "pink")});
    for(var i = 0; i < nodes.length; i++) {
      let v = nodes[i];

      var s = [];
      var verified = Array(adj.length).fill(false);

      verified[v.id] = true;
      s.push(v.id);
      while(s.length > 0){
        var w = s.pop();
        setState(({ graph, ...rest }) => {
          return {
            graph,
            ...rest
          }
        });
        for(var j = 0; j < adj[w].edges.length; j++) {
          let u = adj[w].edges[j];
          if (!verified[u]) {
            verified[u] = true;
            if (adj[u].prob != 100.0)
              s.push(u);
            contaminate(graph.nodes[w], graph.nodes[u]);
          }
        }
      }
      
    }
  }
  const adj = [
    {mask: false, prob: 0.0, edges: [1]},
    {mask: false, prob: 0.0, edges: [0, 2]},
    {mask: false, prob: 0.0, edges: [1, 3]},
    {mask: false, prob: 0.0, edges: [2, 4]},
    {mask: false, prob: 0.0, edges: [3, 5]},
    {mask: false, prob: 0.0, edges: [4, 6]},
    {mask: false, prob: 0.0, edges: [5, 7]},
    {mask: false, prob: 0.0, edges: [6, 8]},
    {mask: false, prob: 0.0, edges: [7, 9]},
    {mask: false, prob: 0.0, edges: [8, 10]},
    {mask: false, prob: 0.0, edges: [9, 11]},
    {mask: false, prob: 0.0, edges: [10, 12]},
    {mask: false, prob: 0.0, edges: [11, 13]},
    {mask: false, prob: 0.0, edges: [12]}
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
      for(var j = 0; j < adj[i].edges.length; j++) {
        edges.push({from: i, to: adj[i].edges[j]});
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

  const gradient = {
    0: "#ffffff",
    1: "#ffece5",
    2: "#ffd9cb",
    3: "#ffc6b2",
    4: "#ffb299",
    5: "#ff9e81",
    6: "#ff8969",
    7: "#ff7352",
    8: "#ff5b3a",
    9: "#ff3e22",
    10: "#ff0000"
  }
  const changeState = (id) => {
    const node = graph.nodes.find(node => {return node.id == id});
    const color = node.color;
    node.color = colors[color];

    if (node.color == "red") {
      adj[node.id].prob = 100.0;
      adj[node.id].mask = false;
    } else if (node.color == "pink") {
      adj[node.id].prob = 100.0;
      adj[node.id].mask = true;
    } else if (node.color == "black") {
      adj[node.id].prob = 0.0;
      adj[node.id].mask = true;
    }
    else {
      adj[node.id].prob = 0.0;
      adj[node.id].mask = false;
    }

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

