import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BookDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [brand, setBrand] = useState(null);
  const [PCgaming, setPCgaming] = useState(null);
  const [Laptops, setLaptops] = useState(null);
  const [Peripherals, setPeripherals] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/brand/${id}`)
        .then((res) => res.json())
        .then((data) => setBrand(data))
        .catch((err) => console.error("Erreur :", err));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL + `/brand/${id}/product?category=1`
      )
        .then((res) => res.json())
        .then((data) => setPCgaming(data))
        .catch((err) => console.error("Erreur :", err));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL + `/brand/${id}/product?category=2`
      )
        .then((res) => res.json())
        .then((data) => setLaptops(data))
        .catch((err) => console.error("Erreur :", err));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL + `/brand/${id}/product?category=3`
      )
        .then((res) => res.json())
        .then((data) => setPeripherals(data))
        .catch((err) => console.error("Erreur :", err));
    }
  }, [id]);

  if (!brand) return <p>Chargement...</p>;

  return (
    <div>
      <div>
        <h1>{brand.name}</h1>
        <p>{brand.description}</p>
      </div>

      <div>
        <h2>PC Gaming</h2>
        {PCgaming ? (
          <ul>
            {PCgaming.map((product) => (
              <li key={product.id_product}>
                <a href={`/product/${product.id_product}`} className="product">
                  <img
                    src={`/products/p${product.id_product}.png`}
                    alt={product.name}
                  />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <h4>{product.price} €</h4>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>Chargement...</p>
        )}
      </div>

      <div>
        <h2>PC Portables</h2>
        {Laptops ? (
          <ul>
            {Laptops.map((product) => (
              <li key={product.id_product}>
                <a href={`/product/${product.id_product}`} className="product">
                  <img
                    src={`/products/p${product.id_product}.png`}
                    alt={product.name}
                  />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <h4>{product.price} €</h4>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>Chargement...</p>
        )}
      </div>

      <div>
        <h2>Périphériques</h2>
        {Peripherals ? (
          <ul>
            {Peripherals.map((product) => (
              <li key={product.id_product}>
                <a href={`/product/${product.id_product}`} className="product">
                  <img
                    src={`/products/p${product.id_product}.png`}
                    alt={product.name}
                  />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <h4>{product.price} €</h4>
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