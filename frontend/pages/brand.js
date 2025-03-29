import { useEffect, useState, useContext, use } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";

export default function Collab() {
    const { token } = useContext(AuthContext);
    const router = useRouter();
    const [brand, setBrand] = useState(null);

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/brand`)
          .then((res) => res.json())
          .then((data) => setBrand(data))
          .catch((err) => console.error("Erreur :", err));
      }
      , []);
    
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
            <a href="/category">PC</a>
            <a href="/brand">Collaborations</a>
            <a href="/request">PC personnalisés</a>
          </nav>
        </header>
        <main>
          <h1>Marques</h1>
          {brand &&
            brand.map((brand) => (
              <div key={brand.id_brand}>
                <a href={`/brand/${brand.id_brand}`} className="brand">
                  <h2>{brand.name}</h2>
                  <p>{brand.description}</p>
                </a>
              </div>
            ))}
        </main>
      </div>
    );
} 