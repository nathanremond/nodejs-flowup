import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";

export default function profile() {
  const { token, id_user, email, isLoading } = useContext(AuthContext);
  const router = useRouter();
  const [requestByUser, setRequestByUser] = useState(null);

  //Redirige vers /login si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!isLoading && !token) {
      router.push("/login");
    }
  }, [isLoading, token]);

  useEffect(() => {
    console.log("ID utilisateur :", id_user);
    if (id_user) {
      fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/user/${id_user}/request`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Données reçues de l'API :", data); // Log des données reçues
          setRequestByUser(data);
        })
        .catch((err) => console.error("Erreur :", err));
    }
  }, [id_user]);

  if (isLoading) return <p>Chargement...</p>;
  if (!token) return <p>Redirection en cours...</p>; // Affiche un message pendant la redirection

  return (
    <div>
      <div>
        <h1>Bonjour {email}</h1>
      </div>

      <div>
        <h1>Mes commandes personnalisées</h1>
        {requestByUser && requestByUser.length > 0 ? (
          requestByUser.map((request) => (
            <div key={request.id_request}>
              <h2>{request.name}</h2>
              <p>{request.phone}</p>
              <p>{request.street}</p>
              <p>{request.city}</p>
              <p>{request.zipcode}</p>
              <p>{request.country}</p>
              <p>{request.buy_date}</p>
              <p>{request.use}</p>
              <p>{request.budget}</p>
              <p>{request.message}</p>
            </div>
          ))
        ) : (
          <p>Aucune demande trouvée.</p>
        )}
      </div>
    </div>
  );
}
