import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons"; // solid icons
import {faInstagram,faFacebookF,faTiktok} from "@fortawesome/free-brands-svg-icons"; 

function Home() {
  const [search, setSearch] = useState("");

  return (
    <div className="home">
      <section>
        <header className="header">
          <div className="logo">
            <img src="/pre-logo.png" alt="Logo" width="300" height="300" />
          </div>

          <div className="search">
            <input type="text" placeholder="Search products..."  />
          </div>

          <nav className="head-list">
            <ul className="head-list-nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </nav>
        </header>
      </section>
      <div>
        <div className="midpart">
          <h2>WE SELL ALL KINDS</h2>
          <h3>OF SPORTS GEAR & EQUIPMENTS</h3>
        </div>
      </div>

      <footer>
        <section className="last-sec">
          <div className="col-1 col">
            <ul>
              <li className="football">FOOTBALL</li>
              <li>JERSEYS (NATIONAL & CLUB TEAMS)</li>
              <li>JERSEY CUSTOMIZATION</li>
              <li>FOOTBALLS</li>
              <li>GOALKEEPER GLOVES</li>
              <li>BOOTS (KIDS & ADULTS)</li>
              <li>SHIN GUARDS,BIBS</li>
              <li>TRAINING CONES & AGILITY LADDERS</li>
            </ul> 
          </div>

          <div className="col-2 col">
            <ul>
              <li className="basketball">BASKETBALL</li> 
              <li>BASKETBALLS (INDOOR/OUTDOOR)</li>
              <li>BASKETBALL HOOPS</li>
              <li>NETS AND BACKBOARDS</li>
              <li>COMPRESSION SLEEVES & WRISTBANDS</li>
              <li>BASKETBALL</li>
              <li>MOUTH GUARDS</li>
            </ul>
          </div>

          <div className="col-3 col">
            <ul>
              <li className="gym">GYM & FITNESS</li>
              <li>GYM WEARS</li>
              <li>RESISTANCE BANDS</li>
              <li>YOGA/EXERCISE MATS</li>
              <li>JUMP ROPES</li>
              <li>GYM GLOVES</li>
            </ul>
          </div>


          <div className="col-4">
            <ul>
              <li className="general">GENERAL</li>
              <li>VOLLEYBALLS</li>
              <li>TENNISBALLS & RACKETS</li>
              <li>WATER BOTTLES & CARRIERS</li>
              <li>FIRST AID KITS & ICE PACKS</li>
              <li>WHISTLES</li>
              <li>KINOSIOLOGY TAPE</li>
              <li>EQUIPEMENT BAGS, ETC.</li>
            </ul>
          </div>
        </section>

        <div className="icons">
          <Link to="#" className="instagram"><FontAwesomeIcon icon={faInstagram} /></Link>
          <Link to="#" className="facebook"><FontAwesomeIcon icon={faFacebookF} /></Link>
          <Link to="#" className="tiktok"><FontAwesomeIcon icon={faTiktok} /></Link>
        </div>
        <span>
          <div className="last-span">
            ©
            <span>2025</span>  <p>Precision all rights reserved.</p>
          </div>
        </span>
  </footer>
      

      
    </div>
  );
}

export default Home;
