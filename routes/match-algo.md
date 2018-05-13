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

      <!-- create new object for matching descriptions -->
      let matchingDescriptionsArray = webEntities.map(description => {
        query bird name database for matching description
        if (description is found in bird name db) {
          matchingDescriptionsArray.push(description)
        }
      })

    }
  }
