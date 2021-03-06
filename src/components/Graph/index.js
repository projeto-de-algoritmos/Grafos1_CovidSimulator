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
        var w = s.shift();

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
    {mask: false, prob: 0.0, edges: [1, 14, 7]}, //0
    {mask: false, prob: 0.0, edges: [0, 2, 13]}, // 1
    {mask: false, prob: 0.0, edges: [1, 10, 22]},// 2
    {mask: false, prob: 0.0, edges: [4, 6, 14, 15]},// 3
    {mask: false, prob: 0.0, edges: [3, 5, 16]}, // 4
    {mask: false, prob: 0.0, edges: [4,18, 21]}, // 5
    {mask: false, prob: 0.0, edges: [7, 3, 24]}, // 6
    {mask: false, prob: 0.0, edges: [6, 8, 15]}, // 7
    {mask: false, prob: 0.0, edges: [7, 9, 20]}, // 8
    {mask: false, prob: 0.0, edges: [8, 17, 19]}, // 9
    {mask: false, prob: 0.0, edges: [2, 26, 25]}, // 10
    {mask: false, prob: 0.0, edges: [12, 17, 23]}, // 11
    {mask: false, prob: 0.0, edges: [11, 13, 24]}, // 12
    {mask: false, prob: 0.0, edges: [1, 12]}, // 13
    {mask: false, prob: 0.0, edges: [0, 3, 16]}, // 14
    {mask: false, prob: 0.0, edges: [3, 7, 18, 26]}, // 15
    {mask: false, prob: 0.0, edges: [4, 14, 17]}, // 16
    {mask: false, prob: 0.0, edges: [11, 16, 9]}, // 17
    {mask: false, prob: 0.0, edges: [5, 15, 19]}, // 18
    {mask: false, prob: 0.0, edges: [9, 18, 21]}, // 19
    {mask: false, prob: 0.0, edges: [8, 21]}, // 20
    {mask: false, prob: 0.0, edges: [20, 5, 19]}, // 21
    {mask: false, prob: 0.0, edges: [2, 23]}, // 22
    {mask: false, prob: 0.0, edges: [22, 11]}, // 23
    {mask: false, prob: 0.0, edges: [6, 12, 25]}, // 24
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
      randomSeed: 16,
    },
    edges: {
      color: "#000000"
    },
    nodes: {
        fixed: false
    },
    height: "100%",
    interaction: {
        selectConnectedEdges: false,
        multiselect: true
    },
    physics: {
      enabled: false
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
        style={{
          width: '60%',
          height: '85%',
        }}
        getNetwork={network => {
        //  if you want access to vis.js network api you can set the state in a parent component using this property
        }}
      />
  );
}

