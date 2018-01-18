import React, {Component} from 'react';
import axios from 'axios';
import qs from 'qs';
import Slider from './global/Slider';
import RichTextPage from './RichTextPage';

class App extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        viewportList: [],
        footList: [],
        richTextPageData: null
    };

    handleShowSub(i) {
        let footList = this.state.footList.slice();

        footList = footList.map((val, index) => {
            return {
                ...val,
                showSub: (index === i && val.showSub === false)
            };
        });

        this.setState({footList});
    }

    //显示富文本页面
    handleRichTextPage(showHid, id) {
        if (showHid === 'show') {
            axios.post(
                'getDetailInfoById.html',
                qs.stringify({
                    id
                })
            ).then(resp => {
                this.setState({
                    richTextPageData: resp.data.ok ? resp.data.object : {detail:resp.data.value,title:' '}
                });
            });
        } else {
            this.setState({
                richTextPageData: null
            });
        }
    }

    componentDidMount() {
        //todo 发布注释这段
      /*  axios.get('./mock/index.json')
            .then(resp => {
                let {viewportList, footList} = resp.data;
                footList = footList.map(val => ({...val, showSub: false}));

                this.setState({
                    viewportList,
                    footList
                });
            });
*/
        //todo 发布使用这段
          axios.post(
              'updatePageHtmlString.html', qs.stringify({
                  code: location.search.split('=')[1]
              }))
              .then(resp => {
                  if (resp.data.ok) {
                      const resultData = JSON.parse(resp.data.object.data);

                      this.setState({
                          viewportList: resultData.viewportList,
                          footList: resultData.footList
                      });
                  }
              });
    }

    componentWillUnmount() {
        window.onpopstate = null;
    }

    render() {
        const {viewportList, footList} = this.state,
            contentItemText = {
                width: '100%',
                height: 25,
                lineHeight: '25px',
                textAlign: 'center',
                fontSize: 15
            },
            footItemWidth = {
                width: footList.length > 0 ? (100 / footList.length) + '%' : '100%'
            };

        //console.log(viewportList);
        return <div id='container'>
            <div id="content">
                {
                    viewportList.map((val, index) => {
                            switch (val.modelType) {
                                case 'square':
                                case 'rectangle':
                                    if (val.isRichTextPage) {
                                        return <a className="content-item"
                                                  key={index}
                                                  onClick={() => {this.handleRichTextPage('show', val.richPageId);}}
                                                  style={
                                                      {
                                                          ...val.style
                                                      }
                                                  }>
                                            <img style={{width: '100%', height: val.subImgStretch ? '100%' : 'auto'}}
                                                 src={val.subImg} alt="" />
                                            <p style={contentItemText}>{val.text}</p>
                                        </a>;
                                    } else {
                                        return <a className="content-item"
                                                  key={index}
                                                  href={val.url ? val.url : undefined}
                                                  // onClick={() => {this.handleRichTextPage('show', val.url);}}
                                                  style={
                                                      {
                                                          ...val.style
                                                      }
                                                  }>
                                            <img style={{width: '100%', height: val.subImgStretch ? '100%' : 'auto'}}
                                                 src={val.subImg} alt="" />
                                            <p style={contentItemText}>{val.text}</p>
                                        </a>;
                                    }
                                case 'carousel':
                                    return <div key={index} style={{...val.style}}>
                                        <Slider slide={val.carousel} clickEvent={(id)=>this.handleRichTextPage('show',id)}/>
                                    </div>;
                                default:
                                    return null;
                            }
                        }
                    )
                }
            </div>
            <div id="footer">
                {
                    footList.map((val, index) =>
                        <div key={index}
                             className="content-item"
                             style={footItemWidth}>
                            {
                                val.isRichTextPage
                                    ? <div>
                                        <a onClick={() => {this.handleRichTextPage('show', val.richPageId);}}>
                                            {val.text}
                                        </a>
                                    </div>
                                    : <div>
                                        <a onClick={() => this.handleShowSub(index)}
                                           href={
                                               val.url && val.url.trim() !== '' && val.sub.length <= 0 ? val.url : undefined
                                           }>
                                            {val.text}
                                        </a>
                                        {
                                            val.sub && val.sub.length > 0 &&
                                            <ul style={{display: val.showSub ? 'block' : 'none'}}>
                                                {
                                                    val.sub.map((subVal, subIndex) => <li key={subIndex}>
                                                        {
                                                            subVal.isRichTextPage
                                                                ? <a className="content-sub-item"
                                                                     key={subIndex}
                                                                     onClick={() => this.handleRichTextPage('show', subVal.url)}>
                                                                    {subVal.text}
                                                                </a>
                                                                : <a className="content-sub-item"
                                                                     key={subIndex}
                                                                     href={subVal.url && subVal.url.trim() !== '' ? subVal.url : undefined}>
                                                                    {subVal.text}
                                                                </a>
                                                        }
                                                    </li>)
                                                }
                                            </ul>
                                        }
                                    </div>}
                        </div>
                    )
                }
            </div>
            {this.state.richTextPageData &&
            <RichTextPage data={this.state.richTextPageData} onHide={() => this.handleRichTextPage('hide')} />}
        </div>;
    }
}

export default App;