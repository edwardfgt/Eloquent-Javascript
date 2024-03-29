const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall",
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map((r) => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels
        .map((p) => {
          if (p.place != this.place) return p;
          return { place: destination, address: p.address };
        })
        .filter((p) => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}

function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}
function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) };
}

VillageState.random = function (parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({ place, address });
  }
  return new VillageState("Post Office", parcels);
};

runRobot(VillageState.random(), randomRobot);

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
}

function findRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some((w) => w.at == place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

function goalOrientedRobot({ place, parcels }, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

function runRobotSteps(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      return turn;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
  }
}

function compareRobots(robot1, memory1, robot2, memory2) {
  let totalStepsRobot1 = 0;
  let totalStepsRobot2 = 0;

  for (let i = 0; i < 100; i++) {
    let task = VillageState.random();

    totalStepsRobot1 += runRobotSteps(task, robot1, memory1);
    totalStepsRobot2 += runRobotSteps(task, robot2, memory2);
  }

  console.log(`Robot 1 average steps: ${totalStepsRobot1 / 100}`);
  console.log(`Robot 2 average steps: ${totalStepsRobot2 / 100}`);
}

function findShortestRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some((w) => w.at == place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

function distance(graph, from, to) {
  return findShortestRoute(graph, from, to).length;
}

function nearestParcelRobot({ place, parcels }, route) {
  if (route.length == 0) {
    let shortestDistance = Infinity;
    let targetParcelIndex;

    // Loop through each parcel to find the nearest one
    for (let i = 0; i < parcels.length; i++) {
      let parcel = parcels[i];
      let targetPlace = parcel.place !== place ? parcel.place : parcel.address;
      let currentDistance = distance(roadGraph, place, targetPlace);

      if (currentDistance < shortestDistance) {
        shortestDistance = currentDistance;
        targetParcelIndex = i;
      }
    }

    let targetParcel = parcels[targetParcelIndex];
    if (targetParcel.place !== place) {
      route = findShortestRoute(roadGraph, place, targetParcel.place);
    } else {
      route = findShortestRoute(roadGraph, place, targetParcel.address);
    }
  }

  return { direction: route[0], memory: route.slice(1) };
}

compareRobots(nearestParcelRobot, [], goalOrientedRobot, []);
