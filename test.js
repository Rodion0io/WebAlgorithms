for (let generation = 0; generation < generationGenetic; generation++){
    let newPopulation = [];

    for (let i = 0; i < sizePopulation; i++) {
        const [firstParent, secondParent] = chooseParents(population);
        const [firstChild, secondChild] = crossing(firstParent, secondParent);
        mutate(firstChild);
        mutate(secondChild);
        newPopulation.push(firstChild);
        newPopulation.push(secondChild);
    }

    population = newPopulation;

    population.sort((a, b) => calculationWay(a) - calculationWay(b));

    let best = population[0];

    if (calculationWay(best) < calculationWay(bestRoute)){
        bestRoute = best;
        drawLine(bestRoute);
        console.log('dajgnkhgbi');
    }
}