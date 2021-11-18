(function () {
  let pagina = 1;

  const $btnAnterior = document.querySelector("#btn-anterior");
  const $btnSiguiente = document.querySelector("#btn-siguiente");

  $btnSiguiente.addEventListener("click", () => {
    if (pagina < 42) {
      pagina += 1;
      cargarPersonajes();
    }
  });

  $btnAnterior.addEventListener("click", () => {
    if (pagina > 1) {
      pagina -= 1;
      cargarPersonajes();
    }
  });

  const removerPersonajesActuales = () => {
    const $ids = document.querySelectorAll(".card-id");

    $ids.forEach((id) => {
      id.remove();
    });
  };

  const mostrarPersonajes = (api) => {
    removerPersonajesActuales();

    const $mainContent = document.querySelector("#content");
    const $template = document.querySelector("#template");
    const fragment = document.createDocumentFragment();

    const templateContent = $template.content;
    const $imagePath = templateContent.querySelector(".pic-id");

    //Colors acoording to status

    //DEAD
    const REDDEAD = "#da0f0fb8";
    const BOXSHADOWCIRCLEDEAD = "0 2px 28px 4px red";
    const BOXSHADOWDEADCARD = "0 10px 20px 5px rgba(255, 18, 0, 0.05)";
    const BORDERDEAD = "1px solid rgba(232, 99, 99, 0.5)";
    //UNKNOWN
    const GREYUNKNOWN = "#928f8ffc";
    const BOXSHADOWCIRCLEUNKNOWN = "0 2px 28px 4px #272424d4";
    const BOXSHADOWUNKNOWNCARD = "0 10px 20px 5px rgba(12, 12, 12, 0.08)";
    const BORDERUNKNOWN = "1px solid #928f8ffc";
    //ALIVE
    const GREENALIVE = "#15df4b57";
    const BOXSHADOWCIRCLEALIVE = "0 2px 28px 4px green";
    const COLORGREENTEXT = "#33a270";
    const BORDERALIVE = "1px solid rgba(83, 201, 104, 0.5)";
    const BORDERSHADOWALIVECARD = "0 10px 20px 5px rgba(0, 255, 56, 0.05)";

    for (const personaje of api.results) {
      $imagePath.src = personaje.image;
      $imagePath.alt = `${personaje.name} profile`;

      if (personaje.status === "Dead") {
        templateContent.querySelector(".is-alive-box").style.backgroundColor =
          REDDEAD;
        templateContent.querySelector(".is-alive-box").style.boxShadow =
          BOXSHADOWCIRCLEDEAD;
        templateContent.querySelector(".is-alive-text").style.color = REDDEAD;
        templateContent.querySelector(".card-id").style.border = BORDERDEAD;
        templateContent.querySelector(".card-id").style.boxShadow =
          BOXSHADOWDEADCARD;
      } else if (personaje.status === "unknown") {
        templateContent.querySelector(".is-alive-box").style.backgroundColor =
          GREYUNKNOWN;
        templateContent.querySelector(".is-alive-box").style.boxShadow =
          BOXSHADOWCIRCLEUNKNOWN;
        templateContent.querySelector(".is-alive-text").style.color =
          GREYUNKNOWN;
        templateContent.querySelector(".card-id").style.border = BORDERUNKNOWN;
        templateContent.querySelector(".card-id").style.boxShadow =
          BOXSHADOWUNKNOWNCARD;
      } else if (personaje.status === "Alive") {
        templateContent.querySelector(".is-alive-box").style.backgroundColor =
          GREENALIVE;
        templateContent.querySelector(".is-alive-box").style.boxShadow =
          BOXSHADOWCIRCLEALIVE;
        templateContent.querySelector(".is-alive-text").style.color =
          COLORGREENTEXT;
        templateContent.querySelector(".card-id").style.border = BORDERALIVE;
        templateContent.querySelector(".card-id").style.boxShadow =
          BORDERSHADOWALIVECARD;
      }
      templateContent.querySelector(".status").textContent = personaje.status;

      templateContent.querySelector(".name").textContent =
        personaje.name.toUpperCase();

      templateContent.querySelector(".specie").textContent =
        personaje.species.toUpperCase();

      templateContent.querySelector(".gender").textContent =
        personaje.gender.toUpperCase();

      templateContent.querySelector(".origin").textContent =
        personaje.origin.name.toUpperCase();

      let cloneEl = document.importNode(templateContent, true);
      fragment.appendChild(cloneEl);
    }
    $mainContent.appendChild(fragment);
  };

  const loading = (estado) => {
    const loading = document.querySelector("#spinner");
    if (estado) {
      loading.hidden = estado;
    } else {
      loading.hidden = estado;
    }
  };

  const cargarPersonajes = async () => {
    try {
      loading(false);

      const respuesta = await fetch(
        `https://rickandmortyapi.com/api/character?page=${pagina}`
      );

      const status = respuesta.status;

      if (status === 200) {
        const datos = await respuesta.json();
        mostrarPersonajes(datos);
      } else if (status === 401) {
        console.error("Algo esta mal");
      } else if (status === 404) {
        console.error("La ruta no existe");
      } else {
        console.error("Algo salió mal");
      }
    } catch (error) {
      console.log(error);
    } finally {
      loading(true);
    }
  };

  cargarPersonajes();
})();
