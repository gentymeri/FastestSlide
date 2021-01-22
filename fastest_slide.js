const pyramid1 = `4
1
2 3
4 5 6
7 8 9 10`

const pyramid2 = `4 
3 
7 4
2 4 6
8 5 9 3`

const pyramid3 = `15
75
95 64
17 47 82
18 35 87 10
20 4 82 47 65
19 1 23 75 3 34
88 2 77 73 7 63 67
99 65 4 28 6 16 70 92
41 41 26 56 83 40 80 70 33
41 48 72 33 47 32 37 16 94 29
53 71 44 65 25 43 91 52 97 51 14
70 11 33 28 77 73 17 78 39 68 17 57
91 71 52 38 17 14 91 43 58 50 27 29 48
63 66 4 68 89 53 67 30 73 16 69 87 40 31
4 62 98 27 23 9 70 98 73 93 38 53 60 4 23`



function fastestPath(input) {
  const data =  input.split("\n")
  .map(x => x.split(" ")
       .filter(x => !!x)
       .map(x => parseInt(x)));
  data.shift();

  // fill our path with the starting point
  let paths = [data[0][0]];

  // go through each row in our pyramid
  for (let i = 1; i < data.length; i++) {
    // create the next row
    let newPaths = [];
    // update the only option for the right most path
    newPaths[i] = paths[i-1] + data[i][i];
    // update the only option for the left most path
    newPaths[0] = paths[0] + data[i][0];

    // in between, check through our previous entries and see which
    // two paths can land here. We care about the most optimal path
    // to a particular point
    for (let j = 1; j < i; j++) {
      newPaths[j] = Math.min(
        paths[j-1] + data[i][j],
        paths[j] + data[i][j]);
    }
    paths = newPaths;
  }
  return Math.min.apply(Math, paths);
}

console.log(fastestPath(pyramid1));
console.log(fastestPath(pyramid2));
console.log(fastestPath(pyramid3));