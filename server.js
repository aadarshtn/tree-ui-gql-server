const { ApolloServer, gql } = require("apollo-server");

// Define your GraphQL schema
const typeDefs = gql`
  type Node {
    id: ID!
    label: String!
    parentId: ID
  }

  type Query {
    leftTree: [Node]
    rightTree: [Node]
  }
`;

// Dummy flat arrays for left and right trees
const leftTreeData = [
  { id: 1, label: "Root1", parentId: null }, // Root node
  { id: 2, label: "Child1", parentId: 1 },
  { id: 3, label: "Child2", parentId: 1 },
  { id: 4, label: "Grandchild1", parentId: 2 },
  { id: 5, label: "Grandchild2", parentId: 2 },
  { id: 6, label: "GreatGrandchild1", parentId: 4 }, // Deep hierarchy
  { id: 7, label: "Child3", parentId: 1 },
  { id: 8, label: "Child4", parentId: 1 },
  { id: 9, label: "Child5", parentId: 1 },
  { id: 10, label: "Leaf1", parentId: 3 }, // No children
  { id: 11, label: "Leaf2", parentId: 3 },
  { id: 12, label: "Child6", parentId: 1 },
  { id: 13, label: "Child7", parentId: 1 },
  { id: 14, label: "Disconnected", parentId: null }, // Disconnected node
  { id: 15, label: "DuplicateLabel", parentId: 1 }, // Duplicate labels
  { id: 16, label: "DuplicateLabel", parentId: 3 },
];

const rightTreeData = [
  { id: 20, label: "Root2", parentId: null }, // Root node
  { id: 21, label: "Child1", parentId: 20 }, // Duplicate label with flatArray1
  { id: 22, label: "Child2", parentId: 20 },
  { id: 23, label: "Grandchild1", parentId: 22 }, // Similar structure as flatArray1
  { id: 24, label: "Grandchild2", parentId: 22 },
  { id: 25, label: "GreatGrandchild1", parentId: 23 }, // Deep hierarchy
  { id: 26, label: "Child8", parentId: 20 },
  { id: 27, label: "Child9", parentId: 20 },
  { id: 28, label: "Leaf3", parentId: 26 }, // No children
  { id: 29, label: "Leaf4", parentId: 26 },
  { id: 30, label: "Child10", parentId: 20 },
  { id: 31, label: "DisconnectedNode", parentId: null }, // Disconnected node
  { id: 32, label: "DuplicateLabel", parentId: 22 }, // Duplicate labels
  { id: 33, label: "DuplicateLabel", parentId: 26 },
];

// Resolvers
const resolvers = {
  Query: {
    leftTree: () => leftTreeData,
    rightTree: () => rightTreeData,
  },
};

// Set up the Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
