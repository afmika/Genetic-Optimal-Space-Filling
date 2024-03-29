/**
 * @author afmika
 * @email afmichael73@gmail.com
 */

const FILLER_ID = "@__^_^__@";

/**
 * Generates a random id
 * @param {number} length
 */
function generateId(length) {
  const alpha = "abcdefghijklmnopqrstuvwxyzABC123456789";
  let lg = 20 || length;
  let id = "";
  while (lg > 0) {
    const index = Math.floor(Math.random() * alpha.length);
    id += alpha[index];
    lg--;
  }
  return id;
}

/**
 * @constructor
 * @param {number} size
 * @param {string} id
 */
class Item {
  constructor(size, id) {
    this.size = size || 0;
    this.id = id || generateId(15);
  }
}

/**
 * @constructor
 * @param {string[]} dna
 */
class Member {
  constructor(dna) {
    this.dna = dna;
    this.score = 0;
    this.total_size = 0;
  }
}

/**
 * Generates a random Member
 * @param {number} dna_size
 * @param {Item[]} items
 */
function randomMember(dna_size, items) {
  const dna = [];
  for (let i = 0; i < dna_size; i++) {
    const index = Math.floor(Math.random() * items.length);
    dna.push(items[index]);
  }
  return new Member(dna);
}

/**
 * @param {Item[]} dna
 * @returns {Item[]}
 */
function distinctDNAComponent(dna) {
  let distinct_ids = [];
  let distinct_version = [];
  for (let index = 0; index < dna.length; index++) {
    const temp = dna[index];
    if (!distinct_ids.includes(temp.id) && temp.id != FILLER_ID) {
      distinct_version.push(temp);
      distinct_ids.push(temp.id);
    }
  }
  return distinct_version;
}

class GeneticSolver {
  /**
   * @constructor
   * @param {number} max_capacity
   * @param {Item[]} items
   * @param {number} n_items_max
   */
  constructor(max_capacity, items, n_items_max) {
    this.max_capacity = max_capacity;
    this.items = items || [];

    this.items.push(new Item(0, FILLER_ID));

    this.mutation_rate = 0.2;
    this.fitest_rate = 0.3;
    this.n_population = 100;
    this.n_items_max = n_items_max || 10; // length of the sequence
    this.generation_max = 50 * n_items_max;
    /** @type Member[] */
    this.population = [];
  }

  initPopulation() {
    this.population = [];
    for (let i = 0; i < this.n_population; i++) {
      this.population.push(randomMember(this.n_items_max, this.items));
    }
  }

  /**
   * One step == One generation
   * @returns {Member} Current fitest
   */
  step() {
    this.evaluatePopulation(this.population);
    this.population.sort((a, b) => b.score - a.score);

    let fitest = this.population[0];

    let new_generation = [];
    let parents = []; // parents => 'fitest'
    let pourcentage_parents = this.fitest_rate * this.population.length;

    this.population.forEach((member, index) => {
      if (index <= pourcentage_parents) {
        parents.push(member); // parents
        new_generation.push(member);
      }
    });

    while (new_generation.length < this.population.length) {
      let father_index = Math.floor(Math.random() * parents.length);
      let mother_index = Math.floor(Math.random() * parents.length);
      if (mother_index != father_index) {
        const father = parents[father_index];
        const mother = parents[mother_index];
        let child = this.crossOver(father, mother);

        this.mutate(child);
        new_generation.push(child);
      }
    }
    this.population = new_generation;

    return fitest;
  }

  /**
   * @param {Function} fun
   * @returns
   */
  findOptimalConfiguration(fun) {
    this.initPopulation();
    let generation = 0;
    let fitest = null;
    while (generation < this.generation_max) {
      fitest = this.step();
      if (fun) {
        fun(distinctDNAComponent(fitest.dna), fitest, generation);
      }
      generation++;
    }
    return distinctDNAComponent(fitest.dna);
  }

  /**
   * Evaluates a single individual (Member)
   * @param {Member} member Entity to evaluate
   */
  evaluate(member) {
    const pass = [];
    let x = 0;
    for (let i = 0; i < this.n_items_max; i++) {
      const temp = member.dna[i];
      if (!pass.includes(temp.id)) {
        x += member.dna[i].size;
        pass.push(temp.id);
      }
    }
    // maximizes the space
    member.total_size = x;
    if (x > this.max_capacity) {
      // wrooong~
      member.score = this.max_capacity / x;
    } else {
      member.score = x;
    }

    // maximizes the number of items
    member.score += pass.length;
  }

  /**
   * Evaluates an entire population
   * @param {Member[]} population
   */
  evaluatePopulation(population) {
    population.forEach((x) => {
      this.evaluate(x);
    });
  }

  /**
   * Mutates an individual (member) based on this.mutation_rate
   * @param {Member} member member to mutate
   */
  mutate(member) {
    for (let i = 0; i < this.n_items_max; i++) {
      if (Math.random() <= this.mutation_rate) {
        const index = Math.floor(Math.random() * this.items.length);
        member.dna[i] = this.items[index];
      }
    }
  }

  /**
   * Cross over the dna of the two individuals
   * @param {Member} father
   * @param {Member} mother
   */
  crossOver(father, mother) {
    const child = new Member([]);
    const middle = Math.floor(this.n_items_max / 2);
    for (let i = 0; i < this.n_items_max; i++) {
      const gene = i < middle ? father.dna[i] : mother.dna[i];
      child.dna.push(gene);
    }
    return child;
  }
}

module.exports = {
  GeneticSolver: GeneticSolver,
  Item: Item,
};
