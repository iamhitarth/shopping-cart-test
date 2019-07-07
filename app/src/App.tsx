import * as React from 'react';
import './App.css';

type Product = {
  id: string;
  name: string;
  price: number;
}

type AppState = {
  products: Array<Product>
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = { products: [] };
  }

  componentDidMount() {
    fetch('https://localhost:5001/api/products')
    .then(response => response.json())
    .then(results => {
      console.log('Results are', results)
      this.setState({ products: results })
    })
  }

  render() {
    const { products } = this.state

    return (
      <div className="App">
        <h1>Products</h1>
        {<ul>
        {
          products.map(product => (
            <li key={product.id}>
              {product.name} {product.price}
            </li>
          ))
        }
        </ul>}
      </div>
    );
  }
}

export default App;
