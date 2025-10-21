import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User, CheckCircle2, Check, XCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext.jsx";
import Footer from "@/components/Footer";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [strength, setStrength] = useState(0);
  const [success, setSuccess] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  // Evaluate password strength
  useEffect(() => {
    const { password } = formData;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    setStrength(score);
  }, [formData.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await register(formData);
      setSuccess(true);
      setTimeout(() => navigate("/"), 1400);
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const passwordsMatch =
    formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;

  const strengthLabels = ["Too Short", "Weak", "Fair", "Good", "Strong"];
  const strengthClasses = [
    "bg-red-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Background glow (same as Sign In) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.15),transparent_35%)] pointer-events-none" />

      {/* Floating light orbs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ repeat: Infinity, duration: 7 }}
        className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-emerald-500/10 blur-3xl rounded-full"
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="backdrop-blur-xl bg-white/5 border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <CardHeader className="text-center pt-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45 }}
              className="bg-[url('/public/ladywithball.webp')] bg-cover bg-center bg-no-repeat mx-auto w-16 h-16 from-blue-600 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-2xl"></span>
            </motion.div>
            <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Create Account
            </CardTitle>
            <p className="text-gray-400 text-sm mt-2">Join Precision Sports today</p>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-300">
                    First name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="pl-10 bg-white/10 border-white/10 text-gray-100 placeholder:text-gray-500 focus:ring-emerald-400 focus:border-emerald-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-300">
                    Last name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="pl-10 bg-white/10 border-white/10 text-gray-100 placeholder:text-gray-500 focus:ring-emerald-400 focus:border-emerald-400"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 bg-white/10 border-white/10 text-gray-100 placeholder:text-gray-500 focus:ring-emerald-400 focus:border-emerald-400"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 bg-white/10 border-white/10 text-gray-100 placeholder:text-gray-500 focus:ring-emerald-400 focus:border-emerald-400"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>

                {/* Password strength bar */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span className="text-gray-300">Password Strength</span>
                      <span className="text-gray-300">
                        {strengthLabels[strength] || "Too Short"}
                      </span>
                    </div>

                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(strength / 4) * 100}%` }}
                        transition={{ duration: 0.35 }}
                        className={`h-2 ${strengthClasses[strength] || "bg-red-500"}`}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 bg-white/10 border-white/10 text-gray-100 placeholder:text-gray-500 focus:ring-emerald-400 focus:border-emerald-400"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-8 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-white"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>

                  {formData.confirmPassword && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      {passwordsMatch ? (
                        <Check className="text-emerald-400 h-4 w-4" />
                      ) : (
                        <XCircle className="text-red-500 h-4 w-4" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Error message */}
              {error && (
                <p className="text-sm text-red-500 bg-red-500/10 rounded-md px-3 py-2">
                  {error}
                </p>
              )}

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:opacity-90 text-white font-semibold rounded-xl py-4"
                size="lg"
                disabled={success}
              >
                {success ? "Creating Account..." : "Create Account"}
              </Button>

              <p className="text-center text-sm text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-emerald-400 hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </form>
          </CardContent>

          {/* Success overlay */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-white/5 backdrop-blur-md z-20"
              >
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 120, damping: 12 }}
                  className="text-center"
                >
                  <CheckCircle2 className="mx-auto text-emerald-400 h-16 w-16 mb-3" />
                  <p className="text-lg font-semibold text-emerald-300">Account Created!</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
      <Footer/>
    </div>
  );
};

export default Register;
