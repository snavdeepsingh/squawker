$(function() {

  // Preview function should we need it...

  function previewFile(){
    let submitBtn = document.querySelector('.btn-container');
    let background = document.querySelector('.home-bg');
    let preview = document.querySelector('#image-preview');
    let file    = document.querySelector('input[type=file]').files[0];
    let reader  = new FileReader();
    let homeText = document.querySelector('#home-text');
    let loadingText = document.querySelector('#loading-text');
    let loaderWrapper = document.querySelector('.loader-wrapper');

    reader.onloadend = function () {
      preview.src = reader.result;
    }

    if (file) {
      reader.readAsDataURL(file);
      homeText.innerText = '';
      loadingText.innerText = 'Loading...';
      submitBtn.classList.add('hidden');
      background.classList.add('loading');
      loaderWrapper.classList.add('loading');
    } else {
      preview.src = "";
      loadingText.innerText = '';
      homeText.innerText = 'WELCOME'
      submitBtn.classList.remove('hidden');
      background.classList.remove('loading');
      loaderWrapper.classList.remove('loading');
    }
  }

  $('.btn-camera').on('click', function(e) {
    e.preventDefault();
    $('#image-capture-button').click();
  })

  $("#image-capture-button").change(function(event) {
    previewFile();
    $('#image-submit-button').click();
  });

});
