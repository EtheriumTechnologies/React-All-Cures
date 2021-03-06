import styled from 'styled-components'
import posed from 'react-pose'

export default styled(posed.div({}))`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 2em auto;
  align-items: center;
  text-align: center;

  a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }

  input {
    background: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
  }

  button {
    color: #fff;
    font: inherit;
    cursor: pointer;
    background: #00415e;
    border-radius: 3em;
    border: 2px solid;
    padding: .5rem 2em;
    transition: transform 80ms ease-in, -webkit-transform 80ms ease-in;
  }

  button span {
    color: #fff;
  }
  button:active {
    background: #004180
  }

  .text-dark span{
    color: darkcyan
  }
  .container__form {
    padding: 4rem;
    overflow: hidden;
  }

  .container__form--one {
    grid-column: 1 / span 1;
    grid-row: 1;
  }

  .container__form--two {
    grid-column: 2 / span 1;
    grid-row: 1;
  }

  .overlay {
    grid-column: 1;
    grid-row: 1;
    background: #b9daf1;
    text-align: center;
    color: #000
  }

  input[type="text"] {
    height: 40px;
}
input[type="email"] {
  height: 40px;
}

input[type="password"] {
  height: 40px;
}

.MuiFormControlLabel-root {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  margin-left: -11px;
  margin-right: 16px;
  vertical-align: middle;
  -webkit-tap-highlight-color: transparent;
  /* margin-bottom: 0px; */
  position: relative;
  bottom: 12px;
}
[type=button]:not(:disabled), [type=reset]:not(:disabled), [type=submit]:not(:disabled), button:not(:disabled) {
  cursor: pointer;
  position: relative;
  bottom: 20px;
  margin-top: 22px;
}

.container__form {
  padding: 4rem;
  margin-top: 30px;
  overflow: hidden;
}





@media only screen and (max-width: 364px) {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;


  max-width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 2rem auto;
  align-items: center;
  text-align: center;

  a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }

  input {
    background: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
  }

  h1{
    font-size: 20px;
    margin-left:-39px;
    margin-top: 20px;

  }

  p{
    font-size: smaller;
    margin-left: -38px;
    margin-top: 7px;
  }
  #b1{
    margin-left: -25px; 
   }

   input[type="text"] {
    height: 20px;
}
input[type="email"] {
  height: 20px;
}

input[type="password"] {
  height: 20px;
}
.container__form--two {
  padding: 105px 20px 15px 20px;
  
  }
  .container__form{
    padding: 105px 20px 15px 20px;
    
    }
  #p2{
    margin-left:0px;
    margin-top:0;
  }
   #he2
   {
     margin-left: 1px;
     margin-top: -70px;
     font-size: medium;
   }
   
.MuiFormControl-root {
  margin-top: -15px;
  margin-bottom: 20px;
}

#b2{
 margin-top: 0px;
 font-size: .7rem;
}

input[type="text"] {
  padding: 12px;
}

input[type="email"] {
  padding: 12px;
}
input[type="password"] {
  padding: 12px;
}

.MuiTypography-body1{
  font-size: .7rem;
}
.MuiInputLabel-shrink {
  transform: translate(0, 1.5px) scale(0.75);
  transform-origin: top left;
  display: none;
}

#he3{
  font-size:25px;
  margin-left:100px;
}
#p3{
  position:relative;
  left:140px;
}
#b3{
margin-left: 110px;
}

#b4
{
 position:relative;
 left:-50px;
 width:max-content;
}

#he4
{
  font-size: 30px;
  margin-top:-60px;
}
#p4{
  width: max-content;
  margin-left: -50px;
  margin-top: -20px;
}
}


@media only screen and (min-width: 365px) and (max-width:767px)
{
  max-width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 3.5rem auto;
  align-items: center;
  text-align: center;
  h1{
    font-size: 30px;
    margin-left:-42px;
    margin-top: 20px;

  }
  input[type="text"] {
    height: 20px;
}
input[type="email"] {
  height: 20px;
}

input[type="password"] {
  height: 20px;
}

  p{
    font-size: 14px;
    margin-left: -42px;
    margin-top: 7px;
  }
  #b1{
    margin-left: -25px; 
   }

.container__form--two {
  padding: 105px 20px 15px 20px;
  
  }
  .container__form{
    padding: 105px 20px 15px 20px;
    
    }
  #p2{
    margin-left:0px;
    margin-top:0;
  }
   #he2
   {
     margin-left: 1px;
     margin-top: -70px;
     font-size: medium;
   }
   
.MuiFormControl-root {
  margin-top: -15px;
  margin-bottom: 20px;
}

#b2{
  margin-top: 0px;
  font-size: .7rem;
 }

input[type="text"] {
  padding: 12px;
}

input[type="email"] {
  padding: 12px;
}
input[type="password"] {
  padding: 12px;
}

.MuiTypography-body1{
  font-size: .7rem;
}
.MuiInputLabel-shrink {
  transform: translate(0, 1.5px) scale(0.75);
  transform-origin: top left;
  display: none;
}
#he3{
  font-size:25px;
  margin-left:90px;
}
#p3{
  position:relative;
  left:130px;
}
#b3{
margin-left: 90px;
}

#b4
{
 position:relative;
 left:-50px;
 width:max-content;
}

#he4
{
  font-size: 30px;
  margin-top:-60px;
}
#p4{
  width: max-content;
  margin-left: -50px;
  margin-top: -20px;
}
}

@media only screen and (min-width: 768px){
 
  #b1{
    margin-left: 25px; 
    font-size: 1.5rem;
   }
   
#b3{
// margin-left: -50px;
}

}
#p4{
  width: max-content;
  margin-left: -50px;
  margin-top: -20px;
}
}

.alert-msg{
  margin:0.35rem;
}

`
