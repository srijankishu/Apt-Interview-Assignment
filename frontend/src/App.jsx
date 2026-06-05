import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

function App() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/orders/get"
        );

        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();

    const socket = io("http://localhost:5000");

    socket.on("order-update", async (event) => {
      setMessage(
        `${event.operation.toUpperCase()} received`
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);

      try {
        const res = await axios.get(
          "http://localhost:5000/api/orders/get"
        );

        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <h1 className="text-4xl font-bold text-center text-slate-800">
            Real-Time Order Dashboard
          </h1>

          <p className="text-center text-gray-500 mt-2">
            MongoDB Change Streams + Socket.IO
          </p>
        </div>
      </header>

      {/* Notification */}
      {message && (
        <div className="fixed top-5 right-5 z-50">
          <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg">
            {message}
          </div>
        </div>
      )}

      {/* Orders */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-slate-800">
                  {order.customer_name}
                </h2>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                ${order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <p>
                  <span className="font-semibold">Product:</span>{" "}
                  {order.product_name}
                </p>

                <p className="text-xs text-gray-500 break-all">
                  {order._id}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;