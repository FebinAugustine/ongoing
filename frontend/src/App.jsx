import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <main className="bg-black p-4 min-h-screen">
        <Outlet />
      </main>
    </>
  );
}

export default App;
