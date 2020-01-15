import * as Api from '../services/surah';
export default {

  namespace: 'favorites',

  state: {
    items: [],
    loading: false,
    language: localStorage.getItem('language')
  },
  effects: {
    *fetchFavorites({ payload }, {select, call, put }) {  // eslint-disable-line
      let language = yield select(({favorites}) => favorites.language);
      console.log(language);
      const favs = yield call(Api.favorites, {language});
      yield put({ type: 'toggleLoading'});
      console.log('favs raw data', favs);
      yield put({ type: 'add', items: favs.data});
      yield put({ type: 'toggleLoading'});
    },
    
    *markAsFavorite({payload}, {call, put}) {
      yield put({type: 'setFavorite', payload});
      yield call(Api.markAsFavorite, payload);
    },
    *addTag({payload}, {select, call, put}) {
      payload = {...payload, surahId: payload.surahId};
      yield put({type: 'updateTag', payload});
      yield call(Api.addTag, payload);
    },
    *removeTag({payload}, {select, call, put}) {
      payload = {...payload, type: 'remove' };
      yield put({type: 'updateTag', payload});
      yield call(Api.removeTag, payload);
    },
  },

  reducers: {
    add(state, payload) {
      console.log('fav items', payload)
      return {...state, ...payload};
    },

    setFavorite(state, {payload}) {
      const favorite = (item) => {
        if (item.verse_id == payload.verse_id && item.surah_id == payload.chapter_id) {
          item = {...item, is_favorite: ! item.is_favorite};
        }
        return item;
      };
      const items = state.items.map(favorite);
   
      return {...state, items};
    },

    toggleLoading(state) {
      return {...state, loading: !state.loading};
    },

    updateTag(state, {payload}) {
      const filteredAyah = state.items
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
      return {...state, items: filteredAyah};
    },
  },

  subscriptions: {
    setup({ history, dispatch }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname }) => {
        console.log('path name', pathname);
        if (pathname === '/favorites') {
          dispatch({ type: 'fetchFavorites' });
        }
      });
    },
  },
};
