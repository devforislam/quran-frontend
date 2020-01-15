
import styles from './favorites.css';
import React from 'react';
import { connect } from 'dva';
import AyahList from '../components/AyahList';
import { Select, Row, Col} from 'antd';
import Layout from '../components/Layouts/Layouts';
import AudioPlayer from '../components/AudioPlayer';

const Option = Select.Option;

const Favorits = ({ 
  dispatch, 
  items, 
  language: selectedLang, 
  loading, 
  isAudioPlaying
}) => {
 
  function onSearch(value) {
    dispatch({
      type: 'favorites/fetchFavorites',
    });
  }

  function addTag(name, ayahId, surahId) {
    dispatch({
      type: 'favorites/addTag',
      payload: {ayahId, surahId, name},
    });
  }

  function removeTag(name, ayahId, surahId) {
    dispatch({
      type: 'favorites/removeTag',
      payload: {ayahId, surahId, name},
    });
  }

  function setAudioStatus(audioUrl, status) {
   /*  dispatch({
      type: 'surahs/setAudioStatus',
      payload: {audioUrl, status},
    }); */
    // console.log(verses);
  }

  function markAsFavorite(surahId, verseId) {
    dispatch({
      type: 'favorites/markAsFavorite',
      payload: {chapter_id: surahId, verse_id: verseId},
    });
  }
  console.log('items.......', items);

  return (
    <div>
      <Row type="flex" justify="center">         
        <Col className="gutter-row" span={6}>
         <h1>
          <AudioPlayer srcFiles={items.map(item => item.audio_url)} setAudioStatus={setAudioStatus}></AudioPlayer>
          </h1>
        </Col>        
      </Row>
      
      {/* {currentSurah.name && <h2 style={{textAlign: 'center'}}> Surah {currentSurah.name}</h2>} */}
      
      <AyahList verses={items} 
        selectedLang={selectedLang} 
        // onSearch={onSearch} 
        addTag={addTag} 
        removeTag={removeTag}
        loading={loading}
        markAsFavorite={markAsFavorite}
      />
    </div>
  );
};

// export default surahs;
export default connect(({ favorites }) => ({...favorites}))(Favorits);