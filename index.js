const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const Draw = new DrawingTools(ctx);

const items = [
    new Item(103),
    new Item(211),
    new Item(406),
    new Item(405),
    new Item(501),
    new Item(370),
    new Item(314),
    new Item(350),
    new Item(200),
    new Item(700),
    new Item(800),
    new Item(210),
    new Item(177),
    new Item(386),
    new Item(476),
    new Item(805),
    new Item(350),
    new Item(752),
    new Item(207),
    new Item(204),
    new Item(375),
    new Item(159),
    new Item(430),
    new Item(544),
    new Item(317),
    new Item(300),
    new Item(470),
    new Item(207),
    new Item(200)
];
const max_capacity = 10000;
const n_items_max = 24;

const solver = new GeneticSolver(max_capacity, items, n_items_max);
solver.generation_max = 500;

let evolutions = [];
let solution = solver.findOptimalConfiguration(function(temp_sol, fitest, gen) {
    if(gen % 2 == 0) {
        evolutions.push({
            clean_solution : temp_sol,
            fitest : fitest, 
            gen : gen
        });
    }
    if(gen % 300 == 0) {
        console.log("Gen. "+gen+ " => Optimal space "+fitest.score);
    }
});
console.log(solution);

let counter = 0;
let ms = 1000 / 20;
let interval = setInterval(function() {
    if(counter == evolutions.length) {
        clearInterval( interval );
        return;
    }

    document.querySelector("#text").innerText = `Space filled : ${evolutions[counter].fitest.score}`; 
    document.querySelector("#text").innerText += `\nNb. items : ${evolutions[counter].clean_solution.length} / ${n_items_max}`; 
    document.querySelector("#text").innerText += `\n\nMax Capacity : ${ max_capacity }`; 
    document.querySelector("#text").innerText += `\nTime delay : ${Math.round(ms)} ms`; 

    let solution = evolutions[counter].clean_solution;
    Draw.clear(0, 0,  canvas.width, canvas.height);
    temp_sol = solution.sort((a, b) => a.size < b.size);
    Draw.drawSolution(solution, max_capacity, canvas.width, canvas.height);
    counter++;
}, ms );