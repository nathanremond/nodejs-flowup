import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Header() {
  const [category, setCategory] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/category`)
      .then((res) => res.json())
      .then((data) => setCategory(data))
      .catch((err) => console.error("Erreur :", err));
  }, []);

  const isIdRoute = router.pathname.includes("[id]");

  return (
    <header>
      <div>
        <a href="/login" className="">
          {" "}
          <img
            src={`${isIdRoute ? "../" : ""}icone_de_connexion.png`}
            alt="Icône de connexion"
          />{" "}
        </a>
        <a href="/order" className="text-3xl font-bold underline">
          {" "}
          <img
            src={`${isIdRoute ? "../" : ""}icone_de_panier.png`}
            alt="Icône de panier"
          />{" "}
        </a>
      </div>
      <nav class="menu">
        <a href="/">Accueil</a>
        {category &&
          category.map((category) => (
            <a href={`/category/${category.id_category}`} className="category">
              <div key={category.id_category}>{category.name}</div>
            </a>
          ))}
        <a href="/brand">Collaborations</a>
        <a href="/request">PC personnalisés</a>
      </nav>
    </header>
  );
}
