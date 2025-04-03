import { useEffect, useState, useContext, use } from "react";

export default function Home() {   
  const [news, setNews] = useState(null);
  const [best_sells, setBest_sells] = useState(null);
  const [category, setCategory] = useState(null);
  
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/bestSells`)
      .then((res) => res.json())
      .then((data) => setBest_sells(data))
      .catch((err) => console.error("Erreur :", err));
  }
  , []);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/news`)
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error("Erreur :", err));
  }, []);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/category`)
      .then((res) => res.json())
      .then((data) => setCategory(data))
      .catch((err) => console.error("Erreur :", err));
  }
  , []);


  return (
    <div className="accueil_container">
      <header>
        <div>
          <a href="/login">
            <img src="icone_de_connexion.png" alt="Icône de connexion" />{" "}
          </a>
          <a href="/order">
            <img src="icone_de_panier.png" alt="Icône de panier" />{" "}
          </a>
        </div>
        <nav class="menu">
          <a href="/">Accueil</a>
          {category &&
            category.map((category) => (
              <a
                href={`/category/${category.id_category}`}
                className="category"
              >
                <div key={category.id_category}>{category.name}</div>
              </a>
            ))}
          <a href="/brand">Collaborations</a>
          <a href="/request">PC personnalisés</a>
        </nav>
      </header>
      <section>
        <h2>Les meilleures ventes</h2>
        <div className="accueil-product-list">
          {!best_sells ? (
            <p>Chargement...</p>
          ) : best_sells.length === 0 ? (
            <p>Aucune vente.</p>
          ) : (
            best_sells.map((product) => (
              <div className="accueil-product-card" key={product.id_product}>
                <img src={`/products/p${product.id_product}.png`} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <h4>{product.price} €</h4>
                <a href={`/product/${product.id_product}`}>Voir le produit</a>
              </div>
            ))
          )}
        </div>
      </section>
      <section>
        <h2>Les nouveautés</h2>
        <div className="accueil-product-list">
          {!news ? (
            <p>Chargement...</p>
          ) : news.length === 0 ? (
            <p>Aucune nouveauté.</p>
          ) : (
            news.map((product) => (
              <div className="accueil-product-card" key={product.id_product}>
                <img src={`/products/p${product.id_product}.png`} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <h4>{product.price} €</h4>
                <a href={`/product/${product.id_product}`}>Voir le produit</a>
              </div>
            ))
          )}
        </div>
      </section>
      <section className="accueil-info-section">
        <h2>Infos</h2>
        <h3>
          Découvrez notre site de vente de PC pour gamers, où vous trouverez les meilleurs
          ordinateurs gaming pour améliorer votre expérience de jeu. Nous proposons une sélection
          de PC gaming haut de gamme, équipés des derniers composants.
        </h3>
      </section>
    </div>
  );
}