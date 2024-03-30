
export const addDataToLocalStorage = (keyName, data) => {
  if(!localStorage.getItem(keyName)) {
    return localStorage.setItem(keyName, JSON.stringify(data));
  }
}

export const getDataFromLocalStorage = (keyName) => {
  return JSON.parse(localStorage.getItem(keyName));
}
