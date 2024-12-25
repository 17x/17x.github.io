import React, {Component} from 'react';
import axios from 'axios';
import qs from 'qs';
import LazyLoad from './global/Lazyload';

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
                qs.stringify({id})
            ).then(resp => {
                this.setState({
                    richTextPageData: resp.data.ok ? resp.data.object : {detail: resp.data.value, title: ' '}
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
        /* axios.get('./mock/index.json')
             .then(resp => {
                 let {viewportList, footList} = resp.data,
                     newViewport = [...viewportList];

                 footList = footList.map(val => ({...val, showSub: false}));
                 this.setState({viewportList, footList});

                 newViewport.map((val, index) => {
                     val.modelType === 'productList' && axios.get('./mock/product.json')
                         .then(resp2 => {
                             // padding + half * ( height + margin )
                             let nHeight = 20 + parseInt(resp2.data.list.length / 2) * (210 + 5);
                             nHeight += val.title ? 30 : 0;
                             newViewport[index].style.height = nHeight;

                             newViewport[index].productList = resp2.data.list;
                             // console.log(newViewport);

                             this.setState({viewportList: newViewport});
                         });
                 });
             });*/

        //todo 发布使用这段
        axios.post(
            'updatePageHtmlString.html',
            qs.stringify({
                code: location.search.split('=')[1]
            })
        ).then(resp => {
            if (resp.data.ok) {
                let resultData = JSON.parse(resp.data.object.data),
                    {viewportList, footList} = resultData,
                    newViewport = [...viewportList];

                footList = footList.map(val => ({...val, showSub: false}));
                this.setState({viewportList, footList});

                //todo 模糊查找 等

                newViewport.map((val, index) => {
                    val.modelType === 'productList'
                    && axios.post('getProductList.html', qs.stringify({
                        'pageNumber': 1,
                        'pageSize': val.productCount,
                        'productQueryParam.title': '',
                        'productQueryParam.brandId': val.brandId,
                        'productQueryParam.shopBigLabelId': val.bigLabelId,
                        'productQueryParam.shopSmallLabelId': val.smallId,
                        'productQueryParam.miniTransactionPrice': val.miniTransactionPrice,
                        'productQueryParam.maxTransactionPrice': val.maxTransactionPrice
                    }))
                        .then(resp2 => {
                            // padding + half * ( height + margin )
                            let nHeight = 20 + Math.ceil(resp2.data.object.elements.length / 2) * (210 + 5);
                            nHeight += val.title ? 30 : 0;
                            newViewport[index].style.height = nHeight;

                            newViewport[index].productList = resp2.data.object.elements;
                            // console.log(newViewport);

                            this.setState({viewportList: newViewport});
                        });
                });
            }
        });

        //初始化分享
        axios.post('getPageShareConfig.html').then(resp => {
            console.log(resp);
            if (resp.data.ok) {

                let param = {
                    // callback: 'onWeixinShareSuccess',
                    content: resp.data.object.shareDescribe,
                    title: resp.data.object.shareTitle,
                    imagePath: resp.data.object.logo,
                    clickUrl: resp.data.object.shareUrl,
                    showHelpImg: false
                };

                /* 在微信内 */
                if (window.navigator.appVersion.toLowerCase().indexOf('micromessenger') >= 0) {
                    Native.nativeWeixinShareWebPageFriend(param);

                    setTimeout(() => {
                        Native.nativeWeixinShareWebPage(param);
                    }, 1500);
                }
            }
        });
    }

    componentWillUnmount() {
        // window.onpopstate = null;
    }

    render() {
        const {viewportList, footList} = this.state,
            productHref = location.origin + '/pages/m/index.htm#/detail?id=',
            textFieldStyle = {
                wordWrap: 'break-Word',
                wordBreak: 'break-all'
            },
            footItemWidth = {
                width: footList.length > 0 ? (100 / footList.length) + '%' : '100%'
            },
            CommonContentItem = ({val}) =>
                <a className="content-item"
                   onClick={() => {val.isRichTextPage ? this.handleRichTextPage('show', val.richPageId) : null;}}
                   href={
                       (val.url && !val.isRichTextPage)
                           ? ((/^\d{10}\d$|^\d{2,4}-\d+/).test(val.url) ? 'tel:' + val.url : val.url)
                           : undefined
                   }
                   style={
                       val.modelType === 'textField'
                           ? {
                               ...val.style,
                               ...textFieldStyle,
                               lineHeight: val.style.lineHeight ? val.style.lineHeight.toString() + 'px' : 'normal',
                               fontSize: val.style.fontSize + 'em'
                           }
                           : {...val.style}
                   }>
                    {
                        val.modelType === 'textField'
                            ? <p>{val.text}</p>
                            : <img src={val.subImg}
                                   alt=""
                                   style={{
                                       width: '100%',
                                       height: val.subImgStretch ? '100%' : 'auto'
                                   }} />
                    }
                </a>;

        return <div id='container'>
            <div id="content" ref={dom => this.lazyLoadContainerRef = dom}>
                {
                    viewportList.map((val, index) => {
                            val.style.cursor = 'default';
                            switch (val.modelType) {
                                case 'square':
                                case 'rectangle':
                                case 'textField':
                                    return <CommonContentItem key={index} val={val} />;
                                case 'carousel':
                                    return <div key={index} style={{...val.style}}>
                                        <Slider slide={val.carousel}
                                                clickEvent={(id) => this.handleRichTextPage('show', id)} />
                                    </div>;
                                case 'productList':
                                    return <div key={index}
                                                className='product_list-wrap'
                                                style={{
                                                    ...val.style,
                                                    width: '100%',
                                                    left: 0
                                                }}>
                                        {val.title && <p>{val.title}</p>}
                                        {
                                            this.lazyLoadContainerRef && val.productList && val.productList.length > 0 && val.productList.map((val, index) =>
                                                <a key={index}
                                                   href={productHref + val.id}
                                                   className='product_list-item'>
                                                    <LazyLoad container={this.lazyLoadContainerRef}
                                                              children={<img src={val.mainMedia} alt="" />} />
                                                    <p className="product_list-item-title textEllipsis ">{val.title}</p>
                                                    <p className="product_list-item-subTitle textEllipsis">{val.subTitle}</p>
                                                    <p className="product_list-item-price">
                                                        ¥{val.transactionPrice}
                                                        <small
                                                            className="subFontColor lineThrough">¥{val.lineationPrice}</small>
                                                    </p>
                                                </a>
                                            )
                                        }
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
                             className="foot-item"
                             style={footItemWidth}>
                            {
                                val.isRichTextPage
                                    ? <div>
                                        <a className={val.icon ? 'foot-item-hasIcon' : ''}
                                           onClick={() => {this.handleRichTextPage('show', val.richPageId);}}>
                                            {val.icon && <img src={val.icon} className='foot-item-level1-icon' alt="" />}
                                            <p>{val.text}</p>
                                        </a>
                                    </div>
                                    : <div>
                                        <a onClick={() => this.handleShowSub(index)}
                                           className={val.icon ? 'foot-item-hasIcon' : ''}
                                           href={
                                               val.url && val.url.trim() !== '' && val.sub.length <= 0 ? val.url : undefined
                                           }>
                                            {val.icon && <img src={val.icon} className='foot-item-level1-icon' alt="" />}
                                            <p>{val.text}</p>
                                        </a>
                                        {
                                            val.sub && val.sub.length > 0 && <span className='hasSubItem'></span>
                                        }
                                        {
                                            val.sub && val.sub.length > 0 &&
                                            <ul style={{display: val.showSub ? 'block' : 'none'}}>
                                                {
                                                    val.sub.map((subVal, subIndex) => <li key={subIndex}>
                                                        {
                                                            subVal.isRichTextPage
                                                                ? <a className="content-sub-item"
                                                                     key={subIndex}
                                                                     onClick={() => this.handleRichTextPage('show', subVal.richPageId)}>
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
                                        {
                                            val.showSub &&
                                            <div className='foot-subs-backdrop'
                                                 onClick={() => this.handleShowSub(null)}></div>
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