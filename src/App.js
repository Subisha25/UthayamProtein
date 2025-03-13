import logo from './logo.svg';
import './App.css';
import Banner from './components/banner/banner';
import Footer from './components/footer/footer';
import Products from './components/products/products';

function App() {
  return (
    <div className="App">
     <Banner />
     <Products/>
     <Footer />
    </div>
  );
}

export default App;
