import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { analytics } from "./firebase"; 
import { logEvent, setUserId, setUserProperties } from "firebase/analytics";

const useFirebaseAnalytics = () => {
  const location = useLocation();
  const currentUser = useSelector((state) => state.auth);

  useEffect(() => {
    if (!analytics) return;

    const pagePath = location.pathname + location.search;

    if (currentUser && currentUser.user) {
      setUserId(analytics, currentUser.user.uid);
      setUserProperties(analytics, {
        email: currentUser.user.email,
        uid: currentUser.user.uid,
        displayName: currentUser.user.displayName,
      });
    }

    logEvent(analytics, "page_view", { page_path: pagePath });

    console.log("page_view", { page_path: pagePath });
  }, [location, currentUser]);
};

export default useFirebaseAnalytics;
