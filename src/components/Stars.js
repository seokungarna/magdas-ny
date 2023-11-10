import React from 'react'
import './Stars.css'
import { Star } from 'react-feather'

export default () => (
  <div className="starz">
  
    
    <section className="Contact--Section1">
        <div className="container Contact--Section1--Container">
            <div className="Contact--Details" >
            <p className="recen" >Kundrecension - flyttstädning</p>
            <p className="namez">Marcus</p>
            <div id="starcontainer" >
            <Star  className="feather"  /> <Star  className="feather"  /> <Star  className="feather"  /> <Star className="feather"  /> <Star className="feather"  />
            </div>
            <p className="comment">Jag har helnöjd med städningen och bemötandet. Rekommenderas starkt!</p>
            </div>
            <div className="Contact--Details" >
            <p className="recen" >Kundrecension - flyttstädning</p>
            <p className="namez">Frida</p>
            <div id="starcontainer" >
            <Star  className="feather"  /> <Star  className="feather"  /> <Star  className="feather"  /> <Star className="feather"  /> <Star className="feather"  />
            </div>
            <p className="comment">Jag är så nöjd! Städningen var felfri och allt fungerade toppen. Rekommenderar!</p>
            </div>
            <div className="Contact--Details" >
            <p className="recen" >Kundrecension - flyttstädning</p>
            <p className="namez">Alina</p>
            <div id="starcontainer" >
            <Star  className="feather"  /> <Star  className="feather"  /> <Star  className="feather"  /> <Star className="feather"  /> <Star className="feather"  />
            </div>
            <p className="comment">Köpte flyttstäd av lght om ca 110kvm. De var flexibla, prisvärda och har allt gick smidigt.</p>
            </div>
       

        </div>
        </section>
      
   
  </div>
)
