import React from 'react';
import {Howl, Howler} from 'howler';
import {Icon, Slider, Row, Col} from 'antd';
import styles from './AudioPlayer.less';

class AudioPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAudioPlaying: false,
            audioStartFrom: 0,
            audioFiles: [],
            isPlaying: false,
            volume: 50,
        };
    }

    componentDidMount() {
        this.loadAudioFiles();
    };

    componentDidUpdate(prevProps) {
        if (
            this.props.srcFiles.length !== prevProps.srcFiles.length ||
            this.props.srcFiles[0] !== prevProps.srcFiles[0]
        ) {
            this.setState({isPlaying: false, audioStartFrom: 0});
            Howler.unload(); 
        }
    };

    play = () => {            
        this.setState({isPlaying: !this.state.isPlaying});
        Howler.unload();  
        this.setVolume();      
        this.loadAudioFiles();
        const {setAudioStatus} = this.props;
        setTimeout(() => {

        const {audioFiles, audioStartFrom, isPlaying} = this.state;

            if(audioFiles.length <= audioStartFrom) {
                this.setStartFrom(0);
            }
            if (isPlaying) {
                setAudioStatus(audioFiles[audioStartFrom]._src, 'playing');
                audioFiles[audioStartFrom].play();
                this.setStartFrom(audioStartFrom + 1);
            } else {
                let temp = audioStartFrom - 1;
                this.setStartFrom((temp >= 0 ? temp : 0));
            }
        }, 10)
    };

    setStartFrom = (index) => {
        this.setState({audioStartFrom: index})
    };

    playNext = () => {
        const {audioFiles, audioStartFrom} = this.state;
        const {setAudioStatus} = this.props;

        if (audioStartFrom > 0) {
            setAudioStatus(audioFiles[audioStartFrom - 1]._src, 'played');
        }

        if (!audioFiles || audioFiles.length <= audioStartFrom) {
            this.setState({audioStartFrom: 0 , isPlaying: false});
            return;
        }

        audioFiles[audioStartFrom].play();
    
        setAudioStatus(audioFiles[audioStartFrom]._src, 'playing')
        this.setStartFrom(audioStartFrom + 1);
      };
        
    loadAudioFiles = () => {
        let audioFiles = this.props.srcFiles.map(item =>  new Howl({
            src: item,
            html5: true,
            onend: this.playNext 
        }));
        this.setState({audioFiles});
    };

    handleVolume = (volume) => {
        this.setState({ volume });
        Howler.volume(volume/100);
    }
    
    setVolume = ()=> {
        Howler.volume(this.state.volume/100);
    }

    render() {
        const {isPlaying} = this.state;
        return (
            <div>
                <Row>
                    <Col className="gutter-row" span={6}>                  
                        <div className="play-wrapper" style={{fontSize: 25}}>
                            {!isPlaying && <Icon onClick={this.play} type="play-circle"></Icon>}
                            {isPlaying && <Icon onClick={this.play} type="pause-circle"></Icon>}
                        </div>
                    </Col>
                    <Col className="gutter-row" span={18}>
                        <div className={styles.soundWrapper}>
                            <Icon className={styles.soundIcon} type="sound" />
                            <Slider {...this.props} onChange={this.handleVolume} value={this.state.volume} />
                        </div>
                    </Col>
                </Row>                
            </div>
        );
    }
}

export default AudioPlayer;