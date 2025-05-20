import { makeAutoObservable } from "mobx";

class BasketStore {
  _products = [];

  constructor() {
    makeAutoObservable(this);
  }

  get products() {
    return this._products || [];
  }

  get count() {
    return this._products && Array.isArray(this._products)
      ? this._products.length
      : 0;
  }

  get sum() {
    return this._products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  }

  set products(products) {
    this._products = products || [];
  }
}

export default BasketStore;
