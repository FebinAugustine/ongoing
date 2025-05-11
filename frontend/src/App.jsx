import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </>
  );
}

export default App;
