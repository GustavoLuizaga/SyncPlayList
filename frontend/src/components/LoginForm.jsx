export function LoginForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // <-- Agregar esto
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        window.location.href = "/music";
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="email"
        id="email"
        placeholder="Email"
        className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
      />
      <button
        type="submit"
        className="w-full p-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors mt-6"
      >
        Login
      </button>
    </form>
  );
}
