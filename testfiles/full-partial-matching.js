let webEntities = [
  { "entityId": "/m/015p6", "score": 0.9654, "description": "Bird" },
  { "entityId": "/m/02vz57", "score": 0.79145, "description": "Harris hawk" },
  { "entityId": "/m/01_xsj", "score": 0.7711, "description": "Red-tailed hawk" },
  { "entityId": "/m/0fp7c", "score": 0.7064, "description": "Hawk" },
  { "entityId": "/m/0m15h", "score": 0.7052, "description": "Accipitridae" },
  { "entityId": "/m/0f6x8", "score": 0.7014, "description": "Bird of prey" },
  { "entityId": "/m/09csl", "score": 0.5579, "description": "Eagle" },
  { "entityId": "/m/0204xg", "score": 0.55154, "description": "Red-shouldered hawk" },
  { "entityId": "/m/017dv8", "score": 0.5216, "description": "Birdwatching" },
  { "entityId": "/m/016r6f", "score": 0.5131, "description": "Falconry" }
]

let matchingDBNamesArray = ['Harris hawk', 'Red-tailed hawk', 'Barn Swallow', 'Red-shouldered hawk']

// Filter the matching names from the bird name database with the descriptions and then map to new array of objects with only descriptions & scores
let filteredArray = webEntities.filter(entity => {
  return matchingDBNamesArray.includes(entity.description)
}).map(entity => {
  return {
    description: entity.description,
    score: entity.score
  }
})
console.log(filteredArray);

// Find the highest score from the new array of objects
let highScore = Math.max.apply(Math,filteredArray.map(bird => bird.score))
console.log(highScore);

// Find which bird it belongs to
let match = filteredArray.find(bird => bird.score === highScore)
console.log(match);
