import { Folder } from "./components/Folder";

function App() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Recursive Component</h1>
      <Folder />
    </main>
  );
}

export default App;
