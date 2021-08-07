import Graph from "react-graph-vis";

export function GraphComponent() {
  const graph = {
    nodes: [
      { id: 1},
      { id: 2},
      { id: 3},
      { id: 4},
      { id: 5}
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 }
    ]
  };

  const options = {
    layout: {
      hierarchical: false
    },
    edges: {
      arrows: '',
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

  const events = {
    select: function(event) {
      var { nodes, edges } = event;
    }
  };
  return (
    <Graph
      graph={graph}
      options={options}
      events={events}
      getNetwork={network => {
        //  if you want access to vis.js network api you can set the state in a parent component using this property
      }}
    />
  );
}

