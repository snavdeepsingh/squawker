<!-- {algo name} = TBD custom algorithm -->

1. consume image
  check image requirements {
    if (image size > 4Mb) {
      scale down image
    } else {
      run query on the image
    }
  }

2. image query
  <!-- Web Detection Logic -->
  if (webDetection key is present) {

    <!-- Best Guess Labels Logic -->
    if (bestGuessLabels key is preset) {
      if (bestGuessLabels.label is found in bird name db) {
        high chance that bestGuessLabels.label is correct name for bird, so use this in {matching algo}
      } else {
        check bird name db for similar names (come up with {search algo} for this)
      }
    }

    <!-- Full or Partially Matching Images Logic -->
    if (fullMatchingImages || partialMatchingImages keys are present) {
      We know this is probably not original image content, so we have high confidence that the webEntity labels are good

      <!-- Filter the matching names from the bird name database with the descriptions and then map to new array of objects with only descriptions & scores -->
      let filteredArray = webEntities.filter(entity => {
        return matchingDBNamesArray.includes(entity.description)
      }).map(entity => {
        return {
          description: entity.description,
          score: entity.score
        }
      })
      <!-- Find the highest score from the new array of objects -->
      let highScore = Math.max.apply(Math,filteredArray.map(bird => bird.score))
      <!-- Find which bird it belongs to -->
      let match = filteredArray.find(bird => bird.score === highScore)

    }
  }

  else {

    
  }
