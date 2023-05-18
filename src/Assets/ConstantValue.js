import {
  dailypopularMovieData,
  krMovieData,
  nowPlayingMovieData,
  popularMovieData,
  weeklypopularMovieData,
} from '../API/movie';

export const TEXT_LENGTH_LIMIT = 12;
export const STORY_LENGTH_LIMIT = 80;
export const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const CATEGORY = {
  'TOP 10': { func: popularMovieData(API_KEY), title: '인기' },
  주간: { func: weeklypopularMovieData(API_KEY), title: '인기' },
  일간: { func: dailypopularMovieData(API_KEY), title: '인기' },
  '상영 중인': { func: nowPlayingMovieData(API_KEY), title: '' },
  한국: { func: krMovieData(API_KEY), title: '에서 인기있는' },
};
