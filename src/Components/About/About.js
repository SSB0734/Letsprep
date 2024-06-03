import React from "react";
import "../../Styles/About.css";
import jatin from "../../images/jatinpic.jpg"
import aman from "../../images/Aman1.jpg"
import ssb from "../../images/Bhati.jpg"

function About() {
  return (
    <div className="About">
      <section
        class="bg-dark text-light header-inner p-0 jarallax o-hidden s3"
        data-overlay=""
        data-jarallax=""
        data-speed="0.2"
      >
        <div class="container py-0 layer-2 ">
          <div class="row my-3">
            <div class="col">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="index.html" style={{ color: "#8d8d8e" }}>
                      Home
                    </a>
                  </li>

                  <li class="breadcrumb-item active" aria-current="page">
                    About Us
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div class="row my-4 my-md-6 aos-init aos-animate" data-aos="fade-up">
            <div class="col-lg-12 col-xl-12">
              <h1 class="display-4 fw-bold">About Us</h1>
              <p class="lead mb-0" style={{ textAlign: "justify" }}>
                Our aim is to organize and analyze resources available over the
                internet which can be helpful for pre-graduates, graduates,
                post-graduates, and anyone willing to learn and enhance their
                skills. The project will deal with certain challenges such as
                structuring of data, analyzing the data, creating multiple
                panels to control the flow of data, filling out the voids of
                learning processes, getting out the best free resources and
                making it all available on a single platform with best user
                experience where one can easily get access to various courses
                and interview experiences so as to be confident in facing
                various coding competitions, hackathons and interviews.
              </p>
            </div>
          </div>
        </div>
        <div class="divider flip-x">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xlinkHref="http://www.w3.org/1999/xlink"
            width="100%"
            height="100px"
            viewBox="0 0 100 100"
            version="1.1"
            preserveAspectRatio="none"
            class="injected-svg"
            data-src="assets/img/dividers/divider-1.svg"
          >
            <path d="M0,0 C40,33 66,52 75,52 C83,52 92,33 100,0 L100,100 L0,100 L0,0 Z"></path>
          </svg>
        </div>
        <div
          id="jarallax-container-0"
          style={{
            overflow: "hidden",
            "pointer-events": "none",
            transform: "translate3d(0px, -65.9125px, 0px)",
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
            src="https://leap.mediumra.re/assets/img/inner-1.jpg"
            alt="Image"
            class="jarallax-img opacity-30"
            style={{
              "object-fit": "cover",
              "object-position": "50% 50%",
              "max-width": "none",
              position: "fixed",
              top: "0px",
              left: "0px",
              width: "100%",
              height: "100%",
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
      <section>
        <div class="container ">
          <div class="row mb-4">
            <div class="col">
              <h2 className="display-5 mb-3 fw-bold">At a glance</h2>
            </div>
          </div>
          <div class="row justify-content-center">
            <div
              class="col-6 mb-3 col-lg-3 mb-lg-0 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <span
                class="display-4 text-primary d-block"
                data-countup=""
                data-start="4567"
                data-end="73000"
                data-duration="3"
                data-grouping="true"
              >
                10
              </span>
              <span class="h6">Courses Available</span>
            </div>
            <div
              class="col-6 mb-3 col-lg-3 mb-lg-0 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <span
                class="display-4 text-primary d-block"
                data-countup=""
                data-start="1"
                data-end="25"
                data-duration="3"
                data-grouping="true"
              >
                3
              </span>
              <span class="h6">Team Members</span>
            </div>
            <div
              class="col-6 mb-3 col-lg-3 mb-lg-0 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <span
                class="display-4 text-primary d-block"
                data-countup=""
                data-start="1"
                data-end="5069"
                data-duration="3"
                data-grouping="true"
              >
                50+
              </span>
              <span class="h6">Interview Experiences Available</span>
            </div>
            <div
              class="col-6 mb-3 col-lg-3 mb-lg-0 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <span
                class="display-4 text-primary d-block"
                data-countup=""
                data-start="1"
                data-end="99.9"
                data-decimal-places="1"
                data-duration="3"
                data-grouping="true"
                data-suffix="%"
              >
                100+
              </span>
              <span class="h6">Contributions</span>
            </div>
          </div>
        </div>
      </section>
      <section className="d2">
        <div class="py-lg-16 py-10 ">
          <div class="container">
            <div class="row d-flex justify-content-center mb-3">
              <div class=" col-md-12 offset-right-md-6 col-12 mb-6">
                <h2 class="display-4 mb-3 fw-bold">
                  <center>Our core values</center>
                </h2>
                <p class="lead ">
                  Our core values are the fundamental beliefs of a person or
                  organization geeks academy. We help people understand the
                  difference between right and wrong.
                </p>
              </div>
            </div>
            <div class="row d3">
              <div class="col-md-4 col-12">
                <div class="card mb-4 mb-lg-0 shadow2">
                  <div class="card-body p-5">
                    {/* <div class="mb-3"></div> */}
                    <h4 class="mb-2">Best Refined Resources</h4>
                    <p class="mb-0">
                      The great thing about the internet is, it has made it easier for
                      people who are clever and resourceful to promote themselves. We aim to provide the best content at single platform to make you
                      well knowledgeable and skilled for your career and save you from any chaos.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-12">
                <div class="card mb-4 mb-lg-0 shadow2">
                  <div class="card-body p-5">
                    {/* <div class='mb-3'>
                      <i class='mdi mdi-account-group mdi-48px text-primary lh-1 '></i>
                    </div> */}
                    <h4 class="mb-2">Be Prior-Prepared</h4>
                    <p class="mb-0">
                      Wise men do not lock the stable door after the horse has bolted. We aim to make you fully prepared prior to your placements with various available courses and interview experiences that will make you aware of the
                      complete interview process and  will give to an idea of cracking them in parallel.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-12">
                <div class="card mb-4 mb-lg-0 shadow2">
                  <div class="card-body p-5">
                    {/* <div class='mb-3'>
                      <i class='mdi mdi-finance mdi-48px text-primary lh-1 '></i>
                    </div> */}
                    <h4 class="mb-2">Contribute and Grow</h4>
                    <p class="mb-0">
                      Success alone does not satisfy anyone but helping others does. We provide you an opportunity to share your own interview experiences and other useful resources,
                      helping others in their journey, as growing together has its own importance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section class="container mb-5 pb-3 pb-lg-0 mb-lg-7">
        <h2 class="pb-3 mb-4 text-center">Our Team</h2>
        <div class="row mb-3">
          <div class="col-lg-4 col-md-4 col-sm-6 mb-grid-gutter">
            <div
              class="card card-curved-body card-hover border-0 shadow mx-auto mb-3"
              style={{ maxWidth: "21rem" }}
            >
              <div class="card-img-top1 card-img-gradient">
                <img
                  src={aman}
                  alt="Aman Gaud"
                />
              </div>
              <div class="card-body text-center">
                <h3 class="h6 card-title mb-2">Aman Gaud</h3>
                <p class="fs-xs text-body mb-0">CEO</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 mb-grid-gutter">
            <div
              class="card card-curved-body card-hover border-0 shadow mx-auto mb-3"
              style={{ maxWidth: "21rem" }}
            >
              <div class="card-img-top1 card-img-gradient">
                <img
                  src={jatin}
                  alt="Sanomi Smith"
                />
              </div>
              <div class="card-body text-center">
                <h3 class="h6 card-title mb-2">Jatin Karla</h3>
                <p class="fs-xs text-body mb-0">CTO</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-6 mb-grid-gutter">
            <div
              class="card card-curved-body card-hover border-0 shadow mx-auto mb-3"
              style={{ maxWidth: "21rem" }}
            >
              <div class="card-img-top1 card-img-gradient">
                <img
                  src={ssb}
                  alt="Olivia Jones"
                />
              </div>
              <div class="card-body text-center">
                <h3 class="h6 card-title mb-2">Shailendra Singh Bhati</h3>
                <p class="fs-xs text-body mb-0">CEO</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section class="container mb-5 pb-3 pb-lg-0 mb-lg-7">
        <div class="card card-body py-5 text-center text-md-end mb-3">
          <div class="d-md-flex justify-content-center align-items-center">
            <div class="mb-4 mb-md-0 me-md-5 me-lg-6 me-xl-7">
              <h3>
                <i>
                  Learn continually - there's always "one more thing" to learn!
                </i>
              </h3>
              <p class="text-muted mb-0">Steve Jobs</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
