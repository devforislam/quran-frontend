/**
 * title: Read Quran|DevForIslam
 */

import React from 'react';
import { connect } from 'dva';
import AyahList from '../components/AyahList';
import { Select, Row, Col, Input, Badge, BackTop, Switch} from 'antd';
import AudioPlayer from '../components/AudioPlayer';

const Option = Select.Option;

const Surahs = ({ dispatch, surahList, currentSurah, languageList, selectedLang, loading, isAudioPlaying, isEnVisible, filtered, isMobile, ...restProps}) => {
 
  function handleSurahChange(value) {
    dispatch({
      type: 'surahs/fetchSurah',
      payload: value,
    });
  }

  function handleLanguageChange(value) {
    localStorage.setItem('language', value);
    dispatch({
      type: 'surahs/setLanguage',
      payload: value,
    });

    dispatch({
      type: 'surahs/fetchSurah',
      payload: currentSurah.id,
    });
  }

  function getLanguage() {
    let value = localStorage.getItem('language');
    dispatch({
      type: 'surahs/setLanguage',
      payload: value,
    });

    return value || '';
  }

  function onChangeEn(isEnable) {
    dispatch({
      type: 'surahs/setEnVisibility',
      payload: isEnable,
    });
  }
  
  function onSearch(value) {
    dispatch({
      type: 'surahs/filterAyah',
      payload: value,
    });
  }

  function addTag(name, ayahId) {
    dispatch({
      type: 'surahs/addTag',
      payload: {ayahId, name},
    });
  }

  function removeTag(name, ayahId) {
    dispatch({
      type: 'surahs/removeTag',
      payload: {ayahId, name},
    });
  }

  function onFilter(input, option) {
    return option.props.children.find((item) => ('' + item).toLowerCase().indexOf(input.toLowerCase()) >= 0);
  }

  function setAudioStatus(audioUrl, status) {
    dispatch({
      type: 'surahs/setAudioStatus',
      payload: {audioUrl, status},
    });
    // console.log(verses);
  }

  function markAsFavorite(surahId, verseId) {
    dispatch({
      type: 'surahs/markAsFavorite',
      payload: {chapter_id: surahId, verse_id: verseId},
    });
  }
  let searchId = '';
  const onInputChange = (e) => {
    searchId = e.target.value;
    onSearch(searchId);
  }; 
  console.log('Others props', restProps);
  return (
    <div style={{
      // margin: -24
      }}>
       <BackTop />
      <Row style={{
            // margin: -24,
            padding: isMobile ? '15px 10px' : 24,
            backgroundColor: '#d48806',
            // borderRadius: '0 0 26px 26px',
            border: '0px solid',
            }}>
        <Col className="gutter-row" style={{padding: 5}} md={6} sm={24} xs={24}>
          <div className="gutter-box">
            <Select 
              showSearch
              defaultValue="Select Surah"
              value={currentSurah.id} 
              style={{ width: '100%' }} onChange={handleSurahChange}
              filterOption={onFilter}
              suffix="sr"
              >
              {surahList && surahList.map((item) => (<Option key={item.id} value={item.id}> {(''+item.id).padStart(3,'0')}. {item.name}</Option>))}
            </Select>
          </div>
        </Col>
        <Col className="gutter-row" style={{padding: 5}} md={6} sm={24} xs={24}>
          <div className="gutter-box">
            <Input
              placeholder="Ayah 1-3, 5, 10-15"
              // onSearch={value => onSearch(value)}
              onChange={onInputChange}
              style= {{width: '100%' }}
              value={filtered}
              suffix={<Badge count={currentSurah.verses.length} overflowCount={999} style={{ backgroundColor: '#fff', color: 'rgba(27, 27, 27, 0.62)', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
              />}
            />
            </div>
        </Col>

        <Col className="gutter-row" style={{padding: 5}} md={6} sm={24} xs={24}>
          <AudioPlayer srcFiles={currentSurah.verses.map(item => item.audio_url)} setAudioStatus={setAudioStatus}></AudioPlayer>
        </Col>


        <Col className="gutter-row" style={{padding: 5}} md={1} sm={6} xs={6}>
          <Switch style={{marginRight: 5}} checkedChildren="en" unCheckedChildren="en" defaultChecked onChange= {onChangeEn} />

          </Col>
        <Col className="gutter-row" style={{padding: 5}} md={5} sm={18} xs={18}>
          <Select 
            showSearch
            value={getLanguage()}
            style={{ width: '100%' }} 
            onChange={handleLanguageChange}
            >
            <Option value="">Select Language</Option>
            {languageList.map((item) => (<Option key={item.code} value={item.code}>{item.name}</Option>))}
          </Select>
    
        </Col>     
             
      </Row>
      <div style={{padding: isMobile ? '15px 10px' : 24}} effect='fade'>
        <AyahList verses={currentSurah.verses} 
          selectedLang={selectedLang}
          isEnVisible={isEnVisible}
          onSearch={onSearch} 
          addTag={addTag} 
          removeTag={removeTag}
          loading={loading}
          markAsFavorite={markAsFavorite}
        />
      </div>

</div>
  );
};

// export default surahs;
export default connect(({ surahs, global }) => ({...surahs, ...global}))(Surahs);