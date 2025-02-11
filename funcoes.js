/*
https://servicodados.ibge.gov.br/api/v2/censos/nomes/

utilizar api para validar o primeiro nome;
*/

let inputName = document.querySelector(".input-participant"); //obtem apenas o primeiro elemento.
inputName.value = "";
let buttonRegister = document.querySelector(".btn-cadastrar");
let labelInputName = document.querySelector(".label-participant");
let listFriends = document.querySelector(".participants-list");
let buttonShuffle = document.querySelector(".button-shuffle");
let inputGroup = document.querySelector(".input-group");
let viewNameDraw = document.querySelector(".conteiner-draw");
let nameDrawFriend = document.querySelector(".draw-friend");
let buttonReset = document.querySelector(".button-reset");
let drawer = document.querySelector(".drawer");
let alertName = document.querySelector(".alert-name");

// let participants = ["allan", "eva", "ana", "pedro"];
let participants = [];

// speech('Bem-vindo ao sorteio de amigo secreto.');

function speech(text) {
  if ("speechSynthesis" in window) {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    utterance.rate = 1.5;
    utterance.pitch = 1.7; // Valor padrão; teste com 0.9 ou 1.1 se necessário
    utterance.volume = 0.5;
    const setVoice = () => {
      const voices = window.speechSynthesis.getVoices();

      // Exemplo de filtro: tenta selecionar uma voz cujo nome contenha "male"
      // OBSERVAÇÃO: O nome exato pode variar conforme o navegador.
      const maleVoice = voices.find((voice) =>
        voice.name.toLowerCase().includes("male")
      );

      // Se não encontrar uma voz que contenha 'male', utiliza a primeira da lista (ou escolha outra lógica)
      utterance.voice = maleVoice || voices[0];

      // Fala a mensagem
      window.speechSynthesis.speak(utterance);
    };

    // Se as vozes ainda não estiverem carregadas, aguarda o evento voiceschanged
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener("voiceschanged", setVoice);
    } else {
      setVoice();
    }
  } else {
    console.log("Web Speech API não suportada neste navegador.");
  }
}

function disableButtonRegister() {
  buttonRegister.classList.remove("input-cadastrar--ativo");
  buttonRegister.setAttribute("disabled", "true");
}

function enableButtonRegister() {
  buttonRegister.classList.add("input-cadastrar--ativo");
  buttonRegister.removeAttribute("disabled");
}

function enableButtonShufle() {
  buttonShuffle.classList.add("button-shuffle--ativo");
  buttonShuffle.removeAttribute("disabled");
  buttonShuffle.style.display = "flex";
}

function disableButtonShufle() {
  buttonShuffle.classList.remove("button-shuffle--ativo");
  // buttonShuffle.style.display = 'none'
  buttonShuffle.setAttribute("disabled", "true");
}

function enableButtonReset() {
  buttonReset.removeAttribute("disabled");
  buttonReset.style.display = "flex";
}

function hideButtonReset() {
  buttonReset.setAttribute("disabled", "true");
  buttonReset.style.display = "none";
}

function enableLabel() {
  labelInputName.classList.add("label-visible");
}

function disableLabel() {
  labelInputName.classList.remove("label-visible");
}

function registerName() {
  let inputName = document.querySelector(".input-participant"); //obtem apenas o primeiro elemento.

  let nomeExiste = participants.find((nome) => {
    return nome == capitalizarNome(inputName.value);
  });
  console.log(nomeExiste);
  if (nomeExiste) {
    // alert(`${capitalizarNome(inputName.value)} já registrado.`);
    alertName.style.display = 'flex';
    alertName.innerHTML = `${capitalizarNome(inputName.value)} já registrado`
  }

  if (checkName(inputName.value) && !nomeExiste) {
    participants.push(capitalizarNome(inputName.value));
    // participants2 = [...participants]
    console.log(participants);
    inputName.value = "";
    disableLabel();
    disableButtonRegister();
    showListFriends();
    if (participants.length > 3 && participants.length % 2 == 0) {
      enableButtonShufle();
    } else {
      disableButtonShufle();
    }
  }
}

function contentNumber(name) {
  return /\d/.test(name);
}

function checkName(name) {
  if (name === "" || contentNumber(name) || name === undefined) {
    disableButtonRegister();
    return false;
  } else if (name.length > 1) {
    enableButtonRegister();
    return true;
  } else {
    disableButtonRegister();
    return false;
  }
}

function checkNumberParicipant() {
  if (participants.length < 2) {
    console.error("É necessário pelo menos dois participantes.");
    return;
  }
}

function removeBotaoDelet() {
  let butonRemoveParticipant = document.querySelectorAll(".button-remove");
  butonRemoveParticipant.forEach((button) => button.remove());
}

function capitalizarNome(nome) {
  // const excecoes = ["de", "da", "dos", "das", "do"];

  return nome
    .toLowerCase()
    .split(" ")
    .map(
      (palavra) =>
        //  excecoes.includes(palavra) ? palavra : palavra.charAt(0).toUpperCase() + palavra.slice(1)
        palavra.charAt(0).toUpperCase() + palavra.slice(1)
    )
    .join(" ");
}

function enableClickItemParticipant(listDraw) {
  let itemParticipant = document.querySelectorAll(".participant-item");
  itemParticipant.forEach((item) => {
    item.classList.add("participant-item--click");
    item.addEventListener("click", (e) => {
      let selectItem = e.target.closest(".participant-item");
      let selectIndex = selectItem.getAttribute("data-index");
      console.log(selectIndex);
      enableViewNameDraw(selectIndex, listDraw);
      enableDrawer(selectIndex);
    });
  });
}

function enableViewNameDraw(indexFriendDraw, listDraw) {
  let eye = document.querySelector(".eye");
  let eyeBlock = document.querySelector(".eye-hide");
  eye.style.display = "flex";
  eyeBlock.style.display = "none";
  viewNameDraw.style.display = "flex";
  console.log(listDraw[indexFriendDraw]);
  nameDrawFriend.innerHTML = "***********";
  eye.addEventListener("click", () => {
    eye.style.display = "none";
    nameDrawFriend.innerHTML = listDraw[indexFriendDraw];
    eyeBlock.style.display = "flex";
  });
  eyeBlock.addEventListener("click", () => {
    eyeBlock.style.display = "none";
    nameDrawFriend.innerHTML = "***********";
    eye.style.display = "flex";
  });
}

function enableDrawer(index) {
  drawer.style.display = "flex";
  drawer.innerHTML = `${participants[index]}  veja quem você tirou`;
}
function hideDrawer() {
  drawer.style.display = "none";
}

function sattolo() {
  let copyFriends = [...participants];
  let lenghtCopyFriends = copyFriends.length;

  for (let i = lenghtCopyFriends - 1; i > 0; i--) {
    //(i+1) é para ele percorrer do 0 ao utimo item do arry
    const j = Math.floor(Math.random() * i);
    [copyFriends[i], copyFriends[j]] = [copyFriends[j], copyFriends[i]];
  }

  console.log(copyFriends);

  return copyFriends;
}

function drawFriend() {
  const resultDraw = sattolo();
  inputGroup.classList.add("input-group--disable");

  inputGroup.addEventListener(
    "transitionend",
    (e) => {
      if (e.propertyName === "opacity") {
        inputGroup.remove();
      }
    },
    { once: true }
  );

  removeBotaoDelet();
  enableClickItemParticipant(resultDraw);
  disableButtonShufle();
  enableButtonReset();
  buttonShuffle.style.display = "none";
  // speech('Amigos já sorteados.');
  // speech('Cuidado ao clicar em um nome, e exibir o amigo. Não será possível clicar no seu nome novamente e exibir o amigo sorteado.');
}

buttonShuffle.addEventListener("click", () => {
  buttonShuffle.classList.remove("button-shuffle--ativo");
  buttonShuffle.setAttribute("disabled", "true");
  drawFriend();
});

inputName.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    registerName();
  }
});

inputName.addEventListener("input", (event) => {
  alertName.style.display = 'none';
  
  checkName(event.target.value);
  if (event.target.value.length >= 1) {
    enableLabel();
  } else {
    disableLabel();
  }
});

buttonRegister.addEventListener("click", () => {
  registerName();
  inputName.focus();
});

buttonReset.addEventListener("click", () => {
  if (confirm("Você deseja reseta o game?")) {
    location.reload();
  } 
});

function showListFriends() {
  listFriends.innerHTML = "";
  if (participants.length > 0) {
    for (i = 0; i < participants.length; i++) {
      let item = `<li class="participant-item" data-index="${i}" title="${participants[i]}">
                    <p class="participant-name">${participants[i]}</p>
                    <button class="button-remove" aria-label="Excluir" data-index="${i}">
                      <i class="fa-solid fa-trash" ></i>
                    </button>
                  </li>`;
      listFriends.innerHTML += item;
    }
  }
  let buttonDelet = document.querySelectorAll(".button-remove");
  for (i = 0; i < buttonDelet.length; i++) {
    buttonDelet[i].addEventListener("click", (e) => {
      let itemRevome = e.target.closest(".button-remove");
      let indexRemove = itemRevome.getAttribute("data-index");
      console.log(participants.splice(indexRemove, 1));
      showListFriends();
      
      if (participants.length > 3 && participants.length % 2 == 0) {
        enableButtonShufle();
      } else {
        disableButtonShufle();
      }
    });
  }
}
