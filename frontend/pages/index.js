import { useEffect, useState, useContext, use } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";

export default function Home() {
  const { token } = useContext(AuthContext); // Vérifier si l'utilisateur est connecté
  const router = useRouter();    
  const [news, setNews] = useState(null);
  const [best_sells, setBest_sells] = useState(null);
  
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
  
 
  




  // Redirige vers /login si l'utilisateur n'est pas connecté
  // useEffect(() => {
  //   if (!token) {
  //     router.push("/login");
  //   }
  // }, [token]);

  // useEffect(() => {
  //   if (token) {
  //     fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/books", {
  //       headers: { Authorization: `Bearer ${token}` }, // Envoi du token JWT
  //     })
  //       .then((res) => res.json())
  //       .then((data) => setBooks(data))
  //       .catch((err) => console.error("Erreur lors du chargement :", err));
  //   }
  // }, [token]);

  // if (!token) return <p>Redirection en cours...</p>; // Affiche un message pendant la redirection

  return (
    <div>
      <header>
        <div>
          <a href="/login" className="">
            {" "}
            <img src="icone_de_connexion.png" alt="Icône de connexion" />{" "}
          </a>
          <a href="/" className="text-3xl font-bold underline">
            {" "}
            <img src="icone_de_panier.png" alt="Icône de connexion" />{" "}
          </a>
        </div>
        <nav class="menu">
          <a href="/">Accueil</a>
          <a href="/category">PC gamer</a>
          <a href="/category">PC portables</a>
          <a href="/category">Périphériques </a>
          <a href="/brand">Collaborations</a>
          <a href="/request">PC personnalisés</a>
        </nav>
      </header>
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
                <h3>
                  <a href={`/bestSells`} style={{ marginRight: "10px" }}>
                    {product.name}
                  </a>
                </h3>
                <p>{product.graphic_card}</p>
                <p>{product.processor}</p>
                <p>{product.ram}</p>
                <p>{product.storage}</p>
                <h4>{product.price}</h4>
                <h4>
                  <a href="/">Ajouter au panier</a>
                </h4>
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
                <h3>
                  <a href={`/news`} style={{ marginRight: "10px" }}>
                    {product.name}
                  </a>
                </h3>
                <p>{product.graphic_card}</p>
                <p>{product.processor}</p>
                <p>{product.ram}</p>
                <p>{product.storage}</p>
                <h4>{product.price}</h4>
                <h4>
                  <a href="/">Ajouter au panier</a>
                </h4>
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
            équipés des derniers composants.{" "}
          </h3>
        </div>
      </div>
      {/* <ul>
        <li><a href="/bestSells">Meilleures ventes</a></li>
        <li><a href="/news">Nouveautés</a></li>
        <li><a href="/request">Créez votre PC</a></li>
        <li><a href="/bestSells">Meilleures ventes</a></li>
      </ul> */}
    </div>
    // <div>
    //   <h1>Liste des Livres</h1>
    //   <a href="/add" style={{ display: "block", marginBottom: "20px" }}>
    //     Ajouter un Livre
    //   </a>
    //   <button
    //     onClick={() => {
    //       localStorage.removeItem("token"); // Supprime le token
    //       window.location.reload(); // Recharge la page pour forcer la déconnexion
    //     }}
    //   >
    //     Se Déconnecter
    //   </button>
    //   <ul>
    //     {books.length === 0 ? (
    //       <p>Aucun livre disponible.</p>
    //     ) : (
    //       books.map((book) => (
    //         <li key={book.id}>
    //           <a href={`/book/${book.id}`} style={{ marginRight: "10px" }}>
    //             {book.title} - {book.author} ({book.year})
    //           </a>
    //           <button
    //             onClick={async () => {
    //               await fetch(
    //                 process.env.NEXT_PUBLIC_API_BASE_URL + `/books/${book.id}`,
    //                 {
    //                   method: "DELETE",
    //                   headers: { Authorization: `Bearer ${token}` }, // Envoi du token JWT
    //                 }
    //               );
    //               setBooks(books.filter((b) => b.id !== book.id));
    //             }}
    //           >
    //             Supprimer
    //           </button>
    //         </li>
    //       ))
    //     )}
    //   </ul>
    // </div>
  );
}