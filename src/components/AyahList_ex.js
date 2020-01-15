import React from 'react';
import PropTypes from 'prop-types';
import {Table, Input, Tooltip, Icon, List, Badge} from 'antd';
import styles from './AyahList.less';
import AyaTags from './YahTags';
import {AuthConsumer} from 'react-check-auth';

const AyahList = ({
  onSearch: searchById, 
  addTag,
  removeTag, 
  verses, 
  selectedLang, 
  loading,
  markAsFavorite
}) => {
  let searchId = '';

  const onInputChange = (e) => {
    searchId = e.target.value;
    searchById(searchId);
  }; 
  
  const columns = [{
      title: '#',
      dataIndex: 'verse_id',
      render: (text, record) => {
        return (
          <div>
            <AuthConsumer>
              {({userInfo, isLoding}) => {
                if (!userInfo && !isLoding) {
                  return '';
                }
                return (
                  <Tooltip placement="bottom" title={record.is_favorite ? 'Undo Favorite' : 'Favorit'}>
                    <span onClick={() => markAsFavorite(record.surah_id, record.verse_id)} style={{cursor: 'pointer', color: record.is_favorite ? '#1890ff': 'gray', paddingRight: '10px'}}>
                      <Icon type="book"/>
                    </span> 
                  </Tooltip>
                );
              }}
            </AuthConsumer>    
            <Tooltip placement="bottom" title={record.meta}>
              {record.verse_id}
            </Tooltip>
          </div>
        );
      },
      width: 120,
      filterDropdown: (
        <div className={styles.customFilterDropdown}>
          <Input.Search
            placeholder="1-3, 5, 10-15"
            onSearch={value => searchById(value)}
            onChange={onInputChange}
            style= {{width: 'auto'}}
          />
        </div>
      ),
      filterIcon: <Icon type="filter" style={{ color:  '#108ee9'  }} />,
    }, {
    title: <div><Badge count={verses.length} style={{ backgroundColor: '#52c41a', marginLeft: verses.length >9 ? '18px' : '10px' }} overflowCount={999}><span>Ayah</span></Badge></div>,
    render: (text, record) => {
     
      return (
        <div>
          <List >
            <List.Item className={styles.arabicText + ' ' +   styles[record.audio_status]} style={{border: 'none', paddingTop: 0}}>{record.ar}</List.Item>
            <List.Item style={{border: 'none', paddingTop: '5px'}}>{record.en}</List.Item>
            { 
              selectedLang && 
              <List.Item style={{border: 'none', paddingTop: 0, paddingBottom: '10px'}} className={(selectedLang === 'bn' ? styles.bengliText : '') + ' ' + styles.localText}>{record[selectedLang]}</List.Item> 
            }
          </List>
          <AyaTags ayahId={record.verse_id} chapterId={record.surah_id} tags={record.tags} addTag={addTag} removeTag={removeTag}></AyaTags>
        </div>
      );
    },
  }, {
    title: 'Audio',
    width: 200,
    className: styles.textTop,
    render: (text, record) => {
      return (
        <audio src={record.audio_url}  controls="controls" controlsList="nodownload"></audio>
      );
    },
  }];
  
  return (
    <Table
      rowKey={record => record.verse_id + record.surah_id}
      style={{overflow: 'scroll'}}
      dataSource={verses}
      columns={columns}
      loading={loading}
    />
  );
};

// AyahList.proptypes = {
//   onDelete: PropTypes.func.isRequired,
//   verses: PropTypes.array.isRequired,
//   selectedLang: PropTypes.string.isRequired
// };

export default AyahList;