// src/components/auth/useAuth.js
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from '../../config/firebaseCon'; // Adjust the path if needed

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(firebaseApp);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export default useAuth;
