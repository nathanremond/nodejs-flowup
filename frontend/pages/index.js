import { useEffect, useState } from "react";

export default function Home() {   
  const [news, setNews] = useState(null);
  const [best_sells, setBest_sells] = useState(null);
  
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/bestSells`)
      .then((res) => res.json())
      .then((data) => setBest_sells(data))
      .catch((err) => console.error("Erreur :", err));
  }, []);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/news`)
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error("Erreur :", err));
  }, []);


  return (
    <div>
      <div>
        <h2>Les meilleures ventes</h2>

        <div>
          {!best_sells ? (
            <p>Chargement...</p>
          ) : best_sells.length === 0 ? (
            <p>Aucune vente.</p>
          ) : (
            best_sells.map((product) => (
              <div key={product.id_product}>
                <li key={product.id_product}>
                  <a
                    href={`/product/${product.id_product}`}
                    className="product"
                  >
                    <img
                      src={`/products/p${product.id_product}.png`}
                      alt={product.name}
                    />
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <h4>{product.price}</h4>
                  </a>
                </li>
              </div>
            ))
          )}
        </div>
        <div>
          <h2>Les nouveautés</h2>
          {!news ? (
            <p>Chargement...</p>
          ) : news.length === 0 ? (
            <p>Aucune nouveauté.</p>
          ) : (
            news.map((product) => (
              <div key={product.id_product}>
                <li key={product.id_product}>
                  <a
                    href={`/product/${product.id_product}`}
                    className="product"
                  >
                    <img
                      src={`/products/p${product.id_product}.png`}
                      alt={product.name}
                    />
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <h4>{product.price}</h4>
                  </a>
                </li>
              </div>
            ))
          )}
        </div>
        <div>
          <h2>
            <a href="/request">Créez votre PC</a>
          </h2>
        </div>
        <div>
          <h2>Infos</h2>
          <h3>
            Decouvrez notre site de vente de PC pour gamers, où vous trouverez
            les meilleurs ordinateurs gaming pour améliorer votre expérience de
            jeu. Nous proposons une sélection de PC gaming haut de gamme,
            équipés des derniers composants.
          </h3>
        </div>
      </div>
    </div>
  );
}