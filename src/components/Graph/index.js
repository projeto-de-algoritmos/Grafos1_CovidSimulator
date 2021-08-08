import Graph from "react-graph-vis";
import {useState} from 'react';
export function GraphComponent() {

  const createNode = () => {
    setState(({ counter, graph: { nodes, edges }, ...rest }) => {
      const id = counter + 1;
      return {
        graph: {
          nodes: [
            ...nodes,
            {id: id, color: "red"}
          ],
          edges: [
            ...edges,
            {from: 1, to: id}
          ]
        },
        counter: id,
        ...rest
      }
    });
  }

  const changeState = (id) => {
    setState(({ graph, ...rest }) => {
      const node = graph.nodes.find(node => {return node.id == id});
      const color = "blue";
      node.color = color;
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
        selectConnectedEdges: false
    }
  };

  const [state, setState] = useState({
    counter: 5,
    graph: {
      nodes: [
        { id: 1, color: "red" },
        { id: 2, color: "red" },
        { id: 3, color: "red" },
        { id: 4, color: "red" },
        { id: 5, color: "red" }
      ],
      edges: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 }
      ]
    },
    events: {
      selectNode: ({ nodes}) => {
        changeState(nodes[0]);
  
      },
      doubleClick: ({ pointer: { canvas } }) => {
        createNode();
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

