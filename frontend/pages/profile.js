import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";

export default function profile() {
  const { token, email, isLoading } = useContext(AuthContext);
  const router = useRouter();

  //Redirige vers /login si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!isLoading && !token) {
      router.push("/login");
    }
  }, [isLoading, token]);
  
  if (isLoading) return <p>Chargement...</p>;
  if (!token) return <p>Redirection en cours...</p>; // Affiche un message pendant la redirection

  return (
    <div>
      <h1>Bonjour {email}</h1>
    </div>
  );
}
