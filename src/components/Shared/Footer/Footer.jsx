/* eslint-disable no-unused-vars */
import React from "react";
import moment from 'moment';
import { FiFacebook, FiGithub, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
    <div>
          <footer className="footer p-10 bg-orange-400 text-white">
    <div>
      <span className="footer-title text-black">Services</span> 
      <a className="link link-hover">Branding</a> 
      <a className="link link-hover">Design</a> 
      <a className="link link-hover">Marketing</a> 
      <a className="link link-hover">Advertisement</a>
    </div> 
    <div>
      <span className="footer-title text-black">Company</span> 
      <a className="link link-hover">About us</a> 
      <a className="link link-hover">Contact</a> 
      <a className="link link-hover">Jobs</a> 
      <a className="link link-hover">Press kit</a>
    </div> 
    <div>
      <span className="footer-title text-black">Legal</span> 
      <a className="link link-hover">Terms of use</a> 
      <a className="link link-hover">Privacy policy</a> 
      <a className="link link-hover">Cookie policy</a>
    </div>
  </footer> 
  <footer className="footer bg-black px-10 py-4 border-t text-base-content border-base-300">
    <div className="items-center grid-flow-col">
      
      <p className="text-white">Top Musicy all right reserved 2023</p>
    </div> 
    <div className="md:place-self-center md:justify-self-end">
      <div className="grid grid-flow-col gap-4">
            <FiGithub className="text-white"></FiGithub>
            <FiFacebook className="text-white"></FiFacebook>
            <FiLinkedin className="text-white"></FiLinkedin>
      </div>
    </div>
  </footer>
      </div>
  );
};

export default Footer;
