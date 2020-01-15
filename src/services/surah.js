import {url, request} from '../utils/request';

export function fetchSurahs() {
  console.log('url', url);
  return request(url + '/surah/all');
}

export function fetchSurah(payload) {
  let params = '';
  for (let key in payload.data) {
    params += (params ? '&': '?') + `${key}=${payload.data[key]}`  
  }
  return request(url + '/surah/' + payload.id + params);
}

export function fetchLanguage() {
  console.log('url', url);

  return request(url + '/language');
}

export function addTag(payload) {
  const options = {
    method: 'POST',
    body:JSON.stringify({
      name: payload.name,
      item: {
        category: 'quran',
        surah: payload.surahId,
        ayah: payload.ayahId
      }
    })
  };

  return request(`${url}/tag-item`, options);
}

export function removeTag(payload) {
  const options = {
    method: 'POST',
    body:JSON.stringify({
      name: payload.name,
      item: {
        category: 'quran',
        surah: payload.surahId,
        ayah: payload.ayahId
      }
    })
  };

  return request(`${url}/untag-item`, options);
}

export function markAsFavorite(payload) {
  const options = { 
    'method': 'POST',
    body: JSON.stringify({
      item: {
        category: 'quran',
        surah: payload.chapter_id,
        ayah: payload.verse_id
      }
    })
  };

  return request(url + '/favorites', options);
}

export function favorites(payload) {
  return request(url + '/favorites?language=' + payload.language);
}

