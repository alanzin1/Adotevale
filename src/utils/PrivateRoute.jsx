import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function PrivateRoute({ children }) {
  const [user, loadingAuth] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(null);
  const [loadingRole, setLoadingRole] = useState(true);

  useEffect(() => {
    async function checkAdminStatus() {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists() && docSnap.data().role === "admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Erro ao verificar permissão:", error);
          setIsAdmin(false);
        }
      }
      setLoadingRole(false);
    }

    if (!loadingAuth) {
      if (user) {
        checkAdminStatus();
      } else {
        setLoadingRole(false);
      }
    }
  }, [user, loadingAuth]);

  if (loadingAuth || loadingRole) {
    return <div className="loading">Verificando permissões...</div>;
  }

  if (!user || isAdmin === false) {
    return <Navigate to="/login" />;
  }

  return children;
}
