import React, {Component} from 'react'
import axios from 'Axios'
import Modal from './components/Modal'
import Article from './components/Article'
import {poem, word} from './datas'

const liStyle = {
  listStyle: 'none'
}

class App extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    showModal: false,
    currentData: null
  }

  componentDidMount() {
    // 建立事件

  }

  getData = (pOrw, id) => {
    axios(`datas/data/${pOrw}-${id}.json`)
      .then(resp => {
        if (resp.status !== 200) return

        this.setState({
          showModal: true,
          articleData: resp.data
        })
      })
  }

  /**
   * @ date 2019-04-28
   * @ author Yahone
   * @ id : id
   * @ pOrW : poem or word
   */
  handleClick = (e, id, pOrW) => {
    // console.log(e, id, pOrW)
    // e.preventDefault()
    window.history.pushState({param: pOrW + id}, pOrW + id, '?param=' + pOrW + id)
    this.getData(pOrW, id)
  }

  handleCloseModal = () => {
    this.setState((preState) => ({
      showModal: !preState.showModal
    }))
  }

  render() {
    const {showModal, currentData, articleData} = this.state
    return <div>
      <h1>古诗词赏析</h1>
      <ul>
        {
          poem.map((val, index) => (
            <li key={index} style={liStyle}>
              <a onClick={(e) => this.handleClick(e, val.id, 'p')}>{val.name}</a>
            </li>
          ))
        }
      </ul>

      <h1>古文赏析</h1>
      <ul>
        {
          word.map((val, index) => (
            <li key={index} style={liStyle}>
              <a onClick={(e) => this.handleClick(e, val.id, 'w')}>{val.name}</a>
            </li>
          ))
        }
      </ul>

      <p>备注:要求掌握以上古诗词的具体含义、诗词作者、作者所在的朝代、诗词含义中的主
        要人物、背景及其典故。</p>

      {
        showModal &&
        articleData &&
        <Modal showModal={showModal}
               closeModal={this.handleCloseModal}
               data={currentData}>
          <Article data={articleData} />
        </Modal>}
    </div>
  }
}

export default App