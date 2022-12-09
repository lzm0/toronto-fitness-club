import { useEffect, useState } from "react";

function Payments({ card }) {
  const [payments, setPayments] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  useEffect(() => {
    fetch(`http://${window.location.hostname}:8000/api/profile/payments/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPayments(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
      });
  }, []);

  const goToNextPage = () => {
    fetch(nextPage, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPayments(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
      });
  };

  const goToPreviousPage = () => {
    fetch(previousPage, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPayments(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
      });
  };

  return (
    <div className="card bg-base-100">
      <div className="card-body">
        <h1 className="card-title">Payments</h1>
        <div className="overflow-x-auto">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Paid</th>
                <th>Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {payments &&
                payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.id}</td>
                    <td>{payment.date}</td>
                    <td>${payment.amount}</td>
                    <td>{payment.paid ? "Yes" : "No"}</td>
                    <td>{card.card_number}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="btn-group grid grid-cols-2">
          <button
            className="btn btn-sm"
            disabled={!previousPage}
            onClick={goToPreviousPage}
          >
            Previous
          </button>
          <button
            className="btn btn-sm"
            disabled={!nextPage}
            onClick={goToNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payments;
