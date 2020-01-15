import React from 'react';

import {Tag, Input, Tooltip, Icon } from 'antd';

class EditableTagGroup extends React.Component {
  state = {    
    inputVisible: false,
    inputValue: '',
  };

  handleClose = (removedTag) => {
    this.props.removeTag(removedTag, this.props.ayahId, this.props.chapterId);
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue.trim();

    if (inputValue) {
        this.props.addTag(inputValue, this.props.ayahId, this.props.chapterId);
    }

    this.setState({
        inputVisible: false,
        inputValue: '',
    });
  }

  saveInputRef = input => this.input = input

  render() {
    const {inputVisible, inputValue } = this.state;
    const tags  = this.props.tags || [];
    return (
      <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag color="orange" key={tag} closable={true} onClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </div>
    );
  }
}

export default EditableTagGroup;