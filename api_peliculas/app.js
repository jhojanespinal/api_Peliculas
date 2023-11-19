// Variable para mantener el número de página actual
let pagina = 1;

// Obtención de elementos del DOM (botones de paginación)
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

// Evento para cargar películas al hacer clic en el botón "Siguiente"
btnSiguiente.addEventListener('click', () => {
  if (pagina < 1000) { // Limita el número de página a un máximo de 1000
    pagina += 1;
    cargarPeliculas(); // Llama a la función para cargar películas
  }
});

// Evento para cargar películas al hacer clic en el botón "Anterior"
btnAnterior.addEventListener('click', () => {
  if (pagina > 1) { // Limita el número de página a un mínimo de 1
    pagina -= 1;
    cargarPeliculas(); // Llama a la función para cargar películas
  }
});

// Función para cargar películas desde la API de TMDb
const cargarPeliculas = async () => {
  try {
    // Realiza una solicitud a la API de TMDb para obtener películas populares en la página actual
    const respuesta = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=c339ce1a1aa40ef536d147768aaa559c&language=es-US&page=${pagina}`
    );

    console.log(respuesta);

    // Si la respuesta es correcta (código de estado 200)
    if (respuesta.status === 200) {
      const datos = await respuesta.json();

      let peliculas = '';

      // Itera a través de las películas y construye el contenido HTML
      datos.results.forEach(pelicula => {
        peliculas += `
        <div class="pelicula">
          <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
          <h3 class="titulo"> ${pelicula.title} </h3>
        </div >`
      });

      // Coloca el contenido HTML generado en el elemento con el ID "contenedor"
      document.getElementById('contenedor').innerHTML = peliculas;

    } else if (respuesta.status === 401) {
      console.log('Pusiste la llave API incorrectamente')

    } else if (respuesta.status === 404) {
      console.log('La película que buscas no existe')

    } else {
      console.log('Ocurrió un error desconocido');
    }

  } catch (error) {
    console.log(error);
  }
};

// Llama a la función cargarPeliculas al cargar la página inicialmente
cargarPeliculas();
