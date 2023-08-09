// Configurar as credenciais do Firebase
var firebaseConfig = {
    apiKey:"AIzaSyBagco4XVdUp6glPewQCC02-T0BLWlUxKA", 
  authDomain: "teste-d4cc6.firebaseapp.com",
  projectId: "teste-d4cc6",
  storageBucket: "teste-d4cc6.appspot.com"
};
// Inicializar o Firebase
firebase.initializeApp(firebaseConfig);

// Referenciar o Firestore
var db = firebase.firestore();

// Capturar o formulário e salvar as tags de vídeos do YouTube no Firestore ao enviá-las
document.getElementById("meuFormulario").addEventListener("submit", function (event) {
    event.preventDefault();

    var tagVideo = document.getElementById("tagVideo").value;

    // Salvar a tag de vídeo do YouTube na coleção "videos"
    db.collection("videos").add({
        tagVideo: tagVideo
    })
    .then(function (docRef) {
        console.log("Tag de vídeo salva com ID: ", docRef.id);
        alert("Tag de vídeo salva com sucesso!");
        // Limpar o campo do formulário após salvar a tag de vídeo
        document.getElementById("meuFormulario").reset();
        // Atualizar a lista de vídeos salvos na página
        exibirVideosSalvos();
    })
    .catch(function (error) {
        console.error("Erro ao salvar tag de vídeo: ", error);
        alert("Ocorreu um erro ao salvar a tag de vídeo. Por favor, tente novamente.");
    });
});

// Função para exibir as tags de vídeos salvos na página
function exibirVideosSalvos() {
    var listaVideos = document.getElementById("videosSalvos");

    // Limpar a lista antes de atualizá-la
    listaVideos.innerHTML = "";

    // Buscar as tags de vídeos na coleção "videos"
    db.collection("videos").get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // Criar um item da lista com a tag de vídeo
                var itemLista = document.createElement("li");
                var tagVideo = doc.data().tagVideo.slice(32,43);
                itemLista.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${tagVideo}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
                listaVideos.appendChild(itemLista);
            });
        })
        .catch(function (error) {
            console.error("Erro ao buscar vídeos: ", error);
        });
}


// Chamar a função de exibir vídeos ao carregar a página
exibirVideosSalvos();
