import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]); 
  const [category, setCategory] = useState(""); 
  const [productsCategory, setProductsCategory] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (res) {
          return res.json();
        } else {
          setErrorMessage("Error al cargar los productos");
          return [];
        }
      })
      .then((data) => {
        setProducts(data);
      })
      .catch(() => {
        setErrorMessage("No se pudo conectar con la API");
      });
  }, []);
  
  const handleCategoryChange = (event) => setCategory(event.target.value);

  const ProductCategory = () => {
    if (!category) {
      setErrorMessage("Por favor ingrese una categoría");
      return;
    }
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => {
        if (res) {
          return res.json();
        } else {
          setErrorMessage("Categoria no encontrada");
          return [];
        }
      })
      .then((data) => {
        setProductsCategory(data);
      })
      .catch(() => {
        setErrorMessage("No se puede conectar con la API");
      });
  };
  return (
    <main>
      <h1>Recuperatorio Requests con React</h1>
      <div>
        <h2>Lista de todos los productos disponibles:</h2>
        <div className="result-box">
          {products.length > 0 ? (
            products.map((product) => (
              <p key={product.id}>
                {product.title} - {product.price} Pesos 
              </p>
            ))
          ) : (
            <p>Cargando productos...</p>
          )}
        </div>
      </div>
      <div>
        <h2>Obtener productos de una categoría determinada</h2>
        <h3>Ingrese una categoría:</h3>
        <input type="text" value={category} onChange={handleCategoryChange} />
        <button onClick={ProductCategory}>Enviar</button>
        <h3>Productos de la categoría ingresada:</h3>
        <div className="result-box">
          {productsCategory.length > 0 ? (
            productsCategory.map((product) => (
              <p key={product.id}>
                {product.title} - {product.price} Pesos
              </p>
            ))
          ) : (
            <p>No hay productos para esta categoría.</p>
          )}
        </div>
      </div>
      <div>
        <h2>Mensaje en caso de error:</h2>
        <p className="result-box">{errorMessage}</p>
      </div>
    </main>
  );
}

export default App;
