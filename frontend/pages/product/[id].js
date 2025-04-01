import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [productByID, setProductByID] = useState(null);
  const [category, setCategory] = useState(null);

  const handleAddToCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...storedCart, productByID];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
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
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/category`)
      .then((res) => res.json())
      .then((data) => setCategory(data))
      .catch((err) => console.error("Erreur :", err));
  }
  , []);
 
  if (!productByID) return <p>Chargement...</p>;

  return(
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
        <div>
            <img src={""} alt={productByID.name} />
            <h2>{productByID.name}</h2>
            <p>{productByID.description}</p>
            <p>{productByID.price} €</p>
            <button onClick={handleAddToCart}>Ajouter au panier</button>
            <p>{productByID.graphic_card}</p>
            <p>{productByID.processor}</p>
            <p>{productByID.ram}</p>
            <p>{productByID.storage}</p>
        </div>
    </div>
  )
}