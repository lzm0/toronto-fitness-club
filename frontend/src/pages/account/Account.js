import LogoutButton from "./LogoutButton";
import PaymentMethod from "./payment-method/PaymentMethod";
import Profile from "./profile/Profile";
import Subscription from "./Subscription";
import { useEffect, useState } from "react";
import Payments from "./Payments";
import Classes from "./Classes";

function Account() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/profile/`, {
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
          <Classes />
          <Subscription />
          <PaymentMethod />
          <Payments />
          <LogoutButton />
        </div>
      </div>
    )
  );
}

export default Account;
