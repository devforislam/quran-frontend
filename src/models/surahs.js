import * as Api from '../services/surah';
import {select} from 'redux-saga/effects';
import * as util from '../utils';

export default {

  namespace: 'surahs',

  state: {
    surahList: [],
    currentSurah: {
      audio_url: '',
      english_title: '',
      id: '',
      name: '',
      verses: [],
      all_verses: []
    },
    selectedLang: '',
    languageList: [],
    searchId : '',
    loading: false,
    isAudioPlaying: false,
    filtered: '2',
    isEnVisible: true
  },
  effects: {
    *fetchSurahs({ payload }, { call, put }) {  // eslint-disable-line
      const surahs = yield call(Api.fetchSurahs);
      yield put({ type: 'add', surahs: surahs.data});
    },
    *fetchSurah({ payload }, { call, put}) {  // eslint-disable-line
      yield put({ type: 'changeSelectedSurah', surahId: payload })
      yield put({ type: 'filterAyah', payload: '' })
      const data = {language: localStorage.getItem('language')};
      yield put({ type: 'toggleLoading'});
      const surah = yield call(Api.fetchSurah, {id: payload, data});
      yield put({ type: 'addSurah', surah: surah.data});
      yield put({ type: 'toggleLoading'});
    },
    *fetchLanguage({ payload }, { call, put}) {  // eslint-disable-line
      const language = yield call(Api.fetchLanguage, payload);
      yield put({ type: 'addLanguage', language: language.data});
    },
    *addTag({payload}, {call, put}) {
      const state = yield select();
      payload = {...payload, surahId: state.surahs.currentSurah.id };
      yield put({type: 'updateTag', payload});
      yield call(Api.addTag, payload);
    },
    *removeTag({payload}, {call, put}) {
      const state = yield select();
      payload = {...payload, surahId: state.surahs.currentSurah.id, type: 'remove' };
      yield put({type: 'updateTag', payload});
      yield call(Api.removeTag, payload);
    },
    *markAsFavorite({payload}, {call, put}) {
      yield put({type: 'setFavorite', payload});
      yield call(Api.markAsFavorite, payload);
    }
  },

  reducers: {
    add(state, payload) {
      return {...state, surahList: payload.surahs };
    },
    addSurah(state, payload) {
      let currentSurah = {...payload.surah, verses: payload.surah.verses, all_verses: payload.surah.verses};
      
      return {...state, currentSurah};
    },
    addLanguage(state, payload) {
      return {...state, languageList: payload.language || []}
    },
    setLanguage(state, {payload}) {
      return {...state, selectedLang: payload}
    },
    filterAyah(state, {payload}) {
      let filteredAyah = [ ...state.currentSurah.all_verses];
      let searchIds = payload
        .split(',')
        .map(item => {
          // If number then number e.i 1=> 1 or if range then array i.e 1-4 => [1, 2, 3, 4]
          item = item.trim();
          let items = item.split('-');
          if (items.length > 1) {
            return util.range(items[0], items[1]);
          }
          return parseInt(item, 10);
        });
      // array flat i.e [1, [2, 3], 6] => [1, 2, 3, 6]   
      searchIds = searchIds.reduce((acc, val) => acc.concat(val), []);
      if (payload && searchIds.length) {
         filteredAyah = filteredAyah.filter(item => {
           return searchIds.indexOf(parseInt(item.verse_id, 10)) >= 0 
           || searchIds.indexOf('' + item.verse_id)>=0
          });
      }
      const currentSurah = {...state.currentSurah, verses: filteredAyah};
      return {...state, currentSurah, filtered: payload};
    },
    setAudioStatus(state, {payload}) {
      const filteredAyah = state.currentSurah.verses
        .map(item => {
          if (item.audio_url === payload.audioUrl) {
            return {...item, audio_status: payload.status}
          }
          return item;
        });

      const currentSurah = {...state.currentSurah, verses: filteredAyah};
      return {...state, currentSurah};
    },
    updateTag(state, {payload}) {
      const filteredAyah = state.currentSurah.verses
        .map(item => {
          if (item.verse_id === payload.ayahId) {
            if (payload.type === 'remove') {
               let tags = item.tags.filter(tag => tag !== payload.name);
               return {...item, tags}
            } else if(item.tags.indexOf(payload.name) === -1) {
              let tags = [...item.tags, payload.name]
              return {...item, tags}
            }
          }
          return item;
        });

      const currentSurah = {...state.currentSurah, verses: filteredAyah};
      return {...state, currentSurah};
    },
    toggleLoading(state) {
      return {...state, loading: !state.loading};
    },
    toggleIsAudioPlaying(state) {
      return {...state, isAudioPlaying: !state.isAudioPlaying};
    },
    setFavorite(state, {payload}) {
      const favorite = (ayah) => {
        if (ayah.verse_id == payload.verse_id && ayah.surah_id == payload.chapter_id) {
          ayah = {...ayah, is_favorite: ! ayah.is_favorite};
        }
        return ayah;
      };
      const allAyahs = state.currentSurah.all_verses.map(favorite);
      const filteredAyah = state.currentSurah.verses.map(favorite);
      const currentSurah = {...state.currentSurah, verses: filteredAyah, all_verses: allAyahs};
      
      return {...state, currentSurah};
    },
    changeSelectedSurah(state, {surahId}) {
      const currentSurah = {...state.currentSurah, id: surahId};

      return {...state, currentSurah}
    },
    setEnVisibility(state, {payload: isVisible}) {
      return {...state, isEnVisible: isVisible}
    }
  },

  subscriptions: {
    setup({ history, dispatch }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({ type: 'fetchSurahs' });
          dispatch({ type: 'fetchSurah',  payload: 1 });
          dispatch({ type: 'fetchLanguage' });
        }
      });
    },
  },
};
