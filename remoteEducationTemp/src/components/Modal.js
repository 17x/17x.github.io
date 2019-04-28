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
  padding: '20px',
  boxSizing: 'border-box',
  borderRadius: '5px'
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
    console.log(this.props.data)
    /**
     * @ date 2019-04-28
     * @ author Yahone
     * @ title 标题
     * @ content 内容
     * @ dynasty 朝代
     * @ author 作者
     * @ translate 译文
     * @ shangxi 赏析
     * @ authorProfile 作者资料
     */
    let {
          title,
          content,
          dynasty,
          author,
          translate,
          shangxi,
          authorProfile
        } = this.props.data

    content = content.replace('\n', '<br/>')
    translate = translate.replace('\n', '<br/>')
    shangxi = shangxi.replace('\n', '<br/>')

    return <div className={'model-wrap'} style={wrapStyle}>
      <div className="backdrop" style={backdropStyle}></div>

      <div className="model-content" style={contentStyle}>
        {/*title s*/}
        <h2 style={{textAlign: 'center'}}>{title}-
          <small>{dynasty}·{author}</small>
        </h2>
        <CreateHtmlblock str={content} style={{textAlign: 'center'}} />
        <h3>译文</h3>
        <CreateHtmlblock str={translate} />
        <h3>赏析</h3>
        <CreateHtmlblock str={shangxi} />
      </div>
    </div>
  }
}

export default Modal