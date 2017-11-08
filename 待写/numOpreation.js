//js计算
const jsCalculate = (args) => {

    //传入一个array 返回将所有数组转化为整数的倍数 ( 此处使用Math.pow )
    const getMaxTime = arr => {
        let MaxTimes,
            tempArr = arr.map(val => {
                let sStr1 = val.toString().split('');
                let sStr2 = sStr1.indexOf('.');
                return sStr2 > 0 ? Math.pow(10, sStr1.length - sStr2 - 1) : 1;
            });

        //从数组中获取最大值，从而对所有数值进行扩大操作。
        // 由于babel的Math.max with ... 方法实现调用apply，
        // 最大长度受限 最大值为 125623 故弃用
        // 而reduce不受此限制
        MaxTimes = tempArr.reduce((a, b) => Math.max(a, b));

        return MaxTimes;
    }

    //乘
    if (args.type === 'times') {
        if (args.params.a === 0 || args.params.b === 0) {
            return 0;
        }

        let maxTime = getMaxTime([args.params.a, args.params.b]);

        return (
            // 部分浮点数乘以整数依然会有偏差
            // 使用parseInt去除多余的小数部分
            (args.params.a * maxTime).toFixed(0) * parseInt(args.params.b * maxTime)
        ) / (maxTime * maxTime);
    }

    //加
    if (args.type === 'add') {
        // 结果存储
        let resultInt = 0,
            MaxTimes = getMaxTime(args.params);

        //将所有数字按同一倍数扩大后保存
        args.params.map(val => resultInt += parseInt(val * MaxTimes));
        return resultInt / MaxTimes;
    }

};

const num1 = 2241.94;
const num2 = 1880.00;
const num3 = 450.45;
const num4 = 450.50;

let result1 = jsCalculate({
    type: 'add',
    params: [num1, num2, num3, num4]
});
console.log('result is ' + result1);

const baseNum = 0.3;
let result2 = jsCalculate({
    type: 'times',
    params: {
        a: baseNum,
        b: 3
    }
});
console.log('result is ' + result2);