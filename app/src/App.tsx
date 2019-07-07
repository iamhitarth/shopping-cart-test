import * as React from 'react';
import './App.css';

type Product = {
  id: string;
  name: string;
  price: number;
}

type AppState = {
  products: Array<Product>;
  added: Array<string>;
  isBasketShown: boolean;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = { products: [], added: [], isBasketShown: false };
  }

  componentDidMount() {
    fetch('https://localhost:5001/api/products')
    .then(response => response.json())
    .then(products => {
      this.setState({ products })
    })
  }

  addProduct = (productId: string) => {
    const { added } = this.state
    if (!added.includes(productId)) {
      this.setState({
        ...this.state,
        added: [...added, productId] 
      })
    }
  }

  toggleBasket = () => {
    this.setState({
      ...this.state,
      isBasketShown: !this.state.isBasketShown
    })
  }

  render() {
    const { products, added, isBasketShown } = this.state
    
    console.log('Added products', added)
    
    return (
      <div className="App">
        {!isBasketShown ? (<>
          <h1>Products</h1>
          {<ul>
          {
            products.map(product => (
              <li key={product.id}>
                <span>{product.name} {product.price}</span>{' '}<input type="button" value="Add" onClick={() => this.addProduct(product.id)}/>
              </li>
            ))
          }
          </ul>}
          <input type="button" value="Go to basket" onClick={() => this.toggleBasket()} />
        </>)
        :
        (<>
          <h1>Basket</h1>
          <input type="button" value="Go back to products" onClick={() => this.toggleBasket()} />
        </>)
        }
      </div>
    );
  }
}

export default App;
