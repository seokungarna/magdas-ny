import React from 'react'
// import InstagramFeed from './InstagramFeed'
import './Footer.css'
import { Smartphone, Mail, Info, Disc } from 'react-feather'

export default () => (
  <div>
    {/* <h2 className="taCenter">
      Follow us{' '}
      <a href="https://instagram.com/thrivegoldcoast/">@tjay</a>
    </h2>
    <br /> */}
    {/* <InstagramFeed count="8" /> */}
    <footer className="footer">
   
    <section className="Contact--Section1">
      <div className="container Contact--Section1--Container">
      <div className="Contact--Details">
      
         <a className="Contact--Details--Item" href="/detta-ingar-i-flyttstadningen/">
                <Disc />Detta ingår i flyttstädningen
              </a>
        <a className="Contact--Details--Item" href="/kontakt/">
          <Disc />Kontakt
        </a>
        <a className="Contact--Details--Item" href="/om-oss-pa-flyttstadning-helsingborg/">
          <Disc />Om oss på flyttstädning Helsingborg
        </a>
        <a className="Contact--Details--Item" href="/vanliga-fragor/">
          <Disc />Vanliga frågor
        </a>
      </div>
              <div className="Contact--Details">
              <a className="Contact--Details--Item" href="/flyttguiden/">
          <Disc />Flyttguiden
        </a>
          
              <a className="Contact--Details--Item" href="tel:073 637 99 08">
                <Smartphone /> 073 637 99 08
              </a>
          
         
              <a className="Contact--Details--Item" href="mailto:info@xn--flyttstdning-helsingborg-wbc.nu">
                <Mail /> info@flyttstädning-helsingborg.nu
              </a>
              <a className="Contact--Details--Item" href="/kontakt/">
                <Info /> Org nr 559241-9229
              </a>
          
          </div>
       

        </div>
        </section>
      
    </footer>
  </div>
)
