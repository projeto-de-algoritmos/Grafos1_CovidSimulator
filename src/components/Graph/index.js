import Graph from "react-graph-vis";
import {useState} from 'react';

export function GraphComponent({isAdd}) {

  console.log(`fora ${isAdd}`);
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
    setState(({ add, graph, ...rest }) => {
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
      nodes: [
        { id: 1, color: "gray" },
        { id: 2, color: "gray" },
        { id: 3, color: "gray" },
        { id: 4, color: "gray" },
        { id: 5, color: "gray" },
        { id: 6, color: "gray" },
        { id: 7, color: "gray" },
        { id: 8, color: "gray" },
        { id: 9, color: "gray" },
        { id: 10, color: "gray" },
        { id: 11, color: "gray" },
        { id: 12, color: "gray" },
        { id: 13, color: "gray" },
        { id: 14, color: "gray" },
        { id: 15, color: "gray" },
        { id: 16, color: "gray" },
        { id: 17, color: "gray" },
        { id: 18, color: "gray" },
        { id: 19, color: "gray" },
        { id: 20, color: "gray" },
        { id: 21, color: "gray" },
        { id: 22, color: "gray" },
        { id: 23, color: "gray" },
        { id: 24, color: "gray" },
        { id: 25, color: "gray" },
        { id: 26, color: "gray" },
        { id: 27, color: "gray" },
        { id: 28, color: "gray" },
        { id: 29, color: "gray" },
        { id: 30, color: "gray" }
      ],
      edges: [
        { from: 1, to: 30 },
        { from: 1, to: 5 },
        { from: 2, to: 21 },
        { from: 2, to: 13 },
        { from: 3, to: 15 },
        { from: 3, to: 5 },
        { from: 4, to: 4 },
        { from: 4, to: 3 },
        { from: 5, to: 16 },
        { from: 5, to: 14 },
        { from: 6, to: 25 },
        { from: 6, to: 28 },
        { from: 7, to: 11 },
        { from: 7, to: 17 },
        { from: 8, to: 1  },
        { from: 9, to: 19 },
        { from: 9, to: 12 },
        { from: 10, to: 6 },
        { from: 11, to: 22 },
        { from: 12, to: 29 },
        { from: 13, to: 24 },
        { from: 14, to: 11 },
        { from: 15, to: 5 },
        { from: 16, to: 16 },
        { from: 17, to: 25 },
        { from: 18, to: 1 },
        { from: 19, to: 2 },
        { from: 20, to: 19 },
        { from: 21, to: 12 },
        { from: 22, to: 22 },
        { from: 23, to: 27 },
        { from: 24, to: 5 },
        { from: 25, to: 14 },
        { from: 26, to: 18 },
        { from: 27, to: 7 },
        { from: 28, to: 30 },
        { from: 29, to: 2 },
        { from: 30, to: 5 }
      ]
    },
    events: {
      selectNode: ({ nodes}) => {
        changeState(nodes[0]);
      },
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

