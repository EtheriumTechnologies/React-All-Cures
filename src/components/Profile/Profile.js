import React, { Component } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Rating from "../StarRating";  
import ClientA from "../../assets/img/client-a.jpg";

import '../../assets/healthcare/css/main.css';
import '../../assets/healthcare/css/responsive.css';
import '../../assets/healthcare/css/animate.css';
import '../../assets/healthcare/icomoon/style.css';
import { Container } from "react-bootstrap";
import Comment from "../Comment";
import axios from 'axios';
class Profile extends Component {
  constructor(props) {
    super(props);
    const params = props.match.params
    this.state = { 
      items: [],
      commentItems: [],
      isLoaded: false,
      param: params
    };
  }

  getComments() {
    console.log('fired');
    axios.get('/rating/target/1/targettype/1')
    .then(res => {
      console.log(res)
      this.setState({
        commentItems:res.data
      })
    })
    .catch(err => console.log(err))
    console.log('closed');
  }

  fetchDoctorData() {
    fetch(`/DoctorsActionController?docid=${this.state.param.id}&cmd=getProfile`)
      // .then(res => JSON.parse(res))
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          isLoaded: true,
          items: json,
        });
      });
  }

  componentDidMount() {
    
    this.fetchDoctorData()
    this.getComments()

      
  }

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {

      return(
        <>
          <Header/>
            <Container className="mt-5 my-5">
              <h3 className="text-left">Loading...</h3>
            </Container>
          <Footer/>
        </>  
      );

    } else if(isLoaded && items == null){
      return(
        <>
        <Header/>
          <Container className="mt-5 my-5">
          <h3 className="m-auto text-center"><span className="icon-loupe "></span></h3>
          <h3 className="text-center">Doctor not found</h3>
          </Container>
        <Footer/>
        </>
      )
    }else if (isLoaded) {

      return (
        <div>
          <Header />
          
          <section className="Profileleft">
            <div className="container">
              <div className="row">
                <div className="col-md-8 pd-0">
                  <div className="profile-card clearfix">
                    <div className="col-md-3">
                      <div className="profileImageBlok">
                        <div className="profile-card-img text-center">
                          <i className="fas fa-user-md fa-6x"></i>
                        </div>
                        {/* <div className="viewPhoto">
                          {" "}
                          <a href="//#">View Photos</a>{" "}
                        </div> */}
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="profile-info">
                        <div className="profile-infoL-card">
                          <div className="profile-info-name" id="DocDetails">
                            <h1>
                              Dr. {items.docname_first} {items.docname_middle}{" "}
                              {items.docname_last}{" "}
                            </h1>
                            <h3>{items.primary_spl}</h3>
                            <h2>{items.experience}</h2>
                            <h4>
                              {items.hospital_affliated} {items.statename}{" "}
                              {items.country_code}
                            </h4>
                            {/* <!--  <button onclick="loadUsers()">Click</button> --> */}
                          </div>
                          <div className="check-icon">
                            {" "}
                            <span className="icon-correct-2">
                              <span className="path1"></span>
                              <span className="path2"></span>
                              <span className="path3"></span>
                            </span>{" "}
                          </div>
                        </div>
                        <div className="rating-reviews">
                          <div className="profile-info-rating">
                            <h2>
                              <form
                                style={{
                                  marginTop: "6rem",
                                  paddingLeft: "2.7rem",
                                }}
                                class="rating"
                              >
                                <Rating />
                              </form>
                            </h2>
                          </div>
                          <div className="reviews">
                            {" "}
                            <a href="//#">123 Reviews</a>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="comment-box">
                    <Comment refreshComments={this.getComments} />
                  </div>
                  <div className="aboutDr">
                    <h2 id="about">
                      About Dr. {items.docname_first} {items.docname_middle}{" "}
                      {items.docname_last}
                    </h2>
                    <div id="about-contain">
                      
                      <p className="text one">
                        {" "}
                        “Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Integer at pulvinar ex. Sed non lorem a justo
                        dictum lobortis a sed arcu. Sed consectetur, erat sit
                        amet auctor finibus, felis velit scelerisque mauris, in
                        pellentesque lorem ex eget libero. Nam faucibus in lacus
                        vel accumsan. Suspendisse sed ipsum ornare mauris ornare
                        maximus nec eget nisi. Fusce ut ultrices neque, sit amet
                        vehicula ipsum. Vivamus quis vestibulum massa, nec
                        sagittis augue. Aenean ac facilisis purus. Proin auctor
                        viverra lacinia. Interdum et malesuada fames ac ante
                        ipsum primis in faucibus. Sed pulvinar vitae velit eu
                        luctus. Aliquam sapien metus, dictum eget venenatis ut,
                        pellentesque at neque.” Show Less{" "}
                      </p>
                    </div>
                    <br />
                    <div className="about-specialties">
                      <h2>Specialties</h2>
                      <ul>
                        <li>{items.primary_spl}</li>
                        {/* <li> </li>
                                <li> ajbakb</li> */}
                      </ul>
                      <ul>
                        <li>{items.other_spls}</li>
                        {/* <li>Cardiologist</li>
                                <li>Interventional Cardiologist</li> */}
                      </ul>
                    </div>
                    <br />
                    <div className="abt-eduction">
                      <h2>Education</h2>
                      <p>{items.edu_training}</p>
                    </div>
                    <br />
                    <div className="abt-photos">
                      <h2>Photos</h2>
                      <ul>
                        <li>
                          {" "}
                          <a href="//#"></a>{" "}
                        </li>
                        <li>
                          {" "}
                          <a href="//#"></a>{" "}
                        </li>
                        <li>
                          {" "}
                          <a href="//#"></a>{" "}
                        </li>
                        <li>
                          {" "}
                          <a href="//#"></a>{" "}
                        </li>
                        <li>
                          {" "}
                          <a href="//#"></a>{" "}
                        </li>
                        <li>
                          {" "}
                          <a href="//#"></a>{" "}
                        </li>
                        <li>
                          {" "}
                          <a href="//#"></a>{" "}
                        </li>
                        <li>
                          {" "}
                          <a href="//#"></a>{" "}
                        </li>
                      </ul>
                    </div>
                    <br />
                    <div className="abt-address">
                      <h2>Address</h2>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="map">
                            <iframe
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.598439251183!2d73.72995831436974!3d18.592134071835297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbc3bc58288d%3A0x93c746b34d487608!2sThe%20Digital%20Group%20Infotech!5e0!3m2!1sen!2sin!4v1603163746315!5m2!1sen!2sin"
                              width="300"
                              height="168.75px"
                              frameborder="0"
                              style={{ border: 0 }}
                              allowfullscreen=""
                              aria-hidden="false"
                              tabindex="0"
                            ></iframe>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="street">
                            <p>110 West 14th Street, New York, NY, 10011</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="profile-rating">
                    <div className="tab-nav">
                      <div className="rating-heading">
                        <div className="profile-info-rating">
                          <h2>Rating 4.2</h2>
                          <ul>
                            <li>
                              <i className="fas fa-star" aria-hidden="true"></i>
                            </li>
                            <li>
                              <i className="fas fa-star" aria-hidden="true"></i>
                            </li>
                            <li>
                              <i className="fas fa-star" aria-hidden="true"></i>
                            </li>
                            <li>
                              <i className="fas fa-star" aria-hidden="true"></i>
                            </li>
                            <li>
                              <i
                                className="fas fa-star-half"
                                aria-hidden="true"
                              ></i>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* <!-- Nav tabs --> */}
                      <ul className="nav">
                        <li className="active">
                          <a data-toggle="pill" href="/#patient">
                            Patient Reviews (123)
                          </a>
                        </li>
                        <li>
                          <a data-toggle="pill" href="/#recomended">
                            Recommendations
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="tab-content">
                      <div id="patient" className="tab-pane active">
                        <div className="rating-outer" id="rating">
                        {this.state.commentItems.map((item,i) => {
                            return (
                              <>
                                <div className="rating-patient">
                            <div className="rating-patient-grid clearfix">
                              <div className="paitent-profile">
                                {" "}
                                <img src={ClientA} alt="ClientA" />{" "}
                              </div>
                              <div className="patient-msg">
                              
                                <p>{item.comments}</p>
                              </div>
                              <div className="patient-name-add">
                                <div>
                                  <h3>Mahyar Eidgah</h3>
                                  <span>New York, NY</span>{" "}
                                </div>
                                <div className="patient-rating">
                                  <ul>
                                    <li>
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </li>
                                    <li>
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </li>
                                    <li>
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </li>
                                    <li>
                                      <i
                                        className="fa fa-star"
                                        aria-hidden="true"
                                      ></i>
                                    </li>
                                    <li>
                                      <i
                                        className="fa fa-star-half"
                                        aria-hidden="true"
                                      ></i>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                              </>
                            )
                          })}
                          
                          <div className="rating-patient">
                            <div className="rating-patient-grid clearfix">
                              <div className="paitent-profile">
                                {" "}
                                <img src={ClientA} alt="ClientA" />{" "}
                              </div>
                            </div>
                            <div className="patient-msg">
                              <p>
                                “Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Donec congue turpis
                                sollicitudin nulla finibus dignissim. Curabitur
                                eu urna sed risus tempor venenatis. Morbi quis
                                libero at odio elementum scelerisque at nec
                                libero. Integer quis magna nunc. Sed malesuada
                                efficitur tellus, a posuere risus finibus
                                vitae.”
                              </p>
                            </div>
                            <div className="patient-name-add">
                              <div>
                                <h3>Mahyar Eidgah</h3>
                                <span>New York, NY</span>{" "}
                              </div>
                              <div className="patient-rating">
                                <ul>
                                  <li>
                                    <i
                                      className="fa fa-star"
                                      aria-hidden="true"
                                    ></i>
                                  </li>
                                  <li>
                                    <i
                                      className="fa fa-star"
                                      aria-hidden="true"
                                    ></i>
                                  </li>
                                  <li>
                                    <i
                                      className="fa fa-star"
                                      aria-hidden="true"
                                    ></i>
                                  </li>
                                  <li>
                                    <i
                                      className="fa fa-star"
                                      aria-hidden="true"
                                    ></i>
                                  </li>
                                  <li>
                                    <i
                                      className="fa fa-star-half"
                                      aria-hidden="true"
                                    ></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="rating-patient">
                            <div className="rating-patient-grid clearfix">
                              <div className="paitent-profile">
                                {" "}
                                <img src={ClientA} alt="ClientA" />{" "}
                              </div>
                            </div>
                            <div className="patient-msg">
                              <p>
                                “Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Donec congue turpis
                                sollicitudin nulla finibus dignissim. Curabitur
                                eu urna sed risus tempor venenatis. Morbi quis
                                libero at odio elementum scelerisque at nec
                                libero. Integer quis magna nunc. Sed malesuada
                                efficitur tellus, a posuere risus finibus
                                vitae.”
                              </p>
                            </div>
                            <div className="patient-name-add">
                              <div>
                                <h3>Mahyar Eidgah</h3>
                                <span>New York, NY</span>{" "}
                              </div>
                              <div className="patient-rating">
                                <ul>
                                  <li>
                                    <i
                                      className="fa fa-star"
                                      aria-hidden="true"
                                    ></i>
                                  </li>
                                  <li>
                                    <i
                                      className="fa fa-star"
                                      aria-hidden="true"
                                    ></i>
                                  </li>
                                  <li>
                                    <i
                                      className="fa fa-star"
                                      aria-hidden="true"
                                    ></i>
                                  </li>
                                  <li>
                                    <i
                                      className="fa fa-star"
                                      aria-hidden="true"
                                    ></i>
                                  </li>
                                  <li>
                                    <i
                                      className="fa fa-star-half"
                                      aria-hidden="true"
                                    ></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="rating-patient">
                            <div className="rating-patient-grid clearfix">
                              <div className="paitent-profile">
                                {" "}
                                <img src={ClientA} alt="ClientA" />{" "}
                              </div>
                            </div>
                            <div className="patient-msg">
                              <p>
                                “Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Donec congue turpis
                                sollicitudin nulla finibus dignissim. Curabitur
                                eu urna sed risus tempor venenatis. Morbi quis
                                libero at odio elementum scelerisque at nec
                                libero. Integer quis magna nunc. Sed malesuada
                                efficitur tellus, a posuere risus finibus
                                vitae.”
                              </p>
                            </div>
                            <div className="patient-name-add">
                              <div>
                                <h3>Mahyar Eidgah</h3>
                                <span>New York, NY</span>{" "}
                              </div>
                              <div className="patient-rating">
                                <ul>
                                  <li>
                                    <i
                                      className="fa fa-star"
                                      aria-hidden="true"
                                    ></i>
                                  </li>
                                  <li>
                                    <i
                                      className="fa fa-star"
                                      aria-hidden="true"
                                    ></i>
                                  </li>
                                  <li>
                                    <i
                                      className="fa fa-star"
                                      aria-hidden="true"
                                    ></i>
                                  </li>
                                  <li>
                                    <i
                                      className="fa fa-star"
                                      aria-hidden="true"
                                    ></i>
                                  </li>
                                  <li>
                                    <i
                                      className="fa fa-star-half"
                                      aria-hidden="true"
                                    ></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          
                          <div className="rating-footer">
                            <div className="back-top">
                              {" "}
                              <a href="#">
                                <p>
                                  <i
                                    className="fa fa-angle-up"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Back to Top
                                </p>
                              </a>{" "}
                            </div>
                            <a
                              href="//#"
                              className="read-more-rating"
                            >
                              Read more Reviews
                            </a>{" "}
                          </div>
                          <div className="faqs" id="faq">
                            <div className="faqs-wrap">
                              <div className="question">
                                <h2>
                                  How soon can I make an appointment with Dr.
                                  Jordan Reich?
                                </h2>
                                <p>
                                  Generally, Dr. Jordan Reich has appointments
                                  available on Zocdoc within 1 week. You can see
                                  Dr. Sanghi's earliest availability on Zocdoc
                                  and{" "}
                                  <a href="/#">Make an appointment online.</a>
                                </p>
                              </div>
                              <div className="question">
                                <h2>
                                  Is Dr. Jordan Reich accepting new patients?
                                </h2>
                                <p>
                                  Dr. Pramod Sanghi generally accepts new
                                  patients on Zocdoc. You can see Dr. Reich's
                                  earliest availability on Zocdoc and{" "}
                                  <a href="/#">
                                    Schedule an appointment online.
                                  </a>
                                </p>
                              </div>
                              <div className="question">
                                <h2>
                                  Does Dr. Jordan reich accept my insurance?
                                </h2>
                                <p>
                                  <a href="/#">Choose your insurance plan</a> to
                                  verify if Dr. Jordan Reich is in-network.
                                </p>
                              </div>
                              <div className="question">
                                <h2>
                                  Can I make an appointment with Dr. Jordan
                                  Reich online?
                                </h2>
                                <p>
                                  Yes, you can{" "}
                                  <a href="/#">Make an appointment online.</a>{" "}
                                  with Dr. Reich using Zocdoc. It’s simple,
                                  secure, and free.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="rating-footer">
                            <div className="back-top">
                              {" "}
                              <a href=" #">
                                <p>
                                  <i
                                    className="fa fa-angle-up"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Back to Top
                                </p>
                              </a>{" "}
                            </div>
                            <a
                              href="//#"
                              className="read-more-rating"
                            >
                              Read more Reviews
                            </a>{" "}
                          </div>
                        </div>
                      </div>
                      <div id="recomended" className="tab-pane fade">
                        <h3>Menu 1</h3>
                        <p>
                          Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 pdr-0">
                  
                  <div className="bookAnAppoinment">
                    <h1>Book an appointment</h1>
                    
                    <div className="form-group">
                      <label>Reason to Visit</label>
                      <select className="form-control">
                        <option>Condition</option>
                        <option>Regular Health Check-Up</option>
                        <option>Viral Infection</option>
                      </select>
                    </div>
                    <div className="togleBtn">
                      <p>Has the patient seen this doctor before?</p>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>{" "}
                      </label>
                    </div>
                    <div className="form-group">
                      <label>Please select an office location</label>
                      <select className="form-control">
                        <option>
                          110 West 14th Street, New York, NY, 10011
                        </option>
                        <option>
                          110 West 14th Street, New York, NY, 10011
                        </option>
                        <option>
                          110 West 14th Street, New York, NY, 10011
                        </option>
                      </select>
                    </div>
                    <div className="detail-r">
                      <h3>Please select an available day and time</h3>
                      <ul className="mon coman-ul">
                        <p>Mon</p>
                        <li>
                          <a href="//#" className="active">
                            9.00 am
                          </a>
                        </li>
                        <li>
                          <a href="//#">10.00 am</a>
                        </li>
                        <li>
                          <a href="//#">1.00 pm</a>
                        </li>
                        <li>
                          <a href="//#">2.00 pm</a>
                        </li>
                      </ul>
                      <ul className="tue coman-ul">
                        <p>Tue</p>
                        <li>
                          <a href="//#">9.00 am</a>
                        </li>
                        <li>
                          <a href="//#">10.00 am</a>
                        </li>
                        <li>
                          <a href="//#">1.00 pm</a>
                        </li>
                        <li>
                          <a href="//#">2.00 pm</a>
                        </li>
                      </ul>
                      <ul className="wed coman-ul">
                        <p>Wed</p>
                        <li>
                          <a href="//#">9.00 am</a>
                        </li>
                        <li>
                          <a href="//#">10.00 am</a>
                        </li>
                        <li>
                          <a href="//#">1.00 pm</a>
                        </li>
                        <li>
                          <a href="//#">2.00 pm</a>
                        </li>
                      </ul>
                      <ul className="ted coman-ul">
                        <p>Thu</p>
                        <li>
                          <a href="//#">9.00 am</a>
                        </li>
                        <li>
                          <a href="//#">10.00 am</a>
                        </li>
                        <li>
                          <a href="//#">1.00 pm</a>
                        </li>
                        <li>
                          <a href="//#">2.00 pm</a>
                        </li>
                      </ul>
                      <ul className="fri coman-ul">
                        <p>Fri</p>
                        <li>
                          <a href="//#">9.00 am</a>
                        </li>
                        <li>
                          <a href="//#">10.00 am</a>
                        </li>
                        <li>
                          <a href="//#">1.00 pm</a>
                        </li>
                        <li>
                          <a href="//#">2.00 pm</a>
                        </li>
                      </ul>
                    </div>
                    <div className="btn-group">
                      <a
                        href="//#"
                        className="btn-bg profile-btn color-white"
                      >
                        Appointment
                      </a>
                      <a
                        href="//#"
                        className="bg-gray video-btn color-light-gray"
                      >
                        Video Consult
                      </a>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="chat">
            <div className="container">
              <div className="row">
                <div className="">
                  {" "}
                  <a href="//#">
                    {" "}
                    <span className="icon-chatbot">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                      <span className="path4"></span>
                      <span className="path5"></span>
                      <span className="path6"></span>
                      <span className="path7"></span>
                      <span className="path8"></span>
                      <span className="path9"></span>
                      <span className="path10"></span>
                      <span className="path11"></span>
                      <span className="path12"></span>
                      <span className="path13"></span>
                      <span className="path14"></span>
                      <span className="path15"></span>
                      <span className="path16"></span>
                      <span className="path17"></span>
                      <span className="path18"></span>
                      <span className="path19"></span>
                    </span>{" "}
                  </a>{" "}
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      );
    } 
  }
}
export default Profile;
