import React, { Component, useState } from 'react';
import { Button, Accordion, Card, Container, Form, Col, ThemeProvider } from 'react-bootstrap';
// import { MDBSelect } from "mdbreact";
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';
import Embed from '@editorjs/embed';
import Marker from '@editorjs/marker';
import Warning from '@editorjs/warning';
import Quote from '@editorjs/quote';
import Delimiter from '@editorjs/delimiter';
import ImageTool from '@editorjs/image';
// import SimpleImage from '@editorjs/simple-image';
import Table from "@editorjs/table";
import Paragraph from "@editorjs/paragraph";
import Cookies from 'js-cookie';
// import paragraph from "@editorjs/"
// import Embed from '@editorjs/';

const editor = new EditorJS({
    holder: 'editorjs',
    autofocus: true,
    tools: {
      // autofocus: true,
      // header: {
      //     class: Header,
      //     inlineToolbar: ['marker','link'],
          
      // },
      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        config: {
          placeholder: 'Write Here....'
        },
      },
      table: {
        class: Table,
        inlineToolbar: true,
        config: {
          rows: 2,
          cols: 3,
        },
      },
      header: {
        class: Header,
        /**
         * This property will override the common settings
         * That means that this tool will have only Marker and Link inline tools
         * If 'true', the common settings will be used.
         * If 'false' or omitted, the Inline Toolbar wont be shown
         */
        inlineToolbar: true,
        config: {
          placeholder: 'Header'
        },
        shortcut: 'CMD+SHIFT+H'
      },
  
      delimiter: Delimiter,
      warning: Warning,
      list: {
        class: List,
        inlineToolbar: [
          'link',
          'bold'
        ]
      },
      quote: Quote,
      checklist: {
       class: Checklist,
       inlineToolbar: true,
      },
      Marker: {
        class: Marker,
        shortcut: 'CMD+SHIFT+M',
      },
      embed: {
        class: Embed,
        inlineToolbar: false,
        config: {
         services: {
           youtube: true,
           coub: true
         },
        },
      },
      image: ImageTool,  
    }
  
  });

export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleAuthorClick = this.handleAuthorClick.bind(this);
        // this.submitForm = this.submitForm.bind(this);
        // this.handleClick().bind(this)
        this.state = {
            // acPerm: Cookies.get('acPerm'),
            acPerm: Cookies.get('user'),
            isLoggedIn: false,
            ac: '',
            showAuthorAccordian: false,
            values: {
                authorFN: "",
                authorMN:"",
                authorLN:"",
                authorTel: "",
                authorStatus: "",
                authorAddr: "",
                authorEmail: "",
            },
            isSubmitting: false,
            isError: false,
            articleValues: {
                title: "",
                friendlyName: "",
                contentType: "",
                disclaimerId : "",
                authById: "",
                copyId: "",
                articleStatus: "",
                winTitle : "",
                language : "",
                articleContent : "",
            },
        };
    }

    saveArticle = () => {    
        editor.save().then((output) => {
            console.log('Article Data:', output)
            this.setState({ac: output})
            console.log("kjaxkajbxkajb",this.state.ac)

        }).catch((error)=>{
            console.log("Saving Failed", error)
        });
    }

    handleAuthorClick() {
        this.setState({showAuthorAccordian: true});
    }

    handleAuthorHideClick() {
        this.setState({showAuthorAccordian: false})
    }

    handleLoginClick() {
      this.setState({isLoggedIn: true});
    }
  
    handleLogoutClick() {
      this.setState({isLoggedIn: false});
    }

    // login = async e => {
    //     e.preventDefault();
    //     console.log(this.state);
    //     fetch('/login?email=mr.sahilgupta@gmail.com&rempwd=on&psw=Sahil123&cmd=login')
    //     .then(response => response.json())
    //     .then(data => this.setState({ totalReactPackages: data.total }));
    //   };
    // ARTICLE SUBMIT

    submitArticleForm = async e => {
        e.preventDefault();
        console.log(JSON.parse(JSON.stringify(this.state.articleValues)))
        this.setState({ isSubmitting: true });

        const res = await fetch("/content?cmd=createArticle", {
            method: "POST",
            body: `title=${this.state.articleValues.title}&language=${this.state.articleValues.language}&friendlyName=${this.state.articleValues.friendlyName}&contentType=${this.state.articleValues.contentType}&disclaimerId=${this.state.articleValues.disclaimerId}&authById=${this.state.articleValues.authById}&copyId=${this.state.articleValues.copyId}&articleStatus=${this.state.articleValues.articleStatus}&winTitle=${this.state.articleValues.winTitle}&articleContent=${JSON.stringify(this.state.ac)}`,
            headers: {
            "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        this.setState({ isSubmitting: false });
        const data = await res.text();
        !data.hasOwnProperty("error")
        ? this.setState({ message: data.success })
        : this.setState({ message: data.error, isError: true });

        setTimeout(
        () =>
            this.setState({
            isError: false,
            message: "",
            values: { email: "", password: "" }
            }),
        1600
        );
    }

    handleArticleChange = e => 
        this.setState({
            articleValues: { ...this.state.articleValues, [e.target.name]: e.target.value }
        });

    submitForm = async e => {
        e.preventDefault();
        console.log(JSON.parse(JSON.stringify(this.state.values)))
        this.setState({ isSubmitting: true });

        const res = await fetch("/author?cmd=createAuthor", {
            method: "POST",
            body: `authorFN=${this.state.values.authorFN}&authorMN=${this.state.values.authorMN}&authorLN=${this.state.values.authorLN}&authorTel=${this.state.values.authorTel}&authorStatus=${this.state.values.authorStatus}&authorAddr=${this.state.values.authorAddr}&authorEmail=${this.state.values.authorEmail}`,
            headers: {
            "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        this.setState({ isSubmitting: false });
        const data = await res.text();
        !data.hasOwnProperty("error")
        ? this.setState({ message: data.success })
        : this.setState({ message: data.error, isError: true });

        setTimeout(
        () =>
            this.setState({
            isError: false,
            message: "",
            values: { email: "", password: "" }
            }),
        1600
        );
    };

    handleInputChange = e =>
    this.setState({
      values: { ...this.state.values, [e.target.name]: e.target.value }
    });

    render() {
        console.log("Account Session:"+ this.state.acPerm)
        const isLoggedIn = this.state.isLoggedIn;
        const showAuthorAccordian = this.state.showAuthorAccordian;
        const acPerm = this.state.acPerm;
        
        let button;
        let showAuthorButton;

        if(showAuthorAccordian) {
            showAuthorButton = <HideAccordian onClick={this.handleAuthorClick}/>
        } else {
            showAuthorButton = <CreateAccordian onClick={this.handleAuthorClick}/>
            console.log(showAuthorButton)
        }

        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }

    
      return (
        <div>
            <Container className="my-4">
                {/* <Form> */}
                {/* The user is <b></b> logged in. */}
                {/* <button onClick={this.submitArticleForm}>test post</button>
                <button onClick={this.submitForm}>Test Login</button> */}
                    <Card className="mainCard" >
                        <Card.Header className="mainTitle">ARTICLE</Card.Header>
                        <Accordion>
                        <Greeting isLoggedIn={isLoggedIn} />

                        {/* AUTHOR ACCORDIAN */}

                        <Author acPerm={this.state.acPerm} showAuthorButton={showAuthorButton}/>

                        <Form onSubmit={this.submitForm}>
                            <CreateAuthorAccordian showAuthorAccordian={showAuthorAccordian} this={this} state={this.state.values}/>
                        </Form>

                         {/* Article Details  */}
                        <authorAccordian/>
                        <Form onSubmit = {this.submitArticleForm}>
                        <Card>
                            <Card.Header style={{backgroundColor: "white"}}>
                                <Accordion.Toggle as={Card.Header} variant="link" eventKey="2" className="bg-black">
                                Article Details
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                    <Form.Group>
                                        <Form.Control type="text" name="title" value={this.state.values.title}
                                        onChange={this.handleArticleChange} placeholder="Article Title" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control type="text" name="friendlyName" value={this.state.values.friendlyName}
                                        onChange={this.handleArticleChange} placeholder="Friendly Name" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control type="text" name="contentType" value={this.state.values.contentType}
                                        onChange={this.handleArticleChange} placeholder="Content Type" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control type="text" name="disclaimerId" value={this.state.values.disclaimerId}
                                        onChange={this.handleArticleChange} placeholder="Disclaimer Id" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control type="text" name="copyId" value={this.state.values.copyId}
                                        onChange={this.handleArticleChange} placeholder="Copyright Id" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control type="text" name="articleStatus" value={this.state.values.articleStatus}
                                        onChange={this.handleArticleChange} placeholder="Article status" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control type="text" name="winTitle" value={this.state.values.winTitle}
                                        onChange={this.handleArticleChange} placeholder="Win Title" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control type="text" name="language" value={this.state.values.language}
                                        onChange={this.handleArticleChange} placeholder="Language" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control type="text" name="articleContent" value={this.state.values.articleContent}
                                        onChange={this.handleArticleChange} placeholder="Article Content" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Control type="text" name="authById" value={this.state.values.authById}
                                        onChange={this.handleArticleChange} placeholder="Author By ID" />
                                    </Form.Group>
                                    <Button type="submit" variant="dark">Save Article</Button>
                                    {/* <Form.Group>
                                        <Form.Control type="text" placeholder="" />
                                    </Form.Group> */}
                                    {/* <Form.Group>
                                        <Form.Label>Specialization(Diseases and Conditions)</Form.Label>
                                        <Form.Control as="select">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Language</Form.Label>
                                        <Form.Control as="select">
                                            <option>English</option>
                                            <option>Chinese</option>
                                            <option>Persian</option>
                                        </Form.Control>
                                    </Form.Group> */}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>

                        {/* Editor Accordion  */}
                
                            <Card>
                                <Card.Header style={{backgroundColor: "white", width: "109%"}}>
                                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="3">
                                    Write Article Here 📝
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="3">
                                    <Card.Body>
                                    <div id="editorjs"></div>
                                    </Card.Body>
                                </Accordion.Collapse>
                                <Card.Footer>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Check me out" />
                                    </Form.Group>
                                    <Button onClick={this.saveArticle} variant="primary">Submit</Button>
                                </Card.Footer>
                            </Card>
                            </Form>
                        </Accordion>
                    </Card>
                    {button}
                <Card className="my-4 mainCard">
                    <div id="articlePreview" className="content"></div>
                </Card>
                {/* <div id="editorjs"></div> */}
            </Container>
        </div>
        );
        }
    }
    
    function Article(props) {
        
        return(
            <Card>
                <Card.Header style={{backgroundColor: "#fff"}}>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                       Author Details 👩‍⚕️
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
            
                    <Card.Body>
                        <Form.Group>
                            <Form.Label>Author</Form.Label>
                            <Form.Control as="select">
                                <option>Enter name</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Article type"></Form.Control>
                        </Form.Group>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        );
    }

    function Author(props){

        if(props.acPerm){      // Check if User in session
            return null;        
        }
        console.log("props acperm:"+props.acPerm)
        console.log("props showAUthoracc:"+ props.showAuthorButton)
        return(
            <Card>
                <Card.Header style={{backgroundColor: "#fff"}}>
                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                        Author Details 👩‍⚕️
                    </Accordion.Toggle>
                </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>Author By ID</Form.Label>
                                    <Form.Control as="select">
                                        <option>Enter name</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Form.Control>
                            </Form.Group>
                                {props.showAuthorButton}                
                        </Card.Body>
                    </Accordion.Collapse>
            </Card>
        );
    }

//   function UserGreeting(props) {
//     return <h1>Welcome back!</h1>;
//   }
  
//   function GuestGreeting(props) {
//     return <h1></h1>;
//   }
  
  function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return <Article />;
    }
    return null;
  }

  function CreateAccordian(props){
      return (
        <button onClick={props.onClick}>
          Create Author
        </button>
      );
  }

  function HideAccordian(props){
      return(
        <button onClick={props.onClick}>
            Hide Author
        </button>
      )
  }

  function LoginButton(props) {
    return (
      <button onClick={props.onClick}>
        Login
      </button>
    );
  }
  
  function LogoutButton(props) {
    return (
      <button onClick={props.onClick}>
        Logout
      </button>
    );
  }

// AUTHOR ACCORDIAN

function CreateAuthorAccordian(props) {
    const showAuthorAccordian = props.showAuthorAccordian;
    if(showAuthorAccordian){
        console.log("STATE:" + JSON.stringify(props.state))
        return (
            // <Form onSubmit={this.submitForm.bind(this)}>
                <Card>
                    <Card.Header style={{backgroundColor: "#fff"}}>
                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="4">
                            Create Author 👩‍⚕️
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="4">
                    
                        <Card.Body>
                            <Form.Group>
                                <Form.Control type="text" id="authorFN" name="authorFN" value={props.state.authorFN}
                                onChange={props.this.handleInputChange} placeholder="First Name"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="text" id="authorMN" name="authorMN" value={props.state.authorMN}
                                onChange={props.this.handleInputChange} placeholder="Middle Name"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="text" id="authorLN" name="authorLN" value={props.state.authorLN}
                                onChange={props.this.handleInputChange} placeholder="Last Name"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="text" id="authorTel" name="authorTel" value={props.state.authorTel} onChange={props.this.handleInputChange} placeholder="Phone Number"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="text" id="authorStatus" name="authorStatus" value={props.state.authorStatus} onChange={props.this.handleInputChange} placeholder="Status"></Form.Control>   
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="text" id="authorAddr" name="authorAddr" value={props.state.authorAddr} onChange={props.this.handleInputChange} placeholder="Address"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="text" id="authorEmail" name="authorEmail" value={props.state.authorEmail} onChange={props.this.handleInputChange} placeholder="Email"></Form.Control>
                            </Form.Group>
                            <Button type="submit" id="postAuthor" variant="dark">Save Author</Button>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                // {/* // <div className={`message ${this.state.isError && "error"}`}>
                //     {this.state.isSubmitting ? "Submitting..." : this.state.message}
                // </div> */}
            // </Form>
        );
    }
    return null;
}