let testLabelAnno = {
  sampleLabels: [
    { "mid": "/m/015p6", "description": "bird", "score": 0.9770624, "topicality": 0.9770624 },
    { "mid": "/m/0fp7c", "description": "hawk", "score": 0.9682715, "topicality": 0.9682715 },
    { "mid": "/m/0f6x8", "description": "bird of prey", "score": 0.8973043, "topicality": 0.8973043 },
    { "mid": "/m/0f6wt", "description": "falcon", "score": 0.89251894, "topicality": 0.89251894 },
    { "mid": "/m/01c4rd", "description": "beak", "score": 0.89066035, "topicality": 0.89066035 },
    { "mid": "/m/035qhg", "description": "fauna", "score": 0.8777496, "topicality": 0.8777496 },
    { "mid": "/m/01g4rl", "description": "buzzard", "score": 0.7848812, "topicality": 0.7848812 },
    { "mid": "/m/01d64p", "description": "accipitriformes", "score": 0.7364424, "topicality": 0.7364424 },
    { "mid": "/m/09csl", "description": "eagle", "score": 0.6947142, "topicality": 0.6947142 },
    { "mid": "/m/01280g", "description": "wildlife", "score": 0.54268223, "topicality": 0.54268223 }
  ],
  visionQuery: function(labelAnnotations) {
    let birdNames = []
    this.sampleLabels.forEach(labelAnnotation => {
      birdNames.push(labelAnnotation.description);
    })
    // return "test";
    return birdNames[0]
    // return birdNames
  }
}

module.exports = testLabelAnno;

console.log(testLabelAnno.visionQuery(testLabelAnno.sampleLabels[0]))
// console.log(testLabelAnno.visionQuery(testLabelAnno.sampleLabels))
