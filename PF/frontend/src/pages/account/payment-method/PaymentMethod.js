import UpdateCard from "./EditCard";
import DeleteCard from "./DeleteCard";

function PaymentMethod({ card }) {
  return (
    card && (
      <div className="card bg-base-100">
        <div className="card-body">
          <h1 className="card-title">Payment method</h1>
          {card.card_number ? (
            <div className="flex flex-col gap-3">
              <div>
                <div className="font-semibold">Credit Card</div>
                {card.card_number}
              </div>
              <div>
                <div className="font-semibold">Expiry Date</div>
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
