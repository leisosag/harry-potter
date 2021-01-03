const url = "http://hp-api.herokuapp.com/api/characters";
let characters = [];
let id = 1;

// trae los personajes de la api
const fetchCharacters = async (url) => {
  try {
    const response = await fetch(url);
    const characters = await response.json();
    return characters;
  } catch (error) {
    console.log(error);
  }
};

// borra un personaje
const deleteCharacter = (id) => {
  document.getElementById(id).remove();
};

// filtra los resultados por las casas
const filterByHouse = (house) => {
  for (character of characters) {
    character.house != house ? deleteCharacter(character.name) : null;
  }
};

// crea el card con el personaje
const createCard = ({
  name,
  house,
  image,
  dateOfBirth,
  ancestry,
  patronus,
  wand,
}) => {
  const card = `
    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" id="${name}">
        <div class="card m-2">
            <img src="${image}" class="card-img-top" alt="${name} image">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <button type="button" class="btn btn-block btn-${house}" data-toggle="modal" data-target="#modal${id}">Details</button>
                
            </div>
        </div>
    </div>
    `;

  const modal = `
    <div class="modal fade" id="modal${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal${id}">${name}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="./img/${
                                  house ? house : "hogwarts"
                                }.png" class="mt-2">
                            </div>
                            <div class="col-md-8">
                                <p>🎂 Birthday: ${
                                  dateOfBirth ? dateOfBirth : "Unknown"
                                }</p>
                                <p>🩸 Ancestry: ${
                                  ancestry ? ancestry : "Unknown"
                                }</p>
                                <p>🦄 Patronus: ${
                                  patronus ? patronus : "Unknown"
                                }</p>
                                <hr class="my-1">
                                <p>✨ Wand:</p>  
                                <ul>
                                    <li>🌱 Wood: ${
                                      wand.wood ? wand.wood : "Unknown"
                                    }</li>
                                    <li>❤️ Core: ${
                                      wand.core ? wand.core : "Unknown"
                                    }</li>
                                    <li>📏 Length: ${
                                      wand.length ? wand.length : "Unknown"
                                    }</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    `;
  id++;
  document.getElementById("resultado").insertAdjacentHTML("beforeend", card);
  document.getElementById("resultado").insertAdjacentHTML("beforeend", modal);
};

// busca un personaje del input
const searchCharacter = () => {
  console.log("buscando");
  const param = document.getElementById("input").value;
  const foundCharacter = characters.find(
    (character) => character.name.toLowerCase() === param.toLowerCase()
  );

  console.log(foundCharacter);

  for (character of characters) {
    character.name.toLowerCase() != param
      ? deleteCharacter(character.name)
      : null;
  }
};

const iterateCharacters = (characters) => {
  characters.map((character) => createCard(character));
};

// carga el DOM
const start = async () => {
  document.getElementById("search").addEventListener("click", searchCharacter);
  characters = await fetchCharacters(url);
  iterateCharacters(characters);
};

window.onload = start();
