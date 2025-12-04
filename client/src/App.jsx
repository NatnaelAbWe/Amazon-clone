import "./App.css";
import Home from "./Page/Home";
import { useContext, useEffect } from "react";
import Routing from "./Router";
import { DataContext } from "./Component/DataProvider";
import { auth } from "./Utility/firebase";
import { Type } from "./Utility/action.type";

function App() {
  const [dispatch] = useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, [dispatch]);
  return (
    <>
      <Routing />
    </>
  );
}

export default App;
