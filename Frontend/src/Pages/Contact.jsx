import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">

      {/* Background glow (matches login/register) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.15),transparent_35%)] pointer-events-none" />

      {/* Floating lights */}
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full"
      />
      <motion.div
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ repeat: Infinity, duration: 10 }}
        className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a question about our products or need help with your order? We're here to help you find the perfect gear.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-300">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-gray-400">
                      123 Sports Avenue<br />
                      Athletic District<br />
                      Sports City, SC 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-emerald-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-400">
                      0553269932<br />
                      0553269932
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-cyan-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-400">
                      info@precisionsports.com<br />
                      support@precisionsports.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Business Hours</h3>
                    <p className="text-gray-400">Mon–Fri: 9AM–8PM<br />Sat: 10AM–6PM<br />Sun: 11AM–5PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white">Quick Help</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Track Your Order', 'Return Policy', 'Size Guide', 'FAQ'].map((item) => (
                    <Button
                      key={item}
                      variant="outline"
                      className="w-full justify-start bg-white/10 hover:bg-white/20 border-white/10 text-gray-200"
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-white">
                  Send Us a Message
                </CardTitle>
                <p className="text-gray-400">
                  Fill out the form below and we'll get back to you shortly.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
                      <Input id="firstName" name="firstName" placeholder="Your first name" className="bg-white/10 border-white/10 text-gray-100 placeholder:text-gray-500" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
                      <Input id="lastName" name="lastName" placeholder="Your last name" className="bg-white/10 border-white/10 text-gray-100 placeholder:text-gray-500" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                      <Input id="email" type="email" placeholder="you@example.com" className="bg-white/10 border-white/10 text-gray-100 placeholder:text-gray-500" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="0553269932" className="bg-white/10 border-white/10 text-gray-100 placeholder:text-gray-500" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                    <Select>
                      <SelectTrigger className="bg-white/10 border-white/10 text-gray-100">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent className="bg-blue-500 border-white/10 text-gray-100">
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="product">Product Question</SelectItem>
                        <SelectItem value="order">Order Support</SelectItem>
                        <SelectItem value="return">Returns & Exchanges</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-300">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Please describe your question or concern..."
                      className="min-h-[120px] bg-white/10 border-white/10 text-gray-100 placeholder:text-gray-500"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:opacity-90 transition"
                  >
                    <Send className="mr-2 h-5 w-5" /> Send Message
                  </Button>

                  <p className="text-sm text-gray-400 text-center">
                    We typically respond within 24 hours on business days.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-20">
          <Card className="backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-white">Visit Our Store</CardTitle>
              <p className="text-gray-400">
                Come see our collection in person and chat with our team.
              </p>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64 bg-white/5 border-white/10 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-400">Interactive map placeholder</p>
                  <p className="text-sm text-gray-500 mt-2">
                    123 Sports Avenue, Athletic District, Sports City, SC 12345
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Contact;
