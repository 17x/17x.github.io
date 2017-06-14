/*全局独立 ID Service*/
class UniqueIdService {
    constructor() {
        this.id = 0;
    }

    get(increase) {
        if (increase === 'increase') {
            this.id += 1;
            return this.id;
        } else {
            return this.id;
        }
    }
}

let instance = new UniqueIdService();
export default instance;