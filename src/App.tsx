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
      const response = await axios.post("https://test.ezworks.ai/api", {
        email,
      });
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

  const services = [
    { icon: "/PresentDesign.png", title: "Presentation Design" },
    { icon: "/audiovisual.png", title: "Audio - Visual Production" },
    { icon: "/translation.png", title: "Translation Services" },
    { icon: "/graphicdesign.png", title: "Graphic Design" },
    { icon: "/Research.png", title: "Research & Analytics" },
    { icon: "/dataProcess.png", title: "Data Processing" },
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Toaster position="top-center" />

      <div className="max-w-[1920px] w-full px-4 py-8 lg:px-16 lg:py-12">
        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-12">
          {/* Left Section */}
          <div className="w-[40%] flex flex-col justify-between">
            <div>
              <div className="flex items-center mb-8">
                <img src="EZworks.png" alt="Ezworks Logo" className="h-20" />
              </div>

              <h1 className="text-[#112949] text-2xl font-exo font-medium mb-4">
    Suite Of Business Support Services
  </h1>

              <p className="text-[#112949] text-lg  font-exo mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt...Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex gap-4 items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className={`flex-grow px-6 py-4 rounded-lg border ${
                    error ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#00B6FF] font-exo text-lg placeholder-gray-400`}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-[#F47B20] text-white rounded-lg font-exo text-lg font-medium hover:bg-[#E06910] transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  Contact Me
                </button>
              </div>
              {error && (
                <p className="mt-2 text-red-500 text-sm text-left font-exo">
                  {error}
                </p>
              )}
            </form>
          </div>

          {/* Right Section */}
          <div className="w-[60%]">
            <div className="grid grid-cols-3 gap-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-[#1B365D] text-white p-6 rounded h-[200px] flex flex-col"
                >
                  {/* Icon & Title in a Single Line */}
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={service.icon}
                      alt={service.title}
                      className="w-8 h-8"
                    />
                    <h3 className="text-[#3cc3f2] text-lg font-exo font-semibold">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-gray-300 font-exo text-sm leading-relaxed">
                    Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.
                    Lorem ipsum dolor sit amet
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col">
          <div className="mb-8">
            <div className="flex items-center mb-8">
              <div className="w-14 h-14 border-2 border-[#F47B20] rounded-lg flex items-center justify-center">
                <span className="text-[#00B6FF] text-3xl font-exo font-bold">
                  EZ
                </span>
              </div>
              <span className="text-[#00B6FF] text-3xl font-exo font-bold ml-3">
                Works
              </span>
            </div>

            <h1 className="text-[#112949] text-3xl font-exo font-medium mb-6">
              Suite Of Business Support Services
            </h1>

            <p className="text-[#112949] text-base font-exo">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt...Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-[#1B365D] text-white p-6 rounded-xl flex flex-col"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-8 h-8"
                  />
                  <h3 className="text-[#3cc3f2] text-lg font-exo font-semibold">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-300 font-exo text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem
                  ipsum dolor sit amet
                </p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className={`w-full px-6 py-4 rounded-lg border ${
                  error ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#00B6FF] font-exo text-lg placeholder-gray-400`}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-[#F47B20] text-white rounded-lg font-exo text-lg font-medium hover:bg-[#E06910] transition-colors disabled:opacity-50"
              >
                Contact Me
              </button>
            </div>
            {error && (
              <p className="mt-2 text-red-500 text-sm text-left font-exo">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
