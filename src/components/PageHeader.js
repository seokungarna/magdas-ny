import React from 'react'
import PropTypes from 'prop-types'
import Image from './Image'
import Content from './Content'
//import { Link } from 'gatsby'
import './PageHeader.css'
import scrollTo from 'gatsby-plugin-smoothscroll';

// const campaign = {};
// if(process.env.CAMPAIGN && process.env.CAMPAIGN == 'true') campaign.active = true;
// else campaign.active = false;
// campaign.active = true;

// campaign.percentage = 35;
// const month = ["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"];

// const d = new Date();
// campaign.month = month[d.getMonth()];

const PageHeader = ({
  title,
  subtitle,
  backgroundImage,
  large,
  offertknapp,
  className = '',
  hem = false,
  campaign
}) => {
  if (large) className += ' PageHeader-large'
  return (
    <div className={`PageHeader relative ${className}`}>
   
      {backgroundImage && (
        <Image
          background
          resolutions="large"
          src={backgroundImage}
          alt={title}
          size="cover"
        />
      )}
      {!hem &&
      <div className="container relative ">
        
        <h1 className="PageHeader--Title">{title}</h1>
        {subtitle && (
          <Content className="PageHeader--Subtitle" src={subtitle} />
        )}
      {offertknapp &&
       <button onClick={() => scrollTo('#bokaoss')} className="Button">{offertknapp}</button> }
       
      </div>
      }
      {hem && !campaign.active &&
        <div className="container relative">
          
        <h1 className="PageHeader--Title">{title}</h1>
        {subtitle && (
          <Content className="PageHeader--Subtitle" src={subtitle} />
        )}
      {offertknapp &&
        <button onClick={() => scrollTo('#bokaoss')} className="Button">{offertknapp}</button> }
        
      </div>
      }
       {hem && campaign.active &&
        <div className="container relative">
          
        <h1 className="PageHeader--Title">Magdas Fönsterputs</h1>
        <h3>Just nu har vi en oslagbar kampanj med hela {campaign.percentage}% rabatt!*</h3>
        <h5>*Gäller { campaign.month } ut.</h5><br></br>
      {offertknapp &&
       <button onClick={() => scrollTo('#bokaoss')} className="Button">{offertknapp}</button> 
      }
        
      </div>
      }
    
    </div>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default PageHeader
