const Items = [
    new Item(100),
    new Item(200),
    new Item(400),
    new Item(400),
    new Item(500),
    new Item(3000),
    new Item(800)
];
const max_capacity = 4700;
const n_items_max = 10;

const solver = new GeneticSolver(max_capacity, Items, n_items_max);
console.log(solver.generation_max)
let solution = solver.findOptimalConfiguration(function(temp_sol, fitest, gen) {
    if(gen % 100 == 0) {
        console.log("Gen. "+gen+ " => Optimal space "+fitest.score);
    }
});
console.log(solution);