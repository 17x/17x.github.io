import React, {Component} from 'react'

const wrapStyle = {position: 'fixed', top: 0, left: 0, height: '100%', width: '100%'}
const backdropStyle = {...wrapStyle, background: 'rgba(0,0,0,.5)'}
const contentStyle = {
  position: 'absolute',
  top: '3%',
  left: '3%',
  height: '94%',
  width: '94%',
  background: '#fff',
  overflowY: 'auto',
  padding: '30px 20px 20px 20px',
  boxSizing: 'border-box',
  borderRadius: '5px'
}
const closeStyle = {
  position: 'absolute',
  top: '3%',
  right: '3%',
  height: 30,
  lineHeight: '26px',
  width: 30,
  textAlign: 'center',
  fontSize: '25px',
  zIndex: 1
}

const lockScroll = () => {}
const restoreScroll = () => {}

const CreateHtmlblock = ({str, style}) => {
  return <p dangerouslySetInnerHTML={{__html: str}} style={style}></p>
}

class Modal extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    showModal: false,
    currentData: null
  }

  componentDidMount() {
    // forbidden scroll
  }

  render() {
    const {closeModal, children} = this.props
    return <div className={'model-wrap'} style={wrapStyle}>
      <div className="backdrop" style={backdropStyle}></div>
      <div onClick={closeModal} className="model-close" style={closeStyle}>&times;</div>
      <div className="model-content" style={contentStyle}>
        {children}
      </div>
    </div>
  }
}

export default Modal