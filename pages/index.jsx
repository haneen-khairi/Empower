import EmptyStateCard from "@/Components/UI/EmptyStateCard";
import HomeEmpty from "@/Components/UI/HomeEmpty";
import Loaders from "@/Components/UI/Loaders";
import SiteImage from "@/Components/UI/SiteImage";
import { UserContext } from "@/Context/AuthContext";
import { AxiosHeadersInstance } from "@/Functions/AxiosHeadersInstance";
import MainLayout from "@/Layouts/MainLayout";
import { Button, Image } from "@nextui-org/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";

export default function index() {
  const route = useRouter();
  const [meeting, setMeeting] = useState();
  const [isLoading, setIsLoading] = useState(true); // Initially set to true
  const aboutUsRef = useRef(null); // Ref to the "About Us" section
  const [aboutUsActive, setAboutUsActive] = useState(false); // State variable for the "About Us" section

  const { token, getToken } = useContext(UserContext);
  function onNavigateMeeting() {
    route.push("/");
  }
  async function getMeeting() {
    if (token) {
      try {
        const meetingResponse = await AxiosHeadersInstance(
          `get`,
          `${process.env.NEXT_PUBLIC_API_KEY}/tests/meeting`
        );
        console.log("=== meetingResponse ===", meetingResponse);
        if (meetingResponse.status) {
          setMeeting(meetingResponse?.data);
        } else {
          setMeeting(meetingResponse);
        }
      } catch (error) {
        console.log("=== error in get meeting ===", error);
      }
    }
  }
  function formatDate(inputDate) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    
    const date = new Date(inputDate);
    const formattedDate = date.toLocaleDateString('en-US', options);
    
    const timeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
    
    return `${formattedDate} - ${formattedTime}`;
  }
    // Function to check if the "About Us" section is in the scroll view
    function checkAboutUsInView() {
      if (aboutUsRef.current) {
        const rect = aboutUsRef.current.getBoundingClientRect();
        const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
        setAboutUsActive(isInView);
      }
    }
  
    // Event listener to check the "About Us" section's visibility on scroll
    function handleScroll() {
      checkAboutUsInView();
    }
  useEffect(() => {
    if (!route.isReady) {
      return;
    }
    setIsLoading(true);

    const checkToken = async () => {
      try {
        await getToken();
        // Token check completed successfully
        getMeeting(); // Now you can proceed with other async operations like fetching meetings
      } catch (error) {
        console.log("=== error in getToken ===", error);
      } finally {
        // Set isLoading to false whether the token check succeeds or fails
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    checkToken();
    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);
    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // getToken()
    return () => {};
  }, [route, token]);

  return (
    <MainLayout aboutUsStatus={aboutUsActive}>
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_TITLE}Home`}</title>
      </Head>
      {isLoading ? (
        // Display loading spinner while isLoading is true
        <Loaders />
      ) : token ? (
        <section className="meeting mh-100vh pt-[8px]">
          {meeting?.error ? (
            
            <HomeEmpty />
          ) : (
            <div className={`card card__empty card__meeting`}>
              <div className="card__empty--content">
                <SiteImage
                  className="card__empty--image"
                  src={"/assets/images/icon_calender.svg"}
                />
                <h4 className="card__empty--content-header">
                  Upcoming meeting
                </h4>
                <h6 className="card__meeting--title">
                  Uplift Expert: {meeting?.expert}
                </h6>
                <span className="card__meeting--span">Meeting on</span>
                <h5 className="card__meeting--date">
                  {formatDate(meeting?.meeting_datetime)}
                </h5>
                <p className="card__empty--content-paragraph">
                  {meeting?.description}
                </p>
                <Button
                  as={Link}
                  href={meeting?.url || "https://google.com"}
                  target="_blank"
                  type="submit"
                  className="card__meeting--button special_button"
                  onClick={onNavigateMeeting}
                >
                  Join
                </Button>
              </div>
            </div>
          )}
        </section>
      ) : (
        <>
            <div className="signup_alert">
              <p>If you're experiencing difficulties achieving your academic objectives and seeking an individual to comprehend your situation
              thoroughly and devise a career strategy for you, EMPWR360 is the ideal platform to explore.</p>
              <Button as={Link} className="navbar__signup" href="/create-account" variant="flat">
                sign up
              </Button>
            </div>
          {/* <section className="homecover">
            <div className="lg:flex justify-center items-center">
              <div className="homecover__content lg:w-8/12 md:w-12/12 md:mb-[40px]">
                <h1 className="homecover__content--header mb-[16px]">
                  Discover you Talents, Design your Future
                </h1>
                <p className="homecover__content--paragraph mb-[16px]">
                  Empower360 is your trusted partner in unlocking your unique
                  potential, providing science-based guidance for confident,
                  informed career decisions.
                </p>
                <Button as={Link} href='/create-account' className="homecover__content--button special_button">Sign up</Button>
              </div>
              <Image
                className="lg:w-4/12 md:w-12/12 w-full"
                src="/assets/images/home_cover.svg"
                removeWrapper={true}
              />
            </div>
          </section>
          <section className="our_keys pt-[80px]">
            <div className="our_keys__content">
              <h3 className="our_keys__content--header">Our Key Features</h3>
             <p className="our_keys__content--paragraph">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries.
              </p> 

              <div className="grid lg:grid-cols-3 md:grid-cols-2  lg:gap-x-[40px] md:gap-x-[60px]">
                <div className="our_keys__content--card">
                  <h4 className="our_keys__content--card-header">6,000+</h4> 
                  <p className="our_keys__content--card-paragraph">
                  EMPWR360 provides in-depth assessments, including The
                    Learning Receptiveness Profiles test, The NAP Student
                    Performer Brain Profile Assessment, and The DISC Profile
                    assessment, to uncover students' interests, strengths,
                    neural architecture, and personality traits.
                  </p>
                </div>
                <div className="our_keys__content--card">
                   <h4 className="our_keys__content--card-header">2,500</h4> 
                  <p className="our_keys__content--card-paragraph">
                    The platform offers personalized career recommendations
                    and strategies for success based on the results of these
                    assessments, helping students make informed decisions about
                    their future careers.
                  </p>
                </div>
                <div className="our_keys__content--card">
                   <h4 className="our_keys__content--card-header">120+</h4>
                  <p className="our_keys__content--card-paragraph">
                  EMPWR360 addresses challenges students face in career
                    choice and academic performance by equipping them with
                    tailored guidance and resources, ultimately boosting
                    confidence and improving academic outcomes.
                  </p>
                </div>
              </div>
            </div>
          </section> */}
          <section className="partners">
            <div className="partners__content">
              <h2 className="partners__content--title">OUR PARTNERS</h2>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[12px]">
                <div className="partners__content--image">
                  <SiteImage src={'/assets/images/folder-new-design/7.svg'} />
                </div>
                <div className="partners__content--image">
                  <SiteImage src={'/assets/images/folder-new-design/6.svg'} />
                </div>
                <div className="partners__content--image">
                  <SiteImage src={'/assets/images/folder-new-design/5.svg'} />
                </div>
              </div>
            </div>
          </section>
          <section className="satisfied">
            <div className="satisfied__content">
              <h2 className="satisfied__content--title">OUR SATISFIED CUSTOMERS</h2>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[12px]">
                <div className="satisfied__content--card">
                  <p className="satisfied__content--card-text">"Empower360 has been instrumental in shaping my career
                    trajectory. Through their comprehensive assessments like The
                    Learning Receptiveness Profiles test and The NAP Student
                    Performer Brain Profile Assessment, I gained valuable insights
                    into my unique learning style and cognitive strengths. Their
                    guidance aligned my interests with my neural architecture,
                    providing a clear direction for my future career. Thanks to
                    Empower360, I now approach my professional journey with
                    confidence and purpose."</p>
                  <h4 className="satisfied__content--card-name">-Noor Al-Jannahi</h4>
                </div>
                <div className="satisfied__content--card">
                  <p className="satisfied__content--card-text">"Empower360 has been instrumental in shaping my career
                    trajectory. Through their comprehensive assessments like The
                    Learning Receptiveness Profiles test and The NAP Student
                    Performer Brain Profile Assessment, I gained valuable insights
                    into my unique learning style and cognitive strengths. Their
                    guidance aligned my interests with my neural architecture,
                    providing a clear direction for my future career. Thanks to
                    Empower360, I now approach my professional journey with
                    confidence and purpose."</p>
                  <h4 className="satisfied__content--card-name">-Noor Al-Jannahi</h4>
                </div>
                <div className="satisfied__content--card">
                  <p className="satisfied__content--card-text">"Empower360 has been instrumental in shaping my career
                    trajectory. Through their comprehensive assessments like The
                    Learning Receptiveness Profiles test and The NAP Student
                    Performer Brain Profile Assessment, I gained valuable insights
                    into my unique learning style and cognitive strengths. Their
                    guidance aligned my interests with my neural architecture,
                    providing a clear direction for my future career. Thanks to
                    Empower360, I now approach my professional journey with
                    confidence and purpose."</p>
                  <h4 className="satisfied__content--card-name">-Noor Al-Jannahi</h4>
                </div>
              </div>
            </div>
          </section>
          <section id="about" ref={aboutUsRef}  className="what">
            {/* <div className="grid lg:grid-cols-2 md:grid-cols-1 justify-center gap-[120px] items-center">
              <SiteImage src="/assets/images/Picture2.svg" className="w-full" />
              <div className="what__content ">
                <SiteImage
                  className="what__content--shape"
                  src="/assets/images/what-are-we-shape.svg"
                />
                <h3 className="what__content--header mb-[16px]">Who Are We?</h3>
                <p className="what__content--paragraph mb-[16px]">
                "EMPWR360 was born out of a shared passion for empowering students to achieve their full potential. The founders, a group of graduates in UAE, witnessed firsthand the struggles students faced in making career decisions. Determined to make a difference, EMPWR360 combines science-based assessments with personalized guidance, envisioning a future where every student could confidently navigate their career path and find fulfillment in the ever-changing job market."
                </p>
              </div>
            </div> */}
            <div className="grid grid-cols-6">
              <div className="col-span-1">
                <SiteImage className="what__image" src={'/assets/images/folder-new-design/10.svg'} />
              </div>
              <div className="col-span-5">
                <div className="">
                  <h4 className="what__content--header">OUR STORY</h4>
                  <p className="what__content--text">Empower360 was created by a group of UAE graduates who experienced the challenges students faced in making career decisions. The platform combines science-based assessments with personalized guidance from internationally known companies specialized in professional development. Empower360 aims to help students confidently navigate their career paths and find fulfillment in the ever-changing job market.
                  </p>
                </div>

              </div>
            </div>
          </section>
          <section  className="vision">
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-6 gap-[8px]">
                <div className="col-span-1">
                  <SiteImage className="vision__image" src={'/assets/images/folder-new-design/9.svg'} />
                </div>
                <div className="col-span-5">
                  <div className="">
                    <h4 className="vision__content--header">OUR VISION</h4>
                      <p className="vision__content--text">Empower360 aims to be the top science-driven career
  guidance platform, helping students worldwide pursue fulfilling
  careers that match their potential and transforming career
  decision-making.
                    </p>
                  </div>

                </div>
              </div>
            <div className="grid grid-cols-6 gap-[12px]">
              <div className="col-span-1">
                <SiteImage className="vision__image" src={'/assets/images/folder-new-design/8.svg'} />
              </div>
              <div className="col-span-5">
                <div className="">
                  <h4 className="vision__content--header"> OUR MISSION</h4>
                  <p className="vision__content--text">Empower360 aims to revolutionize student career success by
providing science-based assessments and personalized guidance
to help students discover their unique strengths and interests.
Their goal is to boost confidence, improve academic outcomes,
and equip students with the knowledge to make informed career
decisions in today's dynamic job market
                  </p>
                </div>

              </div>
              </div>
            </div>
          </section>

        </>
      )}
    </MainLayout>
  );
}
