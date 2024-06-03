import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdbreact";
import { Carousel,Card,Nav,Navbar,Container,NavDropdown,Form,FormControl,Button } from 'react-bootstrap';
import "../../Styles/Blogs.css";
import CardBlogs from '../Cards/CardBlogs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

function Blogs() {
    const chk=1
    const dummyArr1=[
        {
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
          caption: "San Francisco"
        },
        {
          image: "https://cdn.britannica.com/s:800x450,c:crop/35/204435-138-2F2B745A/Time-lapse-hyper-lapse-Isle-Skye-Scotland.jpg",
          caption: "Scotland"
        },
        {
          image: "https://static2.tripoto.com/media/filter/tst/img/735873/TripDocument/1537686560_1537686557954.jpg",
          caption: "Darjeeling"
        },
        {
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Palace_of_Fine_Arts_%2816794p%29.jpg/1200px-Palace_of_Fine_Arts_%2816794p%29.jpg",
          caption: "San Francisco"
        },
        {
          image: "https://i.natgeofe.com/n/f7732389-a045-402c-bf39-cb4eda39e786/scotland_travel_4x3.jpg",
          caption: "Scotland"
        },
        {
          image: "https://www.tusktravel.com/blog/wp-content/uploads/2020/07/Best-Time-to-Visit-Darjeeling-for-Honeymoon.jpg",
          caption: "Darjeeling"
        },
        {
          image: "https://www.omm.com/~/media/images/site/locations/san_francisco_780x520px.ashx",
          caption: "San Francisco"
        },
        {
          image: "https://images.ctfassets.net/bth3mlrehms2/6Ypj2Qd3m3jQk6ygmpsNAM/61d2f8cb9f939beed918971b9bc59bcd/Scotland.jpg?w=750&h=422&fl=progressive&q=50&fm=jpg",
          caption: "Scotland"
        },
        {
          image: "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/02/summer-7.jpg",
          caption: "Darjeeling"
        }
      ];

      const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
      }
      const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
      }

      const dummyArr2=["this is news 1","this is news 2","this is news 3","this is news 4","this is news 5"]

    return (
        <div>
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="9">
                        <div className="image-section-cl1">
                            <Carousel fade>
                                {dummyArr1.map((data)=>(
                                    <Carousel.Item>
                                        <img
                                        className="d-block w-100"
                                        src={data.image}
                                        alt={data.caption}
                                        />
                                        <Carousel.Caption>
                                            <h3>{data.caption}</h3>
                                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                ))}
                                
                            </Carousel>
                        </div>
                        <div>
                            {/*down-left-section-navbar*/}
                            <div>
                            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                                <Container>
                                <Navbar.Brand>LetsBlog</Navbar.Brand>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav className="me-auto">
                                    <Nav.Link onClick={()=>{}}>Most Recent</Nav.Link>
                                    <Nav.Link onClick={()=>{}}>Popular</Nav.Link>
                                    <Nav.Link onClick={()=>{}}>My Favorite</Nav.Link>
                                    <Nav.Link onClick={()=>{}}>Recommendation</Nav.Link>
                                    </Nav>
                                    <Form className="d-flex">
                                        <FormControl
                                        type="search"
                                        onChange={(e)=>console.log(e.target.value)}
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                        />
                                    </Form>
                                    <Nav>
                                    <NavDropdown title="Category" id="collasible-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                    </NavDropdown>
                                    </Nav>
                                </Navbar.Collapse>
                                </Container>
                            </Navbar>
                            </div>
                        </div>
                        <div className="blog-cl1">
                        <MDBContainer>
                          <MDBRow>
                            {dummyArr1.map((data)=>(
                              <MDBCol lg="4" md="4" sm="6" className="cards-blogs-cl1">
                                <CardBlogs img={data.image}/>
                              </MDBCol>
                            ))}
                          </MDBRow>
                        </MDBContainer>
                        </div>
                    </MDBCol>
                    <MDBCol md="3">
                        <div>
                            <Card className="news-section-cl1">
                                <h3 className="news-section-cl2">News Section</h3>
                                <ul className="news-section-cl3">
                                    {dummyArr2.map((news)=>(
                                        <div>
                                        <li>{news}</li>
                                        <hr></hr>
                                        </div>
                                    ))}
                                </ul>
                            </Card>
                        </div>
                        <div>
                        <Card className="news-section-cl1">
                                <h3 className="news-section-cl2">Top Bloggers</h3>
                                <ul className="news-section-cl3">
                                    {dummyArr2.map((news)=>(
                                        <div>
                                        <li>{news}</li>
                                        <hr></hr>
                                        </div>
                                    ))}
                                </ul>
                            </Card>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <div className="image-section-cl2">
            <Link to='/addblog'>
              <Button class="btn">
              <FontAwesomeIcon icon={faPlusCircle} />
              </Button>
            </Link>
            </div>
        </div>
    )
}

export default Blogs
