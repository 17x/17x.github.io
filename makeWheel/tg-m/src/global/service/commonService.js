class UniqueIdService {
    static ID = 0;
    static set() {
        return UniqueIdService.ID += 1;
    };
}

export {UniqueIdService};