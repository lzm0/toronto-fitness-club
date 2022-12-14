import UpdateCard from "./EditCard";
import DeleteCard from "./DeleteCard";
import { useEffect, useState } from "react";

function PaymentMethod() {
  const [card, setCard] = useState(null);

  useEffect(() => {
    fetch(`/api/profile/card/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setCard);
  }, []);

  return (
    card && (
      <div className="card bg-base-100">
        <div className="card-body">
          <h1 className="card-title">Payment method</h1>
          {card.card_number ? (
            <div className="flex flex-col gap-3">
              <div>
                <div className="uppercase text-sm font-semibold opacity-60">
                  Credit Card
                </div>
                {card.card_number}
              </div>
              <div>
                <div className="uppercase text-sm font-semibold opacity-60">
                  Expiry Date
                </div>
                {card.expiry_date}
              </div>
            </div>
          ) : (
            <div>No card on file</div>
          )}
          <div className="card-actions justify-end">
            {card && <DeleteCard />}
            <UpdateCard />
          </div>
        </div>
      </div>
    )
  );
}

export default PaymentMethod;
