function canUseLocalStorage() {
    return typeof(Storage) !== 'undefined';
}

export function updateLocalStorageInfo(key: string, value: string) {
    if (canUseLocalStorage()) {
        localStorage.setItem(key, value);
    }
    return null;
}

export function getLocalStorageInfo(key: string) {
    if (canUseLocalStorage()) {
        return localStorage.getItem(key);
    }
    return null;
}