import React from 'react';
import PropTypes from 'prop-types';
import {Avatar, Tooltip, Icon, List} from 'antd';
import styles from './AyahList.less';
import AyaTags from './YahTags';
import * as auth from '../services/auth';

const AyahList = ({
  onSearch: searchById, 
  addTag,
  removeTag, 
  verses, 
  selectedLang, 
  loading,
  markAsFavorite,
  isEnVisible,
  isMobile,
  ...restProps
}) => {
  let searchId = '';

  const onInputChange = (e) => {
    searchId = e.target.value;
    searchById(searchId);
  }; 

  return (
    <List
    itemLayout="vertical"
    size="small"
    // pagination={true}
    loading={loading}
            dataSource={verses}
            renderItem={item => (
              <List.Item key={item.verse_id} 
                style={{paddingTop: 15, marginBottom: 0}} 
                actions={[
                ]}
                extra={
                  <audio src={item.audio_url}  controls="controls" controlsList="nodownload" style={{height: isMobile ? '30px' : '40px' }}></audio>
                }
                >
                <List.Item.Meta style={{ paddingRight: 15, marginBottom: 0}}
                  avatar={
                    <Tooltip title={auth.check() ? `${item.is_favorite ? 'Undo favorite' : 'Mark as favorite'}` : ''}>
                      <Avatar style={{cursor: 'pointer', backgroundColor: item.is_favorite ? '#1890ff': 'gray'}} onClick={() => markAsFavorite(item.surah_id, item.verse_id)}>{item.verse_id}</Avatar>
                    </Tooltip>
                  }
                  title={<div className={styles.arabicText + ' ' +   styles[item.audio_status]} style={{textAlign: 'right'}}>{item.ar}</div>}
                  description={
                  <div>
                    <div className={isMobile ?styles.ayahLocalSectionMobile : styles.ayahLocalSection} >
                      {
                        isEnVisible &&
                        <div style={{paddingTop: 10}}>{item.en}</div>
                      }
                      {
                        selectedLang && 
                        <div style={{border: 'none', paddingTop: 4, paddingBottom: 8}} className={(selectedLang === 'bn' ? styles.bengliText : '') + ' ' + styles.localText}>{item[selectedLang]}</div> 
                      }
                    </div>

                    { isMobile &&
                      <AyaTags ayahId={item.verse_id} chapterId={item.surah_id} tags={item.tags} addTag={addTag} removeTag={removeTag}/>
                    }
                  </div>}
                />
                { !isMobile &&
                    <AyaTags ayahId={item.verse_id} chapterId={item.surah_id} tags={item.tags} addTag={addTag} removeTag={removeTag}/>
                  }
              </List.Item>
            )}>
          </List>
  );
};

// AyahList.proptypes = {
//   onDelete: PropTypes.func.isRequired,
//   verses: PropTypes.array.isRequired,
//   selectedLang: PropTypes.string.isRequired
// };

export default AyahList;