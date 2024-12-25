import axios from 'axios';

const handleBeforeBootstrapApp = bootApp => {
    const getCurrentTemplateType = () => axios.post('getPageInfoConfig.html'),
        bootstrapApplication = () => {
            if (window._CUSTOM_PAGE_INFO) {
                const themeColor = window._CUSTOM_PAGE_INFO.themeColor;
                //加载基准主题样式
                let newStyle = document.createElement('style'),
                    sStyleStr = `
                            .theme-color{color:${themeColor}}
                            .theme-color-active.active{color:${themeColor}}
                            .theme-color-active-span.active span{color:${themeColor}}
                            .theme-color-active-i.active i{color:${themeColor}}
                            .theme-bg-color{background-color:${themeColor}}
                            .theme-border-color{border-color:${themeColor}}
                            .theme-color-tab-head li.active{color:${themeColor}}
                            .theme-color-tab-head li.active span{color:${themeColor}}
                            .theme-color-tab-head li.active span::after{background-color:${themeColor}}
                            .theme-color-tab-head .tabIndicator .indicator{background-color:${themeColor}}
                            .theme-color-banner span.active{color:${themeColor}}
                        `;

                newStyle.innerText = sStyleStr.replace(/\n/g, '');
                document.head.appendChild(newStyle);
            }

            bootApp();
        },
        getMemberInfo = () => {
            /*获取用户数据*/
            axios.post('getMemberInfo.html')
                .then(resp => {
                    window._ISLOGIN = resp.data.id > 0;
                })
                .finally(() => {
                    bootstrapApplication();
                });
        };

    /*获取openid*/
    axios.post('hasOpenId.html')
        .then(resp => {
            /*没拿到 ID*/
            if (!resp.data) {
                window.location.href = 'getWeiXinOpenId.html?referer=' + location.href.replace('#', '?!placeholder').replace(/&from=.*/g, '');
            } else {
                /*拿到了iD*/
                // 判断占位字符
                if (location.href.indexOf('?!placeholder') >= 0) {
                    /*跳转至修复的的页面*/
                    window.location.href = location.href.replace('?!placeholder', '#').replace(/&from=.*/g, '');
                } else {
                    /*启动App*/
                    getCurrentTemplateType().then(resp => {
                        window._CUSTOM_PAGE_INFO = resp.data.object;
                        getMemberInfo();
                    });
                }
            }
        });
};

export default handleBeforeBootstrapApp;