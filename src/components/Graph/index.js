import Graph from "react-graph-vis";
import {useState} from 'react';

export function GraphComponent({isAdd}) {

  const contaminate = (node_v, node_w) => {
    let v = adj[node_v.id];
    let w = adj[node_w.id];
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
  }

  const bfs = () => {
    const nodes = graph.nodes.filter(node => {return (node.color == "red" || node.color == "pink")});
    for(var i = 0; i < nodes.length; i++) {
      let v = nodes[i];

      var s = [];
      var verified = Array(adj.length).fill(false);

      verified[v.id] = true;
      s.push(v.id);
      v.color = gradient[10];
      
      while(s.length > 0){
        var w = s.pop();

        for(var j = 0; j < adj[w].edges.length; j++) {
          let u = adj[w].edges[j];
          if (!verified[u]) {
            verified[u] = true;
            if (adj[u].prob != 100.0) {
              s.push(u);
            }
            contaminate(graph.nodes[w], graph.nodes[u]);
          }
        }

        setState(({ graph, ...rest }) => {
          return {
            graph,
            ...rest
          }
        });
      }
      
    }
  }
  const adj = [
    {mask: false, prob: 0.0, edges: [1, 7, 12, 14, 23, 7]}, //0
    {mask: false, prob: 0.0, edges: [0, 2, 4, 13]}, // 1
    {mask: false, prob: 0.0, edges: [1, 3, 17, 10, 22]},// 2
    {mask: false, prob: 0.0, edges: [2, 4, 6, 14]},// 3
    {mask: false, prob: 0.0, edges: [1, 3, 5, 9, 16]}, // 4
    {mask: false, prob: 0.0, edges: [4, 6, 18, 21]}, // 5
    {mask: false, prob: 0.0, edges: [5, 7, 3, 11, 18, 24]}, // 6
    {mask: false, prob: 0.0, edges: [0, 6, 8, 15]}, // 7
    {mask: false, prob: 0.0, edges: [7, 9, 20]}, // 8
    {mask: false, prob: 0.0, edges: [8, 10, 4, 17, 19]}, // 9
    {mask: false, prob: 0.0, edges: [2, 9, 11, 22, 26, 25]}, // 10
    {mask: false, prob: 0.0, edges: [10, 12, 6, 17, 23]}, // 11
    {mask: false, prob: 0.0, edges: [0, 11, 13, 24]}, // 12
    {mask: false, prob: 0.0, edges: [1, 12]}, // 13
    {mask: false, prob: 0.0, edges: [0, 3, 23, 15, 16, 23]}, // 14
    {mask: false, prob: 0.0, edges: [14, 7, 16, 17, 18, 22, 26]}, // 15
    {mask: false, prob: 0.0, edges: [15, 4, 14, 17]}, // 16
    {mask: false, prob: 0.0, edges: [2, 11, 16, 18, 9, 15, 23]}, // 17
    {mask: false, prob: 0.0, edges: [5, 15, 17, 6, 19]}, // 18
    {mask: false, prob: 0.0, edges: [9, 18, 21]}, // 19
    {mask: false, prob: 0.0, edges: [8, 21]}, // 20
    {mask: false, prob: 0.0, edges: [20, 5, 19, 22]}, // 21
    {mask: false, prob: 0.0, edges: [21, 2, 15, 10, 23]}, // 22
    {mask: false, prob: 0.0, edges: [0, 22, 11, 14, 17, 24]}, // 23
    {mask: false, prob: 0.0, edges: [6, 23, 12, 25]}, // 24
    {mask: false, prob: 0.0, edges: [10, 24]}, // 25
    {mask: false, prob: 0.0, edges: [10, 15]} // 26
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
    if (color in colors) {
      node.color = colors[color];
    } else {
      node.color = "gray";
    }

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

