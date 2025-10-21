import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const overlayOpacity = Math.min(0.4 + scrollY / 800, 0.7);


  const parallaxY = window.innerWidth < 768 ? scrollY * 0.1 : scrollY * 0.3;

  return (
    <div>
      <section
        className="relative overflow-hidden bg-[url('/public/ladywithball.webp')] bg-cover bg-center bg-no-repeat text-white"
        style={{ backgroundPositionY: `${parallaxY}px` }}
      >
        <div
          className="absolute inset-0 transition-all duration-300"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(59,130,246,0.15), transparent 40%),
              radial-gradient(circle at 80% 0%, rgba(16,185,129,0.15), transparent 35%),
              rgba(0,0,0,${overlayOpacity})
            `,
          }}
        />

        <div className="container relative z-10 py-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight"
          >
            Elevate Your Game
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-200"
          >
            Premium gear and equipment for every sport. Built for performance, designed for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10 flex justify-center gap-4"
          >
            <Link
              to="/shop"
              className="btn-primary bg-blue-600 hover:bg-blue-950 text-white px-8 py-3 rounded-2xl font-semibold transition-transform transform hover:scale-105"
            >
              Shop Now
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-2xl border border-gray-300 px-8 py-3 font-semibold text-white hover:bg-white/10 transition-transform transform hover:scale-105"
            >
              Contact
            </Link>
          </motion.div>
        </div>

        
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
      </section>

      <section className="container py-20">
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Football"].map((a) => (
            <div
              key={a}
              className="rounded-xl border border-border p-6 bg-card/50 hover:bg-card transition"
            >
              <p className="font-semibold">{a}</p>
              <p className="text-muted-foreground text-sm mt-1">
                Jerseys (National & Club Teams)<br/>
                Jersey Customization<br/>
                Footballs<br/>
                Goalkeeper Gloves<br/>
                Boots (Kids & Adults)<br/>
                Shin Guards,Bibs<br/>
                Training Cones & Agility Ladders<br/>
              </p>
            </div>
          ))}
           {["Basketball"].map((b) => (
            <div
              key={b}
              className="rounded-xl border border-border p-6 bg-card/50 hover:bg-card transition"
            >
              <p className="font-semibold">{b}</p>
              <p className="text-muted-foreground text-sm mt-1">
              Basketballs (Indoor/Outdoor)<br/>
              Basketball Hoops<br/>
              Nets and Backboards<br/>
              Compression Sleeves & Wristbands<br/>
              Mouth Guards<br/>
              </p>
            </div>
          ))}
        

          {["Gym & Fitness"].map((c) => (
            <div
              key={c}
              className="rounded-xl border border-border p-6 bg-card/50 hover:bg-card transition"
            >
              <p className="font-semibold">{c}</p>
              <p className="text-muted-foreground text-sm mt-1">
              Gym Wear<br/>
              Resistance Bands<br/>
              Yoga/Exercise Mats<br/>
              Jump Ropes<br/>
              Gym Gloves<br/>
              </p>
            </div>
          ))}
      

         {["General"].map((d) => (
            <div
              key={d}
              className="rounded-xl border border-border p-6 bg-card/50 hover:bg-card transition"
            >
              <p className="font-semibold">{d}</p>
              <p className="text-muted-foreground text-sm mt-1">
              Volleyballs<br/>
              Tennis Balls & Rackets<br/>
              Water Bottles & Carriers<br/>
              First Aid Kits & Ice Packs<br/>
              Whistles<br/>
              Kinesiology Tape<br/>
              Equipment Bags, etc.<br/>
              </p>
            </div>
          ))}
         </div>
      </section>  
      <Footer/>  
    </div>
  );
}

export default Home;
