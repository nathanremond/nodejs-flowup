import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [category, setCategory] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/category`)
      .then((res) => res.json())
      .then((data) => setCategory(data))
      .catch((err) => console.error("Erreur :", err));
  }
  , []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id_product !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedCart = cart.map((product) => {
      if (product.id_product === productId) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedCart = cart.map((product) => {
      if (product.id_product === productId && product.quantity > 1) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculTotal = () => {
    const total = cart.reduce((sum, product) => sum + Number(product.price || 0) * product.quantity, 0);
    return Number(total).toFixed(2);
  };

  return (
    <div>
      <header>
        <div>
          <a href="/login" className=""> <img src="icone_de_connexion.png" alt="Icône de connexion"/> </a>
          <a href="/order" className="text-3xl font-bold underline"> <img src="icone_de_panier.png" alt="Icône de panier"/> </a>
        </div>
        <nav class="menu">
          <a href="/">Accueil</a>
          {category && category.map((category) => (
            <a href={`/category/${category.id_category}`} className="category">
              <div key={category.id_category} >
                {category.name}
              </div>
            </a>
          ))}
          <a href="/brand">Collaborations</a>
          <a href="/request">PC personnalisés</a>   
        </nav>
      </header>
      <main>
        <h1>Votre Panier</h1>
        {cart.length > 0 ? (
          <div>
            <ul>
              {cart.map((product) => (
                <li key={product.id_product}>
                  <h3>{product.name}</h3>
                  <p>Prix : {(Number(product.price) || 0).toFixed(2)} €</p>
                  <p>Quantité : {product.quantity}</p>
                  <button onClick={() => handleIncreaseQuantity(product.id_product)}>+</button>
                  <button onClick={() => handleDecreaseQuantity(product.id_product)}>-</button>
                  <button onClick={() => handleRemoveFromCart(product.id_product)}>
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
            <h2>Total : {calculTotal()} €</h2>
            <button>Payer</button>
          </div>
        ) : (
          <p>Votre panier est vide.</p>
        )}
      </main>
    </div>
  )
}