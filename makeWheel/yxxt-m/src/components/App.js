import React, {Component} from 'react';
import axios from 'axios';
import qs from 'qs';
import Slider from './global/Slider';

class App extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        viewportList: [],
        footList: []
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

    componentDidMount() {
        axios.get('./mock/index.json')
            .then(resp => {
                let {viewportList, footList} = resp.data;
                footList = footList.map(val => ({...val, showSub: false}));

                this.setState({
                    viewportList,
                    footList
                });
            });
        /*  axios.post(
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
              });*/
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

        console.log(viewportList);
        return <div id='container'>
            <div id="content">
                {
                    viewportList.map((val, index) => {
                            switch (val.modelType) {
                                case 'square':
                                case 'rectangle':
                                    return <a className="content-item"
                                              key={index}
                                              href={val.url ? val.url : undefined}
                                              style={
                                                  {
                                                      ...val.style
                                                  }
                                              }>
                                        <img style={{width: '100%', height: val.subImgStretch ? '100%' : 'auto'}}
                                             src={val.subImg} alt="" />
                                        <p style={contentItemText}>{val.text}</p>
                                    </a>;
                                case 'carousel':
                                    return <div key={index} style={{...val.style}}>
                                        <Slider slide={val.carousel} />
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
                                            <a className="content-sub-item"
                                               key={subIndex}
                                               href={subVal.url && subVal.url.trim() !== '' ? subVal.url : undefined}>
                                                {subVal.text}
                                            </a>
                                        </li>)
                                    }
                                </ul>
                            }
                        </div>
                    )
                }
            </div>
        </div>;
    }
}

export default App;