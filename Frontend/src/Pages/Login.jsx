import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext.jsx";
import Footer from "@/components/Footer";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.15),transparent_35%)]" />

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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="backdrop-blur-xl bg-white/5 border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <CardHeader className="text-center space-y-3 pt-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-[url('/public/ladywithball.webp')] bg-cover bg-center bg-no-repeat mx-auto w-16 h-16 from-blue-600 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-2xl"></span>
            </motion.div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <p className="text-gray-400 text-sm">
              Sign in to your Precision Sports account
            </p>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="pl-10 bg-white/10 border-white/10 text-gray-100 placeholder:text-gray-500 focus:ring-emerald-400 focus:border-emerald-400"
                  />
                </div>
              </div>

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
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="pl-10 pr-10 bg-white/10 border-white/10 text-gray-100 placeholder:text-gray-500 focus:ring-blue-400 focus:border-blue-400"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Remember Me / Forgot Password */}
              <div className="flex items-center justify-between">
<div className="flex items-center space-x-2">
  <Checkbox
    id="rememberMe"
    name="rememberMe"
    checked={formData.rememberMe}
    onCheckedChange={(checked) =>
      setFormData((prev) => ({ ...prev, rememberMe: checked }))
    }
    className="border-white/20 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
  />
  <Label htmlFor="rememberMe" className="text-sm text-gray-300">
    Remember me
  </Label>
</div>

                <Link
                  to="/forgot-password"
                  className="text-sm text-emerald-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Error */}
              {error && (
                <p className="text-sm text-red-500 bg-red-500/10 rounded-md p-2 text-center">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:opacity-90 text-white font-semibold rounded-xl py-6"
              >
                Sign In
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="bg-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-transparent px-2 text-gray-400">Or</span>
                </div>
              </div>

              {/* Register Link */}
              <div className="text-center text-gray-400">
                <p className="text-sm">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-emerald-400 hover:underline font-medium"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
      <Footer/>
    </div>
  );
};

export default Login;
