import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BookDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/brand/${id}`)
        .then((res) => res.json())
        .then((data) => setBrand(data))
        .catch((err) => console.error("Erreur :", err));
    }
  }, [id]);

  if (!book) return <p>Chargement...</p>;

  return (
    <div>
      <h1>{brand.title}</h1>
      <p>Auteur : {book.author}</p>
      <p>Année : {book.year}</p>
    </div>
  );
}