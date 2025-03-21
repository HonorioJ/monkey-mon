import { ToastContainer } from "react-toastify";
import RoutesApp from "./routes";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <RoutesApp></RoutesApp>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
