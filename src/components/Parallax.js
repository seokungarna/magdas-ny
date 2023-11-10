import React from 'react'
import './Parallax.css'

export default () => (
    <section >
        <div className="Parallax" style={{
            backgroundImage: `url(/images/flyttstadning_hel.webp)`
        }}>
        <div className="Overlay">
         <div className="container">
            <div className="Paratitle">
                <strong>Priser flyttstädning Helsingborg</strong>
                <p className="Paradesc"><strong>Från 1400 kr</strong><br></br>
                    Vi tillämpar följande prissättning för flyttstädning Helsingborg.
                    samtliga priser är inklusive 25% moms och efter 50% rutavdrag </p>
            </div>
            <ul>        
            
                <li> <span className="Left">0 - 49 kvm </span><span className="Separator"></span>
                <span className="Right">1400 kronor</span></li>
                <li> 50 - 59 kvm<span className="Separator"></span>
                1600 kronor</li>
                <li> 60 - 69 kvm<span className="Separator"></span>
                1800 kronor</li>
                <li> 70 - 79 kvm<span className="Separator"></span>
                2000 kronor</li>
                <li> 80 - 89 kvm<span className="Separator"></span>
                2200 kronor</li>
                <li> 90 - 99 kvm<span className="Separator"></span>
                2400 kronor</li>
                <li> 100 - 114kvm<span className="Separator"></span>
                2600 kronor</li>
                <li> 115 - 124kvm<span className="Separator"></span>
                2800 kronor</li>
                <li> 125 - 136kvm<span className="Separator"></span>
                3000 kronor</li>
                <li> 137 - 148 kvm<span className="Separator"></span>
                3200 kronor</li>
                <li> 149 - 159 kvm<span className="Separator"></span>
                3400 kronor</li>
                <li> 
                Över 159 kvm<span className="Separator"></span>
                begär offert</li>
            </ul>
            <div className="PostSection">
                <div className="PostSection--GridJK">
                    <div className="Paratitle">
                        <p className="Paradesc">Administrativ avgift på 25 kronor tillkommer.<br></br>
                    
                        Notera att dessa punkter debiteras extra:<br></br>

                        Kort varsel precis vid månadsskifte: 200 kronor<br></br>
                        Balkong: 300 kronor<br></br>
                        Inglasad balkong: 400 kronor<br></br>
                        Vind (i hyreshus): 300 kronor<br></br>
                        Källare i hyreshus: 300 kronor<br></br>
                        </p>
                    </div>
                    <div className="PostCard--HomeP relative">
                        <p>
                        Vi erbjuder även prisgaranti, det vill säga, om du hittar samma tjänst till lägre pris än oss matchar vi det priset.
                       <br></br><br></br></p>
                        <a href="/#bokaoss"><div className="Button">Boka din städning nu</div></a>

                    </div>
                </div>
            </div>
        
         </div>
        </div>
        </div>
    </section>
)
