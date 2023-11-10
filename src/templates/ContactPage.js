import React from 'react'
import { MapPin, Smartphone, Mail } from 'react-feather'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
//import FormSimple from '../components/FormSimpleAjax'
import MagdaForm from '../components/FormMagda'
//import FormSimple from '../components/FormControlled'

// import FormSimple from '../components/FormSimple'
import Content from '../components/Content'
//import GoogleMap from '../components/GoogleMap'
import Layout from '../components/Layout'
import './ContactPage.css'

export const ContactPageTemplate = ({
  body,
  title,
  subtitle,
  featuredImage,
  address,
  phone,
  email,
  emailadr = "info@xn--flyttstdning-helsingborg-wbc.nu", //hard coded as fix for öäå
  locations
}) => (
  <main className="Contact">
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />
    <section className="section Contact--Section1">
      <div className="container Contact--Section1--Container">
        <div>
          <Content source={body} />
          <div className="Contact--Details jk--hide">
            {address && (
              <a
                className="Contact--Details--Item"
                href={`https://www.google.com.au/maps/search/${encodeURI(
                  address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin /> {address}
              </a>
            )}
            {phone && (
              <a className="Contact--Details--Item" href={`tel:${phone}`}>
                <Smartphone /> {phone}
              </a>
            )}
            {email && (
              <a className="Contact--Details--Item" href={`mailto:${emailadr}`}>
                <Mail /> {email}
              </a>
            )}
          </div>
        </div>

        <div>
          <MagdaForm name="Magdas Fönsterputs" />
        </div>
      </div>
    </section>

    {/* <GoogleMap locations={locations} /> */}
  </main>
 )

const ContactPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ContactPageTemplate {...page.frontmatter} body={page.html} />
  </Layout>
)

export default ContactPage

export const pageQuery = graphql`
  query ContactPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        template
        subtitle
        featuredImage
        address
        phone
        email
        locations {
          mapLink
          lat
          lng
        }
      }
    }
  }
`
