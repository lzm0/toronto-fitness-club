import LogoutButton from "./LogoutButton";
import PaymentMethod from "./payment-method/PaymentMethod";
import Profile from "./profile/Profile";
import Subscription from "./Subscription";
import { useEffect, useState } from "react";

function Account() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://${window.location.hostname}:8000/api/profile/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setUser);
  }, []);

  return (
    user && (
      <div className="flex justify-center p-4">
        <div className="flex flex-col grow justify-items-stretch gap-4 max-w-md min-w-0">
          <Profile user={user} />
          <Subscription />
          <PaymentMethod />
          <LogoutButton />
        </div>
      </div>
    )
  );
}

export default Account;
