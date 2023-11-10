import React, { Fragment } from 'react'
// import Helmet from 'react-helmet'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'

import './Form.css'

class Form extends React.Component {
  static defaultProps = {
    name: 'Flyttstädning-Helsingborg',
    subjectoffert: 'Flyttstädning-Helsingborg Offert', 
    subjectflyttstad: 'Flyttstädning-Helsingborg Bokning',
    action: 'https://formspree.io/f/xrgrldjd', //prod
    // action: 'https://formspree.io/f/xlepjnol', //test
    method: 'POST',
    successMessage: 'Tack för din förfrågan, vi hör av oss inom kort',
    errorMessage: 'Nått gick snett, var vänlig e-maila eller ring oss.',
   
  }

  state = {
    alert: '',
    disabled: false,
    type: 'offert'
  }
  setType(type) {
   
    this.setState({type : type.target.value});
  
  }
  handleSubmit = e => {
    e.preventDefault()
    if (this.state.disabled) return
    const form = e.target
    const data = serialize(form)
    if (data.info !== '') {
      this.setState({
        alert: "Informationen inte skickad (I). Tack!",
        disabled: true
      })
        return
    }
    if (data.matrix !== '') {
      this.setState({
        alert: "Informationen inte skickad (E). Tack!",
        disabled: true
      })
        return
    }

    delete data.matrix;
    delete data.info;
    data._replyto = data.email;

    this.setState({ disabled: true })
    fetch(form.action, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        //'Content-Type': 'application/json'
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:  stringify(data),
    })
      .then(res => {
        if (res.ok) {
          return res
        } else {
          console.log(res);
        // throw new Error('Network error')
        }
      })
      .then(() => {
        form.reset()
        this.setState({
          alert: this.props.successMessage,
          disabled: false
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          disabled: false,
          alert: this.props.errorMessage
        })
      })
  }

  render() {
    const { name, subjectoffert,subjectflyttstad, action } = this.props

    return (
      <Fragment>
        {/* <Helmet>
          {<script src="https://www.google.com/recaptcha/api.js" />}
        </Helmet> */}
           <strong>Jag vill..</strong>
         <div onChange={this.setType.bind(this)}>
       
         <label className="Form--Label Form--Radio">
           <input 
           className="Form--RadioInput"
           type="radio"
           name="type"
           value="offert"
           defaultChecked
           />
           <span>Få offert</span>
           </label>
           <label className="Form--Label Form--Radio">
           
           <input 
           className="Form--RadioInput"
           type="radio"
           name="type"
           value="flyttstad"
   
         />
           <span>Boka flyttstädning</span>
           </label>
         
           </div>
  {this.state.alert && (
        <div className="Form--Alert">{this.state.alert}</div>
      )}
    {/* OFFERT FORM BEGINS HERE */}
    {this.state.type === 'offert' && !this.state.alert &&
    <form
      className="Form"
      name={name}
      action={action}
      onSubmit={this.handleSubmit}
      
    >      
       
     <label className='Form--Label'>
      <input
        className='Form--Input  Form--InputText'
        type='text'
        placeholder='Namn (obligatoriskt)'
        name='namn'
        required
      />
       <span>Namn (obligatoriskt)</span>
    </label>
    <label className='Form--Label'>
      <input
        className='Form--Input Form--InputText'
        type='email'
        placeholder='E-post (obligatoriskt)'
        name='email'
        required
      />
       <span>E-post (obligatoriskt)</span>
    </label>
    <label className='Form--Label'>
      <input
        className='Form--Input Form--InputText'
        type='text'
        placeholder='Ämne'
        name='amne'
        
      />
       <span>Ämne</span>
    </label>
    <label className='Form--Label'>
      <textarea
        className='Form--Input Form--Textarea Form--InputText'
        placeholder='Övrig Info'
        name='meddelande'
        rows='10'
     
      />
          <span>Meddelande</span>
    </label>

          {!!subjectoffert && <input type="hidden" name="subject" value={subjectoffert} />}
          <input type="hidden" name="form-name" value={name} />
         
          <label className="Form--Shelf"><span>email</span>
          <input autoComplete="off" className="Form--Shelf" type="text" name="matrix" placeholder="your matrix" defaultValue="" />
          </label>
         
          <label className="Form--Shelf"><span>info</span>
          <input autoComplete="off" className="Form--Shelf" type="text" name="info" placeholder="your info" defaultValue=""/>
          </label>
          <input
            className="Button Form--SubmitButton"
            type="submit"
            value="Skicka meddelande"
            disabled={this.state.disabled}
          />
        </form>
           }


           {/* FLYTTSTÄD FORM BEGINS HERE */}
           {this.state.type === 'flyttstad' && !this.state.alert && 
        <form
          className="Form"
          name={name}
          action={action}
          onSubmit={this.handleSubmit}
         
        >
          {this.state.alert && (
            <div className="Form--Alert">{this.state.alert}</div>
          )}
     
         <label className='Form--Label'>
      <input
        className='Form--Input  Form--InputText'
        type='text'
        placeholder='Namn (obligatoriskt)'
        name='namn'
        required
      />
       <span>Namn (obligatoriskt)</span>
    </label>

    <label className='Form--Label'>
      <input
        className='Form--Input Form--InputText'
        type='text'
        placeholder='Adress (obligatoriskt)'
        name='adress'
        required
      />
       <span>Adress (obligatoriskt)</span>
    </label>
 

    <label className='Form--Label'>
      <input
        className='Form--Input Form--InputText'
        type='email'
        placeholder='E-post (obligatoriskt)'
        name='email'
        required
      />
       <span>E-post (obligatoriskt)</span>
    </label>

    <label className="Form--Label">
            <input
              className="Form--Input Form--InputText"
              type="text"
              placeholder="Telefonnummer (obligatoriskt)"
              name="telefon"
              required
              />
             <span>Telefonnummer (obligatoriskt)</span>
     </label>

     <label className="Form--Label">
            <input
              className="Form--Input Form--InputText"
              type="text"
              placeholder="Kvadratmeter städyta (obligatoriskt)"
              name="kvadrat"
              required
            />
             <span>Kvadratmeter städyta (obligatoriskt)</span>
     </label>
     
     <label className="Form--Label">
            <input
              className="Form--Input Form--InputText"
              type="text"
              placeholder="Övriga städytor"
              name="ovriga_ytor"
             
            />
             <span>Övriga städytor</span>
     </label>
     <label className="Form--Label">
            <input
              className="Form--Input"
              type="date"
              placeholder="Datum för städning  (obligatoriskt)"
              name="datum"
              required
            />
             <span className="Form--InputTextRdy">Datum för städning (obligatoriskt)</span>
     </label>
     <label className="Form--Label">
            <input
              className="Form--Input Form--InputText"
              type="text"
              placeholder="Personnummer (obligatoriskt)"
              name="personnr"
              required
            />
             <span>Personnummer (obligatoriskt)</span>
     </label>
     <label className="Form--Label">
            <input
              className="Form--Input Form--InputText"
              type="text"
              placeholder="Fakturaadress"
              name="fakturaadress"
             
            />
             <span>Fakturaadress</span>
     </label>
     <label className='Form--Label'>
      <textarea
        className='Form--Input Form--Textarea Form--InputText'
        placeholder='Övrig Info'
        name='ovrig'
        rows='10'
     
      />
          <span>Övrig Info</span>
    </label>
         
          {/* <div className="g-recaptcha" data-sitekey="6Lf7gPwUAAAAAGD5RgY4pdjRMGn7n7ynDEBNNrdw"></div> */}
          {!!subjectflyttstad && <input type="hidden" name="subject" value={subjectflyttstad} />}
          <input type="hidden" name="form-name" value={name} />
         
          <label className="Form--Shelf"><span>email</span>
          <input autoComplete="off" className="Form--Shelf" type="text" name="matrix"  placeholder="your matrix"  defaultValue="" />
          </label>
         
          <label className="Form--Shelf"><span>info</span>
          <input autoComplete="off" className="Form--Shelf" type="text" name="info" placeholder="your info" defaultValue=""  />
          </label>
        
          <input
            className="Button Form--SubmitButton"
            type="submit"
            value="Skicka meddelande"
            disabled={this.state.disabled}
          />
        </form>
           }
           {/* FLYTTSTÄD FORM ENDS HERE */}
      </Fragment>
    )
  }
}

export default Form
