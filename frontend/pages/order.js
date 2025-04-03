import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function ProductDetail() {
  const { id_user, token, isLoading } = useContext(AuthContext);
  const router = useRouter();
  const [cart, setCart] = useState([]);

  //Redirige vers /login si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!isLoading && !token) {
      router.push("/login");
    }
  }, [isLoading, token]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter(
      (product) => product.id_product !== productId
    );
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
    const total = cart.reduce(
      (sum, product) => sum + Number(product.price || 0) * product.quantity,
      0
    );
    return Number(total).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Utilisateur actuel :", id_user);

    if (!id_user) {
      alert("Veuillez vous connecter avant de passer commande.");
      return;
    }

    const total_amount = calculTotal();
    const ordered_products = cart.map((product) => ({
      id_product: product.id_product,
      quantity: product.quantity,
    }));

    const data = {
      total_amount: total_amount,
      ordered_products: ordered_products,
      id_user: id_user,
    };

    console.log("Données envoyées :", data);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur lors de la commande :", errorData);
        alert(`Erreur : ${errorData.message || "Une erreur est survenue"}`);
        return;
      }

      alert("Votre commande a été passée avec succès !");
      await router.push("/profile");
    } catch (error) {
      console.error("Erreur réseau lors de la commande :", error);
      alert("Une erreur est survenue lors de la commande.");
    }
  };

  return (
    <div className="container">
      <main>
        <h1>Votre Panier</h1>
        {cart.length > 0 ? (
          <div className="cart-container">
            <ul>
              {cart.map((product) => (
                <li key={product.id_product}>
                  <h3>{product.name}</h3>
                  <p>Prix : {(Number(product.price) || 0).toFixed(2)} €</p>
                  <p>Quantité : {product.quantity}</p>
                  <div className="quantity-buttons">
                    <button onClick={() => handleIncreaseQuantity(product.id_product)}>+</button>
                    <button onClick={() => handleDecreaseQuantity(product.id_product)}>-</button>
                  </div>
                  <button onClick={() => handleRemoveFromCart(product.id_product)}>
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
            <h2>Total : {calculTotal()} €</h2>
            <button onClick={handleSubmit}>Payer</button>
          </div>
        ) : (
          <p>Votre panier est vide.</p>
        )}
      </main>
    </div>
  );
}