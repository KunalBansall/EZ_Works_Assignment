import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

function App() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("https://test.ezworks.ai/api", { email });
      if (response.status === 200) {
        toast.success("Form submitted successfully!");
        setEmail("");
      }
    } catch (err: any) {
      if (err.response?.status === 422) {
        setError("This email domain is not allowed");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Toaster position="top-center" />
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-xl font-bold mb-4">Subscribe</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={`border p-2 rounded w-full ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white p-2 rounded mt-2 w-full disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </form>
    </div>
  );
}

export default App;
