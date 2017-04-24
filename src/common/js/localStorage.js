/**
 * Created by chang on 17-4-24.
 */
/*
* window.localStorage.__seller__
* {
*   id: {
*     favorite: true
*   }
* }
* */
export function saveToLocal(id, key, value) {
  let seller = window.localStorage.__seller1__;
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  window.localStorage.__seller1__ = JSON.stringify(seller);
};

export function loadFromLocal(id, key, def) {
  let seller = window.localStorage.__seller1__;
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }
  let ret = seller[key];
  return ret || def;
};
