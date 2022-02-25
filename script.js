(() => {
  "use strict";

  const global = {
    results: null,
    iterator: 0
  };

  const requestApi = async () => {
    const req = await fetch(
      "https://api.themoviedb.org/3/tv/on_the_air?api_key=270453aa135306dfe97581424077df1b&language=pt-BR"
    );
    const obj = await req.json();
    return obj.results;
  };

  const createSlotsParams = (listFilms, reference, appendTo) => {
    var slotId = 0;
    reference.setAttribute("slot", slotId);
    slotId++;

    while (slotId < listFilms.length) {
      var newFilm = reference.cloneNode(true);
      newFilm.setAttribute("slot", slotId);
      appendTo.appendChild(newFilm);
      slotId++;
    }
  };

  const init = async () => {
    global.results = await requestApi();
    if (global.results != null) {
      createSlotsParams(
        global.results,
        document.querySelector(".film-item"),
        document.querySelector(".film-list")
      );
    }

    global.results.forEach(i => {
      var item = document.querySelector(".film-item[slot='"+ global.iterator +"']");
      var image = item.querySelector('.film-image');
      var title = item.querySelectorAll('.film-title');
      var releaseDate = item.querySelector('.film-release-date');
      var overview = item.querySelector('.film-overview');
      image.style.background = 'url(https://image.tmdb.org/t/p/w300' + i.poster_path + ') center / cover no-repeat';
      title.forEach(t => t.textContent = i.name);
      releaseDate.textContent = 'Data de Lançamento: ' + new Date(i.first_air_date).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
      overview.textContent = i.overview;
      global.iterator++;
      item.onclick = () => {
        window.open('https://image.tmdb.org/t/p/w500' + i.poster_path, '_blank')
      }
    });
  };

  init();
})();
