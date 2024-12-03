import React, { useState } from "react";
import "./home.css";

import { MdVerified } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { IoLogoGithub } from "react-icons/io5";
import { IoLogoLinkedin } from "react-icons/io";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../ani/3.json";
import { Button, Flex } from "antd";
import { FaDownload } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';

function Home() {
  const [loadings, setLoadings] = useState([]); // Manage loading states for multiple buttons
const navigate = useNavigate()


  return (
    <section id="Home" className="hero" >
      <div className="left-section ">
      <div className="logo1">
    <img src="https://static.vecteezy.com/system/resources/previews/012/986/755/non_2x/abstract-circle-logo-icon-free-png.png" alt="logo" />
  </div>
       
        <div className="desc">

        <h1>SALAH IA</h1>
<h2>
  Salah IA : Votre solution moderne et innovante en intelligence artificielle
</h2>
<p>
  Découvrez une plateforme puissante qui exploite l'IA moderne pour simplifier vos tâches, 
  améliorer votre productivité, et ouvrir de nouvelles possibilités. Avec Salah IA, transformez vos idées en réalité.
</p>

          <button className="buton" onClick={()=>{navigate("/chat")}}>
         Get started!
          </button>
        </div>
        
      </div>
      <div className="right-section flex">
  <div className="lottie">
    <Lottie animationData={groovyWalkAnimation} loop={true} />
    <div className="chat">
    <Lottie animationData={groovyWalkAnimation} loop={true} className="icon"/>
      <TypeAnimation
        sequence={[
          'IA the best thinkd',
          1000,
          
          'jkrzouefziufhiz"u',
          1000,
          'eizchzuyfcn eç_ugeç_g',
          1000,
          'àçtrç rç_ rjçr_jv çç_j vç',
          1000,
        ]}
        wrapper="span"
        speed={50}
        style={{ fontSize: '2em', display: 'inline-block' }}
        repeat={Infinity}
      />
    </div>
  </div>
</div>

    </section>
  );
}
export default Home