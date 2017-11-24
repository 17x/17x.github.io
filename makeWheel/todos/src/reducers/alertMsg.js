export const altMsg = (msg = 'no msg', action) => {
    //console.log('altMsg',msg,action);
    switch (action.type) {
        case 'ALERT':
            return 'your message is ' + action.msg;
        default:
            return msg;
    }
};