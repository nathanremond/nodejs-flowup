import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";

export default function Request() {
  const { token, id_user, email, isLoading } = useContext(AuthContext);
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const [buy_date, setBuy_date] = useState("");
  const [use, setUse] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");

  //Redirige vers /login si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!isLoading && !token) {
      router.push("/login");
    }
  }, [isLoading, token]);

  const handleRequest = async (e) => {
    e.preventDefault();
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/request",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          street,
          city,
          zipcode,
          country,
          buy_date,
          use,
          budget,
          message,
          id_user,
        }),
      }
    );

    if (response.ok) router.push("/profile");
  };

  return (
    <form onSubmit={handleRequest}>
      <h1>Commande personnalisée</h1>
      <br />
      <br />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="text"
        placeholder="Street"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Zipcode"
        value={zipcode}
        onChange={(e) => setZipcode(e.target.value)}
      />
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <input
        type="date"
        placeholder="Date d'achat"
        value={buy_date}
        onChange={(e) => setBuy_date(e.target.value)}
      />
      <input
        type="text"
        placeholder="Utilisation"
        value={use}
        onChange={(e) => setUse(e.target.value)}
      />
      <input
        type="number"
        placeholder="Budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Envoyer</button>
    </form>
  );
}
