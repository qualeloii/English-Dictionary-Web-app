window.onload = function() {
  const myInput = document.getElementById("myInput");
  const audio = document.getElementById('meu-audio');
  const playButton = document.querySelector('.play-button');
  
  myInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      alert(myInput.value);
    }
  });


  playButton.addEventListener('click', () => {
    audio.play();
  });
  
  }
  