import PasswordInput from "./lib/password-input";

function App() {
  return (
    <div className="p-2 bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center gap-4 w-full max-w-[400px] mx-auto">
      <h1 className="text-4xl font-bold text-center">
        AWeber Password Checker
      </h1>
      <PasswordInput />
    </div>
  );
}

export default App;
