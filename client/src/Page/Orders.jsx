import React, { useContext, useEffect, useState } from "react";
import LayOut from "../Component/LayOut";
import { db } from "../Utility/firebase";
import { DataContext } from "../Component/DataProvider";
import ProductCard from "../Component/ProductCard";

function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <LayOut>
      <section className="p-6 max-w-4xl mx-auto">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>

          {orders?.length === 0 && (
            <div className="text-center py-8 text-gray-600">
              <p>You don't have orders yet.</p>
            </div>
          )}

          <div className="flex flex-col gap-6">
            {orders?.map((eachOrder, i) => (
              <div key={i} className="border-t pt-4">
                <p className="text-sm text-gray-700 mb-2">
                  Order ID: {eachOrder?.id}
                </p>

                {eachOrder?.data?.basket?.map((order) => (
                  <ProductCard
                    key={order.id}
                    product={order}
                    flex={true}
                    titleUp={true}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
