import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function categoryDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [category, setCategory] = useState(null);
  const [categoryByID, setCategoryByID] = useState(null);
  const [productByCategory, setProductByCategory] = useState(null);
  const [productByID, setProductByID] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/category/${id}`)
        .then((res) => res.json())
        .then((data) => setCategoryByID(data))
        .catch((err) => console.error("Erreur :", err));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/category/${id}/product`)
        .then((res) => res.json())
        .then((data) => setProductByCategory(data))
        .catch((err) => console.error("Erreur :", err));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/product/${id}`)
        .then((res) => res.json())
        .then((data) => setProductByID(data))
        .catch((err) => console.error("Erreur :", err));
    }
  }, [id]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleAddToCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = storedCart.find((item) => item.id_product === productByID.id_product);

  if (existingProduct) {
    const updatedCart = storedCart.map((item) =>
      item.id_product === productByID.id_product
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  } else {
    const updatedCart = [...storedCart, { ...productByID, quantity: 1 }];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }
    alert(`${productByID.name} a été ajouté au panier !`);
  };
 
  if (!categoryByID) return <p>Chargement...</p>;

  return (
    <div className="container">
            <div className="category-detail">
              <h2>{categoryByID ? categoryByID.name : "Aucune catgorie"}</h2>
            </div>
            <div className="category-product-list">
              {productByCategory ? (
                <ul>
                  {productByCategory.map((product) => (
                    <li key={product.id_product}>
                      <a href={`/product/${product.id_product}`} className="product">
                        <img src={`/products/p${product.id_product}.png`} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                      </a>
                      <button onClick={handleAddToCart}>Ajouter au panier</button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Chargement...</p>
              )}
            </div>

    </div>
  );
}