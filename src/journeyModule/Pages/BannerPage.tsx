import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import PublishJourneySnackBar from '../Components/snackBar/PublishJourneySnackBar';

const BannerPage = () => {

  interface Journey {
    id: Number,
    title: string;
    description: string;
    category: string;
    image: string;
    triggerInfo?: string;
  }
  //  <Link to="/chooseTemplate/journeyFlow/triggerSetup">

  const prebuiltJourneysDataSaas: Journey[] = [
    // Your Saas data array
    {
      id: 1,
      title: "Welcome Email Series",
      description: "An email flow sent to new subscribers or customers to introduce them to your brand, products, and services, and establish a positive first impression",
      category: "SaaS",
      image: "../../../assets/welcomeTemplateJ.png",
      triggerInfo: `<div class="mt-4">
                  <p class="font-semibold">Select any of these triggers to use in this journey:</p>
                  <ul class="list-disc list-inside ml-4">
                      <li>Contact Added to a List</li>
                      <li>Contact Enters or Leaves a Segment</li>
                      <li>Occurrence of an Event</li>
                  </ul>
                  <p class="font-semibold mt-2">Prerequisites:</p>
                  <ul class="list-disc list-inside ml-4">
                      <li>Make sure you select the lists or segments where new subscribers are added.</li>
                      <li>You can also capture an event when a new subscriber signs up for your brand or service.</li>
                      <li>Customize your trigger point.</li>
                  </ul>
                  <p class="mt-2">You can't change the trigger once it is set up. <a href="#" class="text-blue-500">Learn More</a></p>
              </div>`

    },
    {
      id: 2,
      title: "Lead Nurture Sequence",
      description: "A series of emails sent to cold leads who have shown initial interest in your offerings, aiming to warm them up and convert them into engaged prospects.",
      category: "SaaS",
      image: "../../../assets/welcomeTemplateJ.png",
    },

  ];


  // const prebuiltJourneysData = [
  //   {
  //     title: "Birthday / Milestones",
  //     description: "Automated emails sent to customers on their birthdays or other significant milestones, offering personalized offers or greetings",
  //     category: "Ecommerce"
  //   },
  //   {
  //     title: "Birthday / Milestones",
  //     description: "Automated emails sent to customers on their  offering personalized offers or greetings",
  //     category: "Pokemon"
  //   },
  //   {
  //     title: "Birthday / Milestones",
  //     description: "Automated emails sent to customers on their birthdays or other significant milestones, offering personalized offers or greetings",
  //     category: "Ecommerce"
  //   },
  //   {
  //     title: "Birthday / Milestones",
  //     description: "Automated emails sent to customers on their birthdays or other significant milestones, offering personalized offers or greetings",
  //     category: "Ecommerce"
  //   },
  //   // Add more objects for additional prebuilt journeys if needed
  // ];
  const [isHovered, setIsHovered] = useState(false);


  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch data from localStorage on component mount
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      console.log(userData)
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    localStorage.removeItem('selectedSegment');
    localStorage.removeItem('journeyName');
  }, []);


  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };


  return (
    <div className=''>










      <div className="flex justify-center mt-20 ">
        <div className="mx-auto sm:px-6 lg:px-28 border-2 shadow-lg lg:py-20  rounded-lg">
          <div className="text-center">
            <h1 className="text-4xl font-bold leading-tight text-gray-900">
              Automate your marketing messages with Journeys
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Our journey builder is a blank canvas for your ideas. Drag and drop campaigns, time delays, webhooks, and branches to create engaging customer experiences.
            </p>
            <div className="mt-8 flex justify-center">
              {/* <Link to="chooseTemplate"> */}
              <Link to="chooseTemplate/journeyFlow/triggerSetup">


                <button className="inline-flex items-center justify-center  text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90
             h-10 bg-purple-600 text-white px-4 py-2 rounded-md mr-4 hover:bg-white hover:text-purple-600 border border-purple-600 ">
                  Create your first journey
                </button>
              </Link>
              <Link to="chooseTemplate/journeyFlow/published"  >
              <button className="inline-flex items-center justify-center  text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10
               bg-white text-purple-600 px-4 py-2 rounded-md border border-purple-600 hover:text-white hover:bg-purple-600  ">
                Schedule a demo
              </button>
                 </Link>
            </div>
          </div>

        </div>


      </div>


    </div>
  );
}

export default BannerPage;
