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
  isOrderPlaced: boolean;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = { products: [], basket: [], isBasketShown: false, shippingCost: 0, isOrderPlaced: false };
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

  placeOrder = (productIds: Array<string>) => 
    post('https://localhost:5001/api/products/order', productIds)
    .then(response => this.setOrderPlaced())

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

  setOrderPlaced = () => {
    this.setState({
      ...this.state,
      isBasketShown: false,
      isOrderPlaced: true
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
          products.map(product => {
            const isSelected = this.state.basket.includes(product.id)
            return (
              <li key={product.id}>
                <span>{product.name} - {product.price}</span>{' '}
                {
                  !isSelected ? 
                    <input type="button" value="Add" onClick={() => this.addProduct(product.id)}/> : 
                    <input type="button" value="Remove" onClick={() => this.removeProduct(product.id)}/>
                }
              </li>
            )
          })
        }
      </ul>
    )
  }

  renderProductsView = (products: Array<Product>) => (<>
    <h1>Products</h1>
    {this.renderProductsList(products)}
    <input type="button" value="Go to basket" onClick={() => this.toggleBasket()} />
  </>)

  renderBasketView = (selectedProductIds: Array<string>) => {
    const { products, shippingCost } = this.state
    const selectedProducts = products.filter(product => selectedProductIds.includes(product.id))
    let totalProductsCost = 0;
    selectedProducts.forEach(product => totalProductsCost += product.price)

    return (
      <>
        <h1>Basket</h1>
        {this.renderProductsList(selectedProducts)}
        <div>Shipping cost - ${shippingCost}</div>
        <div>Total cost - ${shippingCost + totalProductsCost}</div>
        <input type="button" value="Go back to products" onClick={() => this.toggleBasket()} />
        <input type="button" value="Place order" onClick={() => this.placeOrder(selectedProductIds)} />
      </>
    )
  }

  render() {
    const { products, basket, isBasketShown, isOrderPlaced } = this.state
    
    return (
      <div className="App">
        {!isBasketShown ? 
          !isOrderPlaced ? 
            this.renderProductsView(products) : <h1>Thank you for your order.</h1>
        :
        this.renderBasketView(basket)
        }
      </div>
    );
  }
}

export default App;
