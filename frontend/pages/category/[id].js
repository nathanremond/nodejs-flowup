import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function categoryDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [category, setCategory] = useState(null);
  const [categoryByID, setCategoryByID] = useState(null);
  const [productByCategory, setProductByCategory] = useState(null);

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
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/category`)
      .then((res) => res.json())
      .then((data) => setCategory(data))
      .catch((err) => console.error("Erreur :", err));
  }
  , []);
 
  if (!category) return <p>Chargement...</p>;

  return (
    <div>
      <header>
              <div>
                 <a href="/login" className=""> <img src="icone_de_connexion.png" alt="Icône de connexion"/> </a>
                <a href="/" className="text-3xl font-bold underline"> <img src="icone_de_panier.png" alt="Icône de connexion"/> </a>
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
              <h2>{categoryByID ? categoryByID.name : "Aucune catgorie"}</h2>
            </div>
            <div>
              {productByCategory ? (
                <ul>
                  {productByCategory.map((product) => (
                    <li key={product.id_product}>
                      <a href={`/product/${product.id_product}`} className="product">
                        <img src={""} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                        <button>Ajouter au panier</button>
                      </a>
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