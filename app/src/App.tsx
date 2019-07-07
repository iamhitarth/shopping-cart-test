import * as React from 'react';
import './App.css';

const get = (url: string) => {
  return fetch(url).then(response => response.json())
}

const post = (url: string, data: any) => {
  return fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then(response => response.json())
}

type Product = {
  id: string;
  name: string;
  price: number;
}

type AppState = {
  products: Array<Product>;
  basket: Array<string>;
  isBasketShown: boolean;
  shippingCost: number;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = { products: [], basket: [], isBasketShown: false, shippingCost: 0 };
  }

  componentDidMount() {
    get('https://localhost:5001/api/products')
    .then(products => {
      this.setState({ products })
    })
  }

  fetchShippingCost = (productIds: Array<string>) => 
    post('https://localhost:5001/api/products/getShippingCost', productIds)
    .then(shippingCost => this.setShippingCost(shippingCost))

  addProduct = (productId: string) => {
    const { basket } = this.state
    if (!basket.includes(productId)) {
      this.setState({
        ...this.state,
        basket: [...basket, productId] 
      }, () => this.fetchShippingCost(this.state.basket))
    }
  }

  removeProduct = (productId: string) => {
    const { basket } = this.state
    if (basket.includes(productId)) {
      this.setState({
        ...this.state,
        basket: basket.filter(id => id !== productId)
      }, () => this.fetchShippingCost(this.state.basket))
    }
  }

  setShippingCost = (shippingCost: number) => {
    this.setState({
      ...this.state,
      shippingCost
    })
  }

  toggleBasket = () => {
    this.setState({
      ...this.state,
      isBasketShown: !this.state.isBasketShown
    })
  }

  renderProductsList = (products: Array<Product>) => {
    return (
      <ul>
        {
          products.map(product => (
            <li key={product.id}>
              <span>{product.name} {product.price}</span>{' '}
              <input type="button" value="+" onClick={() => this.addProduct(product.id)}/>
              <input type="button" value="-" onClick={() => this.removeProduct(product.id)}/>
            </li>
          ))
        }
      </ul>
    )
  }

  render() {
    const { products, basket, isBasketShown, shippingCost } = this.state
    console.log(basket, shippingCost)
    return (
      <div className="App">
        {!isBasketShown ? 
          (<>
            <h1>Products</h1>
            {this.renderProductsList(products)}
            <input type="button" value="Go to basket" onClick={() => this.toggleBasket()} />
          </>)
        :
        (<>
          <h1>Basket</h1>
          {this.renderProductsList(products.filter(product => basket.includes(product.id)))}
          <input type="button" value="Go back to products" onClick={() => this.toggleBasket()} />
        </>)
        }
      </div>
    );
  }
}

export default App;
