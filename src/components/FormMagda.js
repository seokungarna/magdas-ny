import React, { Fragment } from 'react'
// import Helmet from 'react-helmet'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'

import './Form.css'

class Form extends React.Component {
  static defaultProps = {
    name: 'Magdas Fönsterputs',
    subjectoffert: 'Offert', 
    subjectflyttstad: 'Bokning',
    action: 'https://formspree.io/f/xrgrldjd', //prod
    // action: 'https://formspree.io/f/xlepjnol', //test
    method: 'POST',
    successMessage: 'Tack för din förfrågan, vi hör av oss inom kort',
    errorMessage: 'Nått gick snett, var vänlig e-maila eller ring oss.',
   
  }

  state = {
    alert: '',
    disabled: false,
    type: 'offert',
    privat_eller_foretag: 'privat',
    fastighetstyp: 'lagenhet',
    activefloor: 0,
    floor: [
      [0,0,0,0,0,0,0,0], // not used
      [0,0,0,0,0,0,0,0], // plan 1
      [0,0,0,0,0,0,0,0], // plan 2
      [0,0,0,0,0,0,0,0], // källare
      [0,0,0,0,0,0,0,0] // uterum
  ],
    floorstring : "",
  }
  setType(type) {
    this.setState({type : type.target.value});
    
  }

  setPrivateOrCompany(type) {
   
    this.setState({privat_eller_foretag : type.target.value});
  
  }

  setFloor(f) {
    console.log(f.target.value)
    this.setState({activefloor : parseInt(f.target.value)}, () => { console.log(this.state.activefloor) });
    
  }
  increaseThis(floor,windowtype) {
    console.log("floor:" + floor, "windowtype: ", windowtype)
    let key = floor;
    let keey = windowtype
    this.setState(prevState => ({

      floor: prevState.floor[key][keey]++
      
    }, () => { 
      return { floor } }
    ))
    console.log(this.state.floor)
    this.upDateFloorString(this.state.floor)
  }

  decreaseThis(floor,windowtype) {
    console.log("floor:" + floor, "windowtype: ", windowtype)
    let key = floor;
    let keey = windowtype
    if (this.state.floor[key][keey] === 0) return

    this.setState(prevState => ({

      floor: prevState.floor[key][keey]--
      
    }, () => { 
      return { floor } 
    }
    ))
    this.upDateFloorString(floor)
    console.log(this.state.floor)
    
    } 
  upDateFloorString(f) {
    console.log(f)
    console.log(f[1][0])
    let flooz = "";
    for (let i = 1; i < f.length; i++) {
      if (i == 1) flooz = flooz + "Våning 1: Stege: "+ f[i][0] + "Vanligt fönster: " + f[i][1] + " Delat fönster: "  + f[i][2] + " Fyrdelat fönster: "  + f[i][3] + " Sexdelat fönster: "  + f[i][4] + " Sextondelat fönster: "  + f[i][5] + " Takfönster: "  + f[i][6] + "<br>";
      else if (i == 2) flooz = flooz + "Våning 2: Stege: "+ f[i][0] + "Vanligt fönster: " + f[i][1] + " Delat fönster: "  + f[i][2] + " Fyrdelat fönster: "  + f[i][3] + " Sexdelat fönster: "  + f[i][4] + " Sextondelat fönster: "  + f[i][5] + " Takfönster: "  + f[i][6] + "<br>";
      else if (i == 3) flooz = flooz + "Källare: Stege: "+ f[i][0] + "Vanligt fönster: " + f[i][1] + " Delat fönster: "  + f[i][2] + " Fyrdelat fönster: "  + f[i][3] + " Sexdelat fönster: "  + f[i][4] + " Sextondelat fönster: "  + f[i][5] + " Takfönster: "  + f[i][6] + "<br>";
      else if (i == 4) flooz = flooz + "Vind : Stege: "+ f[i][0] + "Vanligt fönster: " + f[i][1] + " Delat fönster: "  + f[i][2] + " Fyrdelat fönster: "  + f[i][3] + " Sexdelat fönster: "  + f[i][4] + " Sextondelat fönster: "  + f[i][5] + " Takfönster: "  + f[i][6] + "<br>";
    }
    
    this.setState({floorstring : flooz}, () => { console.log(this.state.floorstring) });
  }
  getNumber(floor,windowtype) {

    return this.state.floor[floor][windowtype]
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
           <strong>Jag vill:</strong>
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
           <span>Boka fönsterputs</span>
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
        placeholder='Ort (obligatoriskt)'
        name='ort'
        required
      />
       <span>Ort (obligatoriskt)</span>
    </label>

    <div onChange={this.setPrivateOrCompany.bind(this)}>
       
       <label className="Form--Label Form--Radio">
         <input 
         className="Form--RadioInput"
         type="radio"
         name="privat_eller_foretag"
         value="privat"
         defaultChecked
         />
         <span>Privat</span>
         </label>
         <label className="Form--Label Form--Radio">
         
         <input 
         className="Form--RadioInput"
         type="radio"
         name="privat_eller_foretag"
         value="foretag"
 
        />
         <span>Företag</span>
         </label>
       
    </div>

   
    <div>
       
       <label className="Form--Label Form--Radio">
         <input 
         className="Form--RadioInput"
         type="radio"
         name="hur_ofta"
         value="enstaka"
         defaultChecked
         />
         <span>Enstaka</span>
         </label>
         <label className="Form--Label Form--Radio">
         
         <input 
         className="Form--RadioInput"
         type="radio"
         name="hur_ofta"
         value="abonnemang"
 
        />
         <span>Abonnemang</span>
         </label>
       
    </div>

    <div>
       
       <label className="Form--Label Form--Radio">
         <input 
         className="Form--RadioInput"
         type="radio"
         name="fastighetstyp"
         value="lagenhet"
         defaultChecked
         />
         <span>Lägenhet</span>
         </label>
         <label className="Form--Label Form--Radio">
         
         <input 
         className="Form--RadioInput"
         type="radio"
         name="fastighetstyp"
         value="hus"
 
        />
         <span>Hus</span>
         </label>
         <label className="Form--Label Form--Radio">
         
         <input 
         className="Form--RadioInput"
         type="radio"
         name="fastighetstyp"
         value="radhus"
 
        />
         <span>Radhus</span>
         </label>
       
    </div>

   

      <label  onChange={this.setFloor.bind(this)}  className="Form--Label has-arrow">
        <select className="Form--Input Form--Select" name="floor" required="">
          <option value='0' disabled="" hidden="" defaultValue >Välj våning</option>
          <option value='1'>Enplan</option>
          <option value='2'>Tvåplan</option>
          <option value='3'>Källare</option>
          <option value='4'>Uterum</option>
        </select>
      </label>
   
    <label className='Form--Label'>
      <div className="PostCard--ImageJK">
        <img src="/images/s1.png" alt="En galge med kläder" className="Content-Image"></img><br></br>
        <span className="btn-small-jk" onClick={this.increaseThis.bind(this,this.state.activefloor,0)} >+</span>
        { this.state.floor[this.state.activefloor][0] }
        <span className="btn-small-jk" onClick={this.decreaseThis.bind(this,this.state.activefloor,0)} >-</span>
      </div>
      <div className="PostCard--ImageJK">
        <img src="/images/v1.png" alt="En galge med kläder" className="Content-Image"></img><br></br>
        <span className="btn-small-jk" onClick={this.increaseThis.bind(this,this.state.activefloor,1)} >+</span>
        { this.state.floor[this.state.activefloor][1] }
        <span className="btn-small-jk" onClick={this.decreaseThis.bind(this,this.state.activefloor,1)} >-</span>
      </div>
      <div className="PostCard--ImageJK ">
        <img src="/images/v2.png" alt="En galge med kläder" className="Content-Image"></img><br></br>
        <span className="btn-small-jk" onClick={this.increaseThis.bind(this,this.state.activefloor,2)} >+</span>
        { this.state.floor[this.state.activefloor][2] }
        <span className="btn-small-jk" onClick={this.decreaseThis.bind(this,this.state.activefloor,2)} >-</span>
      </div>
      <div className="PostCard--ImageJK">
        <img src="/images/v4.png" alt="En galge med kläder" className="Content-Image"></img><br></br>
        <span className="btn-small-jk" onClick={this.increaseThis.bind(this,this.state.activefloor,3)} >+</span>
        { this.state.floor[this.state.activefloor][3] }
        <span className="btn-small-jk" onClick={this.decreaseThis.bind(this,this.state.activefloor,3)} >-</span>
      </div>
      <div className="PostCard--ImageJK ">
        <img src="/images/v6.png" alt="En galge med kläder" className="Content-Image"></img><br></br>
        <span className="btn-small-jk" onClick={this.increaseThis.bind(this,this.state.activefloor,4)} >+</span>
        { this.state.floor[this.state.activefloor][4] }
        <span className="btn-small-jk" onClick={this.decreaseThis.bind(this,this.state.activefloor,4)} >-</span>
      </div>
      <div className="PostCard--ImageJK ">
        <img src="/images/v8.png" alt="En galge med kläder" className="Content-Image"></img><br></br>
        <span className="btn-small-jk" onClick={this.increaseThis.bind(this,this.state.activefloor,5)} >+</span>
        { this.state.floor[this.state.activefloor][5] }
        <span className="btn-small-jk" onClick={this.decreaseThis.bind(this,this.state.activefloor,5)} >-</span>
      </div>
      <div className="PostCard--ImageJK">
        <img src="/images/vtak.png" alt="En galge med kläder" className="Content-Image"></img><br></br>
        <span className="btn-small-jk" onClick={this.increaseThis.bind(this,this.state.activefloor,6)} >+</span>
        { this.state.floor[this.state.activefloor][6] }
        <span className="btn-small-jk" onClick={this.decreaseThis.bind(this,this.state.activefloor,6)} >-</span>
      </div>
      {/* <div className="PostCard--ImageJK">
        <img src="/images/vgaller.png" alt="En galge med kläder" className="Content-Image"></img><br></br>
        <span className="btn-small-jk" onClick={this.increaseThis.bind(this,this.state.activefloor,7)} >+</span>
      </div> */}
      { this.state.activefloor }

   </label>
        <p>
          Enplan { this.state.floor[1] }
          <br></br>Andra våningen: Stege: { this.state.floor[2][0] } Fönster: { this.state.floor[2][1] } Tvådelat: { this.state.floor[2][2] }
          <br></br>Källarvåning: { this.state.floor[3] }
          <br></br>Vinden { this.state.floor[4] }

        </p>
        <p>
       { this.state.floorstring }
        </p>
   
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
