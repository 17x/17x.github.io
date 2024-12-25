import typeCheck from 'utils/typeCheck';

export default (hex) => {
    if (hex.length !== 6) return 'Hex color must be six hex numbers in length.';

    hex = hex.toUpperCase();
    let splitHex = hex.split(''),
        resultHex = '',
        simpleHex = 'FEDCBA9876'.split(''),
        complexHex = {
            A: '5',
            B: '4',
            C: '3',
            D: '2',
            E: '1',
            F: '0'
        };

    splitHex.map(val => {
        if (typeCheck(val) === 'Number') {
            resultHex += simpleHex[val];
        } else if (complexHex[val]) {
            resultHex += complexHex[val];
        } else {
            return 'Hex colors must only include hex numbers 0-9, and A-F';
        }
    });

    return resultHex;
}
