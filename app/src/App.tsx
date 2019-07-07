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
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = { products: [], added: [] };
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

  render() {
    const { products, added } = this.state
    
    console.log('Added products', added)
    
    return (
      <div className="App">
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
      </div>
    );
  }
}

export default App;
