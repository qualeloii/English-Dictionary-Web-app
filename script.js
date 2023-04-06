window.onload = function() {
    // Seleciona o elemento span pelo ID
    var meuSpan = document.getElementById("meu-span");
    console.log(meuSpan);
    // Adiciona um ouvinte de evento para o clique
    meuSpan.addEventListener("click", function() {
      // Define o código que será executado quando o span for clicado
      alert("O span foi clicado!");
    });
  }
  