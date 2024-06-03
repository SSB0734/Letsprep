import React, { useState, useEffect } from "react";
import "../../Styles/InterviewXP.css";
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdbreact";
import { useStateValue } from "../../StateProvider";
import CardsIxp from "../Cards/CardsIxp";
import DisplayIxp from "./DisplayIxp";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import api from "../../constants";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Meta from "../Meta";

const options = [
  "All Roles",
  "Software Development Engineer",
  "SDE1",
  "SDET",
  "Software Developer",
  "Member of Technical Staff",
  "Cloud Engineer",
  "Business Analyst",
  "Software Engineer",
  "Product Manager",
  "Product Analyst",
  "SRE",
  "System Engineer",
  "Power Programmer",
  "Intern",
  "Technology Analyst",
  "SDE",
  "SDE2",
  "SDE3",
];
const defaultOption = options[0];

const acronym = {
  "zs associates": "ZS Associates",
  amazon: "Amazon",
  google: "Google",
  facebook: "Facebook",
  letsprep: "LetsPrep",
  vmware: "VMware",
  avalara: "Avalara",
  groww: "Groww",
  quantiphi: "Quantiphi",
  "credit suisse": "Credit Suisse",
  "quest global": "Quest Global",
  "persistent systems": "Persistent Systems",
  myntra: "Myntra",
  cognizant: "Cognizant",
  "capillary technologies": "Capillary Technologies",
  lti: "LTI",
  accenture: "Accenture",
  "hexaview technology": "Hexaview Technology",
  "yash technologies": "Yash Technologies",
  infosys: "Infosys",
  wipro: "Wipro",
  incedo: "Incedo",
  systango: "Systango",
  "cognam technologies": "Cognam Technologies",
  walkover: "Walkover",
  tcs: "TCS",
  impetus: "Impetus",
  fico: "Fico",
  deloitte: "Deloitte",
  "gateway group": "Gateway Group",
  capgemini: "Capgemini",
  sharechat: "ShareChat",
  paytm: "Paytm",
  browserstack: "BrowserStack",
  atlassian: "Atlassian",
  factset: "FactSet",
  "principal global": "Principal Global",
  deqode: "Deqode",
  twitter: "Twitter",
  linkedin: "LinkedIn",
  directi: "Directi",
  netflix: "Netflix",
  "morgan stanley": "Morgan Stanley",
  kickdrum: "Kickdrum",
  nuclei: "Nuclei",
};

function InterviewXP() {
  const [searchCompany, setsearchCompany] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const [companies, setCompanies] = useState([]);
  const [ixps, setIxps] = useState([]);
  const [companyselected, setCompanySelected] = useState("letsprep");
  const [companytl, setCompanytl] = useState(
    "https://i.ibb.co/tZpd643/img.png"
  );
  const [cd, setCd] = useState(
    "The project will help students to be prepared prior to their interviews and coding challenges. Interview archives will help students to understand the hiring processes of many organizations and will help them to know the pattern and type of questions asked in several rounds of a recruitment process. We also provide a contribution section where experts can contribute articles, courses, and their interview experiences. Altogether we will contribute to making a change for a better future."
  );

  const [role, setRole] = useState("All Roles");
  const [loading, setLoading] = useState(false);
  const onSelect = (e) => {
    // //console.log(e);
    setRole(e.value);
  };

  useEffect(() => {
    displayCompanies();
    displayIxps();
  }, [role, companyselected, cd]);

  const displayCompanies = () => {
    fetch(`${api}ixp/getcompanies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user?.email }),
    })
      .then((response) => response.json())
      .then((data) => setCompanies(data));
  };
  const displayIxps = () => {
    setLoading(true);
    fetch(`${api}ixp/getixps`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companyname: companyselected, role: role }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIxps(data);
        setLoading(false);
      });
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  var settings1 = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const company1 = companies.filter((product1) => {
    return (
      product1.companyname
        .toLowerCase()
        .indexOf(searchCompany.toLowerCase()) !== -1
    );
  });

  return (
    <div className='ixp'>
      <Meta
        title="LetsPrep - Interview Experiences"
        description={`Prepare you for Interview by providing detailed interview experiences of others
         so that you are well acquainted of your battle before the actual fight.`}
      />
      <section
        class='bg-dark text-light header-inner p-0 jarallax o-hidden s3'
        data-overlay=''
        data-jarallax=''
        data-speed='0.2'
      >
        <div className='ixpmain1 cls1'>
          {/* <div className="companyImageDiv">
            <img className="companyImage" src={companytl} />
          </div> */}

          <div className='companyDescription'>
            <h2 className='companyDescriptionTitle display-5 fw-bold'>
              {acronym[companyselected]
                ? acronym[companyselected]
                : companyselected}
            </h2>
            <p className='lead companyDescriptionContent'>{cd}</p>
          </div>
        </div>
        <div class='divider flip-x1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            xlinkHref='http://www.w3.org/1999/xlink'
            width='100%'
            height='130px'
            viewBox='0 0 100 100'
            version='1.1'
            preserveAspectRatio='none'
            class='injected-svg'
            data-src='assets/img/dividers/divider-1.svg'
          >
            <path d='M0,0 C40,33 66,52 75,52 C83,52 92,33 100,0 L100,100 L0,100 L0,0 Z'></path>
          </svg>
        </div>
        <div
          id='jarallax-container-0'
          style={{
            overflow: "hidden",
            "pointer-events": "none",
            transform: "translate3d(0px, -53.9125px, 0px)",
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            "z-index": "-100",
          }}
        >
          <img
            // src="https://leap.mediumra.re/assets/img/inner-1.jpg"
            src={companytl}
            alt='Image'
            class='jarallax-img opacity-31'
            style={{
              "object-fit": "cover",
              "object-position": "50% 50%",
              "max-width": "none",
              position: "fixed",
              top: "0px",
              left: "0px",
              width: "100%",
              height: "663.175px",
              overflow: "hidden",
              "pointer-events": "none",
              "transform-style": "preserve-3d",
              "backface-visibility": "hidden",
              "will-change": "transform, opacity",
              "margin-top": "16.9125px",
              transform: "translate3d(0px, -16.9125px, 0px)",
            }}
          />
        </div>
      </section>
      <div className='addxpdiv d-flex justify-content-center mb-4'>
        {
          user ? <Link to='/add-interview-experience'>
            <button type='button' className='btn btn-dark btn-lg'>
              Add your experience
            </button>
          </Link> : <Link to='/signup'>
            <button type='button' onClick={() => alert("You have to signup to add your experience")} className='btn btn-dark btn-lg'>
              Add your experience
            </button>
          </Link>
        }

        <br />
      </div>
      <div className='filtersdivixp'>
        <MDBContainer>
          <MDBRow>
            <MDBCol md='6' sm='12' style={{ marginTop: "10px" }}>
              <div style={{ display: "flex" }}>
                {/* <SearchIcon /> */}
                <input
                  className='form-control mr-sm-2'
                  type='text'
                  aria-label='Search'
                  onChange={(e) => {
                    setsearchCompany(e.target.value);
                  }}
                  placeholder='Search for company..'
                />
              </div>
            </MDBCol>
            <MDBCol md='6' sm='12' style={{ marginTop: "10px" }}>
              <div>
                <Dropdown
                  options={options}
                  onChange={(e) => {
                    onSelect(e);
                  }}
                  value={role}
                  placeholder='Select an option'
                />
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <div className='existingixpdiv' style={{ backgroundColor: "white" }}>
        <MDBContainer>
          <MDBRow className='mb-3'>
            <MDBCol lg='12' md='12' sm='12'>
              {searchCompany === "" ? (
                <Slider {...settings} className='maincardslidercompanies'>
                  {companies.map((company, index) => (
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setCompanySelected(company.companyname);
                        setCd(company.companydescription);
                        setCompanytl(company.thumbnaillink);
                        displayIxps();
                      }}
                    >
                      <CardsIxp
                        name={
                          acronym[company.companyname.toLowerCase()] ||
                          company.companyname
                        }
                        link={company.thumbnaillink}
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <Slider {...settings1} className='maincardslidercompanies'>
                  {company1.map((company, index) => (
                    <div
                      key={index}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setCompanySelected(company.companyname);
                        setCd(company.companydescription);
                        setCompanytl(company.thumbnaillink);
                        displayIxps();
                      }}
                    >
                      <CardsIxp
                        name={
                          acronym[company.companyname.toLowerCase()] ||
                          company.companyname
                        }
                        link={company.thumbnaillink}
                      />
                    </div>
                  ))}
                </Slider>
              )}
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol lg='12' md='12' sm='12'>
              {loading ? (
                <center>
                  <Loader
                    type='Puff'
                    color='#71dcde'
                    height={100}
                    width={100}
                  // timeout={3000} //3 secs
                  />
                </center>
              ) : (
                <>
                  {ixps.length > 0 ? (
                    <>
                      {ixps.slice(0).reverse().map((ixp, index) => (
                        // <Suspense fallback={<h1>Loading profile...</h1>}>
                        <div key={index}>
                          <DisplayIxp
                            // key={index}
                            // keyyy={index}
                            name={acronym[ixp.companyname]}
                            desc={ixp.description}
                            role={ixp.role}
                            email={ixp.contributoremail}
                            iname={ixp.institutename}
                            lp={ixp.lp}
                            fullname={ixp.fullname}
                            yop={ixp.yop}
                            course={ixp.course}
                            branch={ixp.branch}
                            oprt={ixp.opportunity}
                            leveli={ixp.leveli}
                            levela={ixp.levela}
                            links={ixp.links}
                            cmail={ixp.contibutoremail}
                          // link={ixp.thumbnail'link}
                          />
                        </div>
                        // </Suspense>
                      ))}
                    </>
                  ) : (
                    <center>
                      <div style={{ marginTop: "15px" }}>
                        <strong>
                          Interview experience for this role is not available
                          please choose different company or role..
                        </strong>
                      </div>
                    </center>
                  )}
                </>
              )}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
  );
}

export default InterviewXP;
