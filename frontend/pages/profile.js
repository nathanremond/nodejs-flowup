import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import formatDate from "../utils/functions";

export default function profile() {
  const { token, id_user, email, isLoading, logout } = useContext(AuthContext);
  const router = useRouter();
  const [requestsByUser, setRequestsByUser] = useState(null);
  const [ordersByUser, setOrdersByUser] = useState(null);

  //Redirige vers /login si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!isLoading && !token) {
      router.push("/login");
    }
  }, [isLoading, token]);

  useEffect(() => {
    if (id_user) {
      fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/user/${id_user}/request`)
        .then((res) => res.json())
        .then((data) => setRequestsByUser(data))
        .catch((err) => console.error("Erreur :", err));
    }
  }, [id_user]);

  useEffect(() => {
    if (id_user) {
      fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/user/${id_user}/order`)
        .then((res) => res.json())
        .then((data) => setOrdersByUser(data))
        .catch((err) => console.error("Erreur :", err));
    }
  }, [id_user]);

  const handleLogout = async (e) => {
    e.preventDefault();
    logout();
    router.push("/");
  };

  if (isLoading) return <p>Chargement...</p>;
  if (!token) return <p>Redirection en cours...</p>; // Affiche un message pendant la redirection

  return (
    <div>
      <div>
        <h1>Bonjour {email}</h1>
      </div>

      <div>
        <h1>Mes commandes personnalisées</h1>
        {requestsByUser && requestsByUser.length > 0 ? (
          requestsByUser.map((request) => (
            <div key={request.id_request}>
              <h2>{request.name}</h2>
              <p>{request.phone}</p>
              <p>{request.street}</p>
              <p>{request.city}</p>
              <p>{request.zipcode}</p>
              <p>{request.country}</p>
              <p>{formatDate(request.buy_date)}</p>
              <p>{request.use}</p>
              <p>{request.budget}</p>
              <p>{request.message}</p>
            </div>
          ))
        ) : (
          <p>Aucune demande trouvée.</p>
        )}
      </div>

      <div>
        <h1>Mes commandes</h1>
        {ordersByUser && ordersByUser.length > 0 ? (
          ordersByUser.map((order) => (
            <div key={order.id_order}>
              <h2>{order.id_order}</h2>
              <p>{order.total_amount}</p>
              <p>{formatDate(order.order_date)}</p>
            </div>
          ))
        ) : (
          <p>Aucune commande trouvée.</p>
        )}
      </div>

      <div>
        <button onClick={handleLogout}>Se déconnecter</button>
      </div>
    </div>
  );
}
