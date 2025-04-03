import { useEffect, useState} from "react";

export default function Collab() {
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
            <main>
                <h1>Marques</h1>
                {brand && brand.map((brand) => (
                    <a href={`/brand/${brand.id_brand}`} className="brand">
                        <div key={brand.id_brand}>
                            <h2>{brand.name}</h2>
                            <p>{brand.description}</p>
                        </div>
                    </a>
                ))}
            </main>
        </div> 
    );
} 