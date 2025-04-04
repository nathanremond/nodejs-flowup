import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [productByID, setProductByID] = useState(null);
  const [cart, setCart] = useState([]);
  const [performanceByProduct, setPerformanceByProduct] = useState(null);
  const [photoByProduct, setPhotoByProduct] = useState(null);
  
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

  useEffect(() => {
    if (id) {
      fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/product/${id}`)
        .then((res) => res.json())
        .then((data) => setProductByID(data))
        .catch((err) => console.error("Erreur :", err));
    }
  }, [id]);

  useEffect(() => {
    if(id) {
      fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/product/${id}/performance`)
        .then((res) => res.json())
        .then((data) => setPerformanceByProduct(data))
        .catch((err) => console.error("Erreur :", err));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/product/${id}/photo`)
        .then((res) => res.json())
        .then((data) => setPhotoByProduct(data))
        .catch((err) => console.error("Erreur :", err));
    }
  }, [id]);
 
  if (!productByID) return <p>Chargement...</p>;

  return (
    <div className="container">
      <div className="detail-product">
        <img
          src={`/products/p${productByID.id_product}.png`}
          alt={productByID.name}
        />
        <div className="detail-product-infos">
          {photoByProduct &&
            photoByProduct.map((photo) => (
              <img
                key={photo.id_photo}
                src={`/products/${photo.name}.png`}
                alt={`Image ${productByID.name}`}
              ></img>
            ))}
        </div>
        <h2>{productByID.name}</h2>
        <p>{productByID.description}</p>
        <p>Prix: {productByID.price} €</p>
        <p>Carte graphique: {productByID.graphic_card}</p>
        <p>Processeur: {productByID.processor}</p>
        <p>RAM: {productByID.ram}</p>
        <p>Stockage: {productByID.storage}</p>
        <button onClick={handleAddToCart}>Ajouter au panier</button>
      </div>

      <div className="detail-product-performance">
        <h2>Performances</h2>
        {performanceByProduct &&
          performanceByProduct.map((performance) => (
            <div key={performance.id_performance}>
              <img
                src={`/games/${performance.picture_url}`}
                alt={`Image Jeu ${performance.name}`}
              ></img>
              <p>{performance.average_resolution_low}:</p>
              <p>{performance.fps_low} fps</p>
              <p>{performance.average_resolution_high}:</p>
              <p>{performance.fps_high} fps</p>
            </div>
          ))}
      </div>
    </div>
  );
}