const movieData = API => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API}&language=ko-KR`,
  );
};

export const movieDetailFetchedData = (movieId, API) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API}&language=ko`,
  );
};

export const videoFetchedData = (movieId, API) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API}&language=ko`,
  );
};

export const creditFetchedData = (movieId, API) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API}&language=ko`,
  );
};

export const popularMovieData = API => {
  return fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API}&language=ko`,
  );
};

export const weeklypopularMovieData = API => {
  return fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${API}&language=ko`,
  );
};

export const dailypopularMovieData = API => {
  return fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${API}&language=ko`,
  );
};

// Todo 최신 영화 데이터가 3개정도 밖에 안되고 아래처럼 정보가 너무 없음 상영 영화로 일단 해놓음
/**
 * 
 * homepage": "",
  "id": 1128492,
  "imdb_id": null,
  "original_language": "cs",
  "original_title": "Odyssea - Neumírající fenomén",
  "overview": "",
  "popularity": 0.0,
  "poster_path": null,
  "production_companies": [ 
 * 
 */
export const nowPlayingMovieData = API => {
  return fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API}&language=ko`,
  );
};

export const krMovieData = API => {
  return fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API}&region=KR&language=ko`,
  );
};

export default movieData;
