import React, { useState } from "react";
import "@fontsource/league-gothic";
const mavigationList = ["Home", "Tokens", "Learn"];
const result = [
  {
    value: "98%",
    name: "User Satisfaction",
  },
  {
    value: "5M+",
    name: "Cool Number",
  },
  {

    value: "4.7",
    name: "Google Review",
  },
  {
    value: "21+",
    name: "API integration",
  },
];
const ourWork = [
  {
    icon: "/assets/nft/infytoken/mobile.svg",
    title: "Mobile Payment",
    description: "Secure loans using real estate properties as collateral.",
    alt: "mobile",
  },
  {
    icon: "/assets/nft/infytoken/security.svg",
    title: "Security & Control",
    description: "Unlock liquidity by leveraging mortgage securities.",
    alt: "security",
  },
  {
    icon: "/assets/nft/infytoken/protect.svg",
    title: "Protect the identity",
    description: "Tap into a global network of lenders and borrowers.",
    alt: "protect",
  },
  {
    icon: "/assets/nft/infytoken/doller.svg",
    title: "No Transaction Fees",
    description:
      "Leverage the security and transparency of blockchain technology.",
    alt: "doller",
  },
];
const card = [
  {
    icon: "/assets/nft/infytoken/shield.svg",
    title: "Secure and Transparent",
    description:
      "Benefit from the security and transparency provided by blockchain technology.",
    name: "shield",
  },
  {
    icon: "/assets/nft/infytoken/internet.png",
    title: "Global Reach",
    description: "Access financing opportunities from anywhere in the world.",
    name: "internet",
  },
  {
    icon: "/assets/nft/infytoken/refresh.svg",
    title: "Seamless Transactions",
    description:
      "Facilitate smooth and efficient financing processes on the Radix platform.",
    name: "refresh",
  },
  {
    icon: "/assets/nft/infytoken/coin.png",
    title: "Diverse Asset Coverage",
    description:
      "Utilize real assets, mortgage securities, and Metaverse assets as collateral.",
    name: "coin",
  },
];
const aboutUsContent = [
  "Briefly explain the concept of assets backed financing and its benefits.",
  "Highlight the unique selling proposition of the InfyToken ecosystem in enabling this type of financing globally and across different asset classes.",
];
const dropDownData = [
  {
    title: "What is assets backed investing the blocked chain?",
    description:
      "Facilitate smooth and efficient financing processes on the Radix platform.",
  },
  {
    title: "Why this Tokens?",
    description:
      "Facilitate smooth and efficient financing processes on the Radix platform.",
  },
  {
    title: "How to buy this tokens?",
    description:
      "Facilitate smooth and efficient financing processes on the Radix platform.",
  },
  {
    title: "What is assets backed investing the blocked chain?",
    description:
      "Facilitate smooth and efficient financing processes on the Radix platform.",
  },
];
const graph = [
  {
    title: "Marketing",
    percentage: "25%",
    color: `#9517AF`,
    backgroundColor: "#F1DEF3",
  },
  {
    title: "Business Development",
    percentage: "15%",
    color: `#01CC9B`,
    backgroundColor: "#E2F0F1",
  },
  {
    title: "Product Development",
    percentage: "10%",
    color: `#7DE314`,
    backgroundColor: "#EEF2E3",
  },
  {
    title: "Reserve ",
    percentage: "10%",
    color: `#E5EA05`,
    backgroundColor: "#FBF5E1",
  },
  {
    title: "Reserve ",
    percentage: "13%",
    color: `#14A0C0`,
    backgroundColor: "#E4ECF4",
  },
  {
    title: "Token Sale",
    percentage: "18%",
    color: `#3206D3`,
    backgroundColor: "#E4ECF4",
  },
];
const download = [1, 2, 3];
const TemplateReact = () => {
  const [showMenu, setShowMenu] = useState(false);
  const showMenuItems = () => {
    if (!showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    setShowMenu(!showMenu);
  };
  return (
    <div className="w-full bg-white min-h-[100vh] font-inter">
      <div className="mx-auto ">
        <div className="flex flex-col gap-20 items-center">
          <div className="max-w-screen-xl w-full relative">
            <div className="absolute">
              <img src="/assets/nft/infytoken/gradiant.svg" />
            </div>
            <div className="sm:px-20 px-8 py-9 flex justify-between">
              <div className="flex items-center gap-2 cursor-pointer z-10">
                <img src="/assets/nft/infytoken/logo.svg" alt="logo" />
                <span className="text-xl font-semibold">InfyToken</span>
              </div>
              <div className="hidden md:flex gap-9 items-center">
                {mavigationList?.map((data, index) => (
                  <span
                    key={index}
                    className="text-base text-[#233047] font-medium cursor-pointer hover:text-[#921CB1]"
                  >
                    {data}
                  </span>
                ))}
              </div>
              <button className="hidden md:flex py-3 px-5 bg-gradient-to-br from-[#9517AF] to-[#3206D3] text-white rounded-md hover:bg-gradient-to-l">
                Get Started
              </button>
              <div
                className={`
                  transition-all ease-in-out z-50
                  ${
                    showMenu
                      ? "flex flex-col min-h-screen h-max w-full left-0 top-0 fixed bg-[#2D4263]"
                      : "flex flex-col h-screen w-full top-0 left-full fixed bg-[#2D4263]"
                  }`}
              >
                <div
                  className="flex pt-5 items-center justify-end text-xl font-bold px-[10%] w-full"
                  onClick={showMenuItems}
                >
                  <img
                    src={"/assets/nft/infytoken/close.svg"}
                    alt="close"
                    className="h-7 cursor-pointer"
                  />
                </div>
                <div className="flex flex-col w-full items-center justify-center h-screen gap-[30px] sm:gap-[50px] sm:text-lg text-[20px] leading-[29px] font-normal  md:gap-[60px]">
                  {mavigationList.map((navitem, index) => {
                    return (
                      <div
                        key={index}
                        className="text-white text-2xl font-normal font-hindVadodara leading-6 tracking-[0.01] cursor-pointer hover:text-[#921CB1]"
                      >
                        {navitem}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="block md:hidden" onClick={showMenuItems}>
                <svg
                  width="26"
                  height="20"
                  viewBox="0 0 26 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="md:hidden cursor-pointer"
                >
                  <path
                    d="M1.3125 1.5H24.6875M1.3125 10H24.6875M1.3125 18.5H24.6875"
                    stroke="url(#paint0_linear_375_52458)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_375_52458"
                      x1="13"
                      y1="1.5"
                      x2="13"
                      y2="18.5"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#9517AF" />
                      <stop offset="1" stopColor="#3206D3" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="flex flex-col sm:gap-2 gap-8 items-center pb-8 sm:pb-4 px-8 relative">
              <div className="absolute  right-0 rotate-180 bottom-0">
                <img src="/assets/nft/infytoken/gradiant.svg" />
              </div>
              <span className="text-center  font-normal text-3xl sm:text-[42px] leading-10 md:text-9xl  text-[#233047]  font-leaguegothic max-w-5xl">
                We bring assets backed investing the blocked chain
              </span>
              <div className="max-w-md min-h-[232px]">
                <img
                  src="https://www.tailwindtap.com/assets/nft/infytoken/home-bg.png"
                  alt="home"
                  className="fill"
                />
              </div>
            </div>
            <div className="bg-gradient-to-b from-[#D6D6D6] from-[0.4%] via-transparent via-[60%] to-[#D6D6D6] to-100% sm:px-20 px-8 py-11 our-projects">
              <div className="flex max-w-5xl mx-auto justify-between flex-col md:flex-row gap-10 ">
                {result?.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col gap-4 text-center"
                    >
                      <span className="text-2xl text-[#9517AF] leading-6 font-semibold">
                        {data?.value}
                      </span>
                      <span className="text-[#233047] text-xl  leading-5 font-normal">
                        {data?.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="sm:px-20 px-8 flex gap-2 max-w-screen-xl w-full">
            <div className="flex flex-col gap-10">
              <span className="text-4xl text-[#233047] font-extrabold">
                About US
              </span>
              <div className="flex flex-col gap-7">
                <div className="max-w-xl">
                  <span className="text-2xl text-[#233047] font-semibold">
                    Unlock Global Financing Opportunities with Our Ecosystem
                  </span>
                </div>
                <div className="max-w-xl flex flex-col gap-5">
                  {aboutUsContent?.map((data, index) => (
                    <span
                      key={index}
                      className="text-xl text-[#233047] font-normal"
                    >
                      {data}
                    </span>
                  ))}
                </div>
                <button className="flex py-3 px-5 bg-gradient-to-br from-[#9517AF] to-[#3206D3] text-white rounded-md w-fit text-lg hover:bg-gradient-to-l">
                  Learn More
                </button>
              </div>
            </div>
            <div className="hidden lg:block min-w-[450px] xl:min-w-[550px]">
              <img
                src="/assets/nft/infytoken/aboutus.svg"
                alt="about-us image"
              />
            </div>
          </div>
          <div className="flex flex-col gap-10 sm:px-20 px-8 max-w-screen-xl w-full">
            <div className="flex flex-col gap-7 items-center">
              <span className="font-semibold text-4xl text-[#233047] text-center">
                Key Features Of InfyToken Ecosystem
              </span>
              <span className="text-center text-2xl font-normal max-w-xl">
                Emphasize the benefits of choosing the Token ecosystem for
                assets backed financing
              </span>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-7 justify-center">
              {card?.map((data, index) => (
                <div
                  className="flex max-w-[546px] cursor-pointer hover:shadow-lg rounded-2xl"
                  key={index}
                >
                  <div className="w-full  bg-gradient-to-t to-[#9517AF] from-[#3206D3]  px-[1px] border py-[1px] 2xl:px-0.5 2xl:py-0.5   rounded-2xl">
                    <div className=" h-full w-full bg-[#FBF4FA] rounded-2xl py-6 px-5 flex flex-col gap-2.5">
                      <div className="h-6 w-6">
                        <img src={data?.icon} alt={data?.name} />
                      </div>
                      <span className="text-lg sm:text-2xl font-semibold text-[#233047]">
                        {data?.title}
                      </span>
                      <span className="text-md sm:text-xl font-normal text-[#233047]">
                        {data?.description}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-10 sm:px-20 px-8 max-w-screen-xl w-full">
            <div className="flex flex-col gap-7 items-center">
              <span className="text-2xl sm:text-4xl text-[#233047] font-semibold">
                Why Choose InfyToken
              </span>
              <span className="text-xl sm:text-2xl text-[#233047] font-normal text-center max-w-xl">
                Emphasize the benefits of choosing the Token ecosystem for
                assets backed financing
              </span>
            </div>
            <div className="flex justify-between gap-3 flex-col flex-col-reverse lg:flex-row">
              <img
                src="/assets/nft/infytoken/treasury.svg"
                className="max-h-[500px] hidden sm:block"
              />
              <div className="self-center lg:self-end flex flex-col gap-10">
                {ourWork?.map((data, index) => (
                  <div className="flex gap-6" key={index}>
                    <img src={data?.icon} alt={data?.alt} />
                    <div className="text-[#233047] w-fit flex flex-col max-w-sm">
                      <span className="font-semibold text-lg sm:text-2xl !leading-[54px]">
                        {data?.title}
                      </span>
                      <span className="font-normal text-sm sm:text-xl">
                        {data?.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full md:bg-gradient-to-t md:from-[#9517AF] md:to-[#967DE6] p-[3px] rounded-2xl max-w-6xl">
            <div className="h-full w-full bg-[#FBF4FA] rounded-2xl pt-10 pb-10 flex flex-col gap-10 sm:px-20 px-8">
              <div className="flex flex-col gap-7 items-center">
                <span className="text-2xl sm:text-4xl text-[#233047] font-semibold">
                  Token & Fund Distribution
                </span>
                <span className="text-xl sm:text-2xl text-[#233047] font-normal text-center max-w-xl">
                  Emphasize the benefits of choosing the Token ecosystem for
                  assets backed financing
                </span>
              </div>
              <div>
                <div className="flex justify-between gap-10 flex-col md:flex-row">
                  <div className="self-center w-full flex flex-col gap-7 order-2 md:order-1">
                    {graph?.map((data, index) => {
                      return (
                        index < 3 && (
                          <div key={index} className="flex flex-col gap-2.5">
                            <div className="text-[#1F2937] flex justify-between">
                              <span className="text-base font-medium">
                                {data?.title}
                              </span>
                              <span className="text-base font-normal">
                                {data?.percentage}
                              </span>
                            </div>
                            <div
                              className={`w-full h-4`}
                              style={{
                                backgroundColor: data?.backgroundColor,
                              }}
                            >
                              <div
                                className={`h-full`}
                                style={{
                                  width: data?.percentage,
                                  backgroundColor: data?.color,
                                }}
                              />
                            </div>
                          </div>
                        )
                      );
                    })}
                  </div>
                  <img
                    src="/assets/nft/infytoken/chart.png"
                    alt="chart"
                    className="order-1 md:order-2"
                  />
                  <div className="self-center w-full flex flex-col gap-7 order-3">
                    {graph?.map((data, index) => {
                      return (
                        index > 2 && (
                          <div key={index}>
                            <div className="text-[#1F2937] flex justify-between">
                              <span className="text-base font-medium">
                                {data?.title}
                              </span>
                              <span className="text-base font-normal">
                                {data?.percentage}
                              </span>
                            </div>
                            <div
                              className={`w-full h-4`}
                              style={{
                                backgroundColor: data?.backgroundColor,
                              }}
                            >
                              <div
                                className={`h-full`}
                                style={{
                                  width: data?.percentage,
                                  backgroundColor: data?.color,
                                }}
                              />
                            </div>
                          </div>
                        )
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sm:px-20 px-8  flex flex-col gap-10 max-w-screen-xl w-full">
            <div className="flex flex-col gap-7 items-center">
              <span className="text-2xl sm:text-4xl text-[#233047] font-semibold">
                Download Document
              </span>
              <span className="text-xl sm:text-2xl text-[#233047] font-normal text-center max-w-xl">
                Emphasize the benefits of choosing the Token ecosystem for
                assets backed financing
              </span>
            </div>
            <div className="max-w-6xl flex justify-around pt-3.5 flex-wrap gap-8">
              {download?.map((data, index) => (
                <div
                  className="w-60 sm:w-80 bg-[#EDEBF0]  flex justify-end items-center pr-3.5 h-56 rounded-2xl hover:shadow-lg cursor-pointer"
                  key={index}
                >
                  <div className="flex flex-col gap-2.5 relative">
                    <div className="flex flex-col items-center">
                      <img src="/assets/nft/infytoken/pdf.png" alt="pdf" />
                      <span className="text-[#000000] text-2xl font-semibold">
                        PDF
                      </span>
                    </div>
                    <div className="group w-full bg-gradient-to-t from-[#9517AF] to-[#967DE6] p-[1.5px]  group-hover:bg-gradient-to-t  group-hover:from-white rounded-md cursor-pointer">
                      <div className="h-full w-full bg-[#FBF4FA] rounded-md text-base py-2.5 px-5 group-hover:bg-gradient-to-r group-hover:hover:from-[#9517AF] group-hover:hover:to-[#967DE6] text-[#9517AF] group-hover:text-white">
                        Download
                      </div>
                    </div>{" "}
                    <div className="w-32 sm:w-48 h-52 absolute -top-14 -left-36 sm:-left-52 bg-gradient-to-r from-[#9517AF] to-[#3206D3] text-[#FFFBFF] text-lg sm:text-2xl font-semibold flex justify-center items-center rounded-[10px]">
                      White Paper
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="sm:px-20 px-8  flex flex-col gap-9 max-w-screen-xl w-full">
            <div className="flex flex-col gap-7 items-center">
              <span className="text-2xl sm:text-4xl text-[#233047] font-semibold">
                Download Document
              </span>
              <span className="text-xl sm:text-2xl text-[#233047] font-normal text-center max-w-xl">
                Emphasize the benefits of choosing the Token ecosystem for
                assets backed financing
              </span>
            </div>
            {dropDownData.map((acc, index) => {
              return (
                <div key={index} className="py-1">
                  <div className="w-full bg-gradient-to-t to-[#9517AF] from-[#3206D3] px-[1px] 2xl:px-0.5 2xl:py-0.5 py-[1px] rounded-2xl ">
                    <div className=" h-full w-full bg-[#FBF4FA] rounded-2xl">
                      <DropDown title={acc.title} content={acc.description} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="sm:px-20 px-8  flex flex-col gap-10 max-w-screen-xl w-full">
            <div className=" bg-[#921CB1]/5 py-10 flex flex-col gap-10 px-8 rounded-2xl">
              <span className="text-2xl sm:text-4xl text-[#233047] font-semibold text-center">
                Contact Us
              </span>
              <div className="flex justify-between md:gap-4 lg:gap-20">
                <div className="w-3/4 hidden md:block">
                  <img
                    src="/assets/nft/infytoken/contactus.png"
                    alt="contactus"
                  />
                </div>
                <div className="w-full flex flex-col gap-8">
                  <input
                    type="text"
                    placeholder="Full name"
                    className="bg-white border-[2px] border-[#921CB1]/40 rounded-[10px] w-full focus:outline-none h-14 pl-4 focus:border-[#921CB1]"
                  />
                  <input
                    type="text"
                    placeholder="Mail"
                    className="bg-white border-[2px] border-[#921CB1]/40 rounded-[10px] w-full focus:outline-none h-14 pl-4 focus:border-[#921CB1]"
                  />
                  <div className="relative">
                    <textarea
                      type="textare"
                      placeholder="Message"
                      className="bg-white border-[2px] border-[#921CB1]/40 rounded-[10px] w-full focus:outline-none pl-4 pt-2 resize-none relative focus:border-[#921CB1]"
                      cols="30"
                      rows="5"
                    ></textarea>
                    <svg
                      width="14"
                      height="13"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute bottom-2.5 right-1"
                    >
                      <line
                        x1="12.6299"
                        y1="1.17683"
                        x2="1.66729"
                        y2="12.1394"
                        stroke="#9517AF"
                        strokeLinecap="round"
                      />
                      <line
                        x1="13"
                        y1="5.21541"
                        x2="6.70529"
                        y2="11.5101"
                        stroke="#9517AF"
                        strokeLinecap="round"
                      />
                      <line
                        x1="12.7129"
                        y1="10.4298"
                        x2="11.0861"
                        y2="12.0566"
                        stroke="#9517AF"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <button className="flex py-3 px-5 bg-gradient-to-br from-[#9517AF] to-[#3206D3] font-normal text-white rounded-md w-fit text-lg hover:bg-gradient-to-l">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#233047] py-20 text-[#FAF9F9]">
            <div className="px-8 max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:justify-between gap-16 md:gap-0">
                <div className="flex flex-col gap-10 md:w-3/12">
                  <div className="flex items-center gap-2 w-fit cursor-pointer">
                    <img src="/assets/nft/infytoken/logo.svg" alt="logo" />
                    <span className="text-xl font-semibold">InfyToken</span>
                  </div>
                  <div className="sm:max-w-xs">
                    <span className="text-base font-medium text-white sm:max-w-xs w-fit">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras eget lorem.
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <svg
                      className="cursor-pointer hover:fill-[#921CB1] fill-[#637381]"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z"
                        fill="white"
                      />
                      <path d="M19.439 14.6H18.1992H17.7564V14.1484V12.7484V12.2968H18.1992H19.1291C19.3726 12.2968 19.5719 12.1161 19.5719 11.8452V9.45161C19.5719 9.20323 19.3947 9 19.1291 9H17.5128C15.7638 9 14.5461 10.2645 14.5461 12.1387V14.1032V14.5548H14.1033H12.5978C12.2878 14.5548 12 14.8032 12 15.1645V16.7903C12 17.1065 12.2435 17.4 12.5978 17.4H14.059H14.5018V17.8516V22.3903C14.5018 22.7065 14.7454 23 15.0996 23H17.1807C17.3136 23 17.4243 22.9323 17.5128 22.8419C17.6014 22.7516 17.6678 22.5935 17.6678 22.4581V17.8742V17.4226H18.1328H19.1291C19.4169 17.4226 19.6383 17.2419 19.6826 16.971V16.9484V16.9258L19.9925 15.3677C20.0147 15.2097 19.9925 15.029 19.8597 14.8484C19.8154 14.7355 19.6161 14.6226 19.439 14.6Z" />
                    </svg>
                    <svg
                      width="34"
                      height="34"
                      viewBox="0 0 34 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="cursor-pointer hover:fill-[#921CB1] fill-[#637381]"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1 17C1 8.16344 8.16344 1 17 1C25.8366 1 33 8.16344 33 17C33 25.8366 25.8366 33 17 33C8.16344 33 1 25.8366 1 17Z"
                        fill="white"
                        stroke="#E7E7E7"
                        strokeWidth="0.5"
                      />
                      <path d="M22.4419 13.7221L23.3 12.7828C23.5484 12.5284 23.6161 12.3327 23.6387 12.2348C22.9613 12.5871 22.329 12.7045 21.9226 12.7045H21.7645L21.6742 12.6262C21.1323 12.2153 20.4548 12 19.7323 12C18.1516 12 16.9097 13.135 16.9097 14.4462C16.9097 14.5245 16.9097 14.6419 16.9323 14.7202L17 15.1115L16.5258 15.092C13.6355 15.0137 11.2645 12.8611 10.8806 12.4892C10.2484 13.4677 10.6097 14.407 10.9935 14.9941L11.7613 16.09L10.5419 15.5029C10.5645 16.3249 10.9258 16.9706 11.6258 17.4403L12.2355 17.8317L11.6258 18.047C12.0097 19.045 12.8677 19.456 13.5 19.6125L14.3355 19.8082L13.5452 20.2779C12.2806 21.0607 10.7 21.002 10 20.9432C11.4226 21.8043 13.1161 22 14.2903 22C15.171 22 15.8258 21.9217 15.9839 21.863C22.3065 20.5714 22.6 15.6791 22.6 14.7006V14.5636L22.7355 14.4853C23.5032 13.8591 23.8194 13.5264 24 13.3307C23.9323 13.3503 23.8419 13.3894 23.7516 13.409L22.4419 13.7221Z" />
                    </svg>
                    <svg
                      width="34"
                      height="34"
                      viewBox="0 0 34 34"
                      fill="none"
                      className="cursor-pointer hover:fill-[#921CB1] fill-[#637381]"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.8862 32.7723C25.6598 32.7723 32.7723 25.6598 32.7723 16.8862C32.7723 8.11248 25.6598 1 16.8862 1C8.11248 1 1 8.11248 1 16.8862C1 25.6598 8.11248 32.7723 16.8862 32.7723Z"
                        fill="white"
                        stroke="#E7E7E7"
                        strokeWidth="0.5"
                      />
                      <path d="M22.4197 12.0079C21.3781 11.5298 20.2781 11.1909 19.1481 11C19.0041 11.248 18.8443 11.5842 18.732 11.848C17.5303 11.6721 16.3094 11.6721 15.1077 11.848C14.9953 11.5842 14.8265 11.248 14.6908 11C13.5598 11.1887 12.459 11.5276 11.4177 12.0079C9.347 15.0638 8.78691 18.0482 9.06733 20.9918C10.2807 21.8827 11.6361 22.5617 13.0761 23C13.3996 22.5633 13.6861 22.1004 13.9325 21.616C13.4598 21.4396 13.0128 21.224 12.5801 20.9677C12.6924 20.8878 12.804 20.7996 12.908 20.7114C15.5162 21.904 18.3408 21.904 20.9166 20.7114C21.0289 20.7996 21.1329 20.8878 21.2445 20.9677C20.8125 21.224 20.3648 21.4396 19.8929 21.616C20.139 22.1004 20.4252 22.5633 20.7485 23C22.189 22.563 23.5446 21.8839 24.7573 20.9918C25.1018 17.5846 24.213 14.6236 22.4204 12.0079H22.4197ZM14.2913 19.1759C13.5073 19.1759 12.8673 18.4635 12.8673 17.5921C12.8673 16.72 13.4915 16.0076 14.292 16.0076C15.0835 16.0076 15.7318 16.72 15.7152 17.5921C15.7152 18.4635 15.0835 19.1759 14.2913 19.1759ZM19.5484 19.1759C18.7644 19.1759 18.1237 18.4635 18.1237 17.5921C18.1237 16.72 18.7478 16.0076 19.5484 16.0076C20.3399 16.0076 20.9882 16.72 20.9723 17.5921C20.9723 18.4635 20.3482 19.1751 19.5476 19.1751L19.5484 19.1759Z" />
                    </svg>
                    <svg
                      width="34"
                      height="34"
                      viewBox="0 0 34 34"
                      fill="none"
                      className="cursor-pointer hover:fill-[#921CB1] fill-[#637381]"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.8862 32.7723C25.6598 32.7723 32.7723 25.6598 32.7723 16.8862C32.7723 8.11248 25.6598 1 16.8862 1C8.11248 1 1 8.11248 1 16.8862C1 25.6598 8.11248 32.7723 16.8862 32.7723Z"
                        fill="white"
                        stroke="#E7E7E7"
                        strokeWidth="0.5"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.5 9C12.3065 9 11.1619 9.47411 10.318 10.318C9.47411 11.1619 9 12.3065 9 13.5V19.5C9 20.6935 9.47411 21.8381 10.318 22.682C11.1619 23.5259 12.3065 24 13.5 24H19.5C20.6935 24 21.8381 23.5259 22.682 22.682C23.5259 21.8381 24 20.6935 24 19.5V13.5C24 12.3065 23.5259 11.1619 22.682 10.318C21.8381 9.47411 20.6935 9 19.5 9H13.5ZM13 16.5C13 15.5717 13.3687 14.6815 14.0251 14.0251C14.6815 13.3687 15.5717 13 16.5 13C17.4283 13 18.3185 13.3687 18.9749 14.0251C19.6313 14.6815 20 15.5717 20 16.5C20 17.4283 19.6313 18.3185 18.9749 18.9749C18.3185 19.6313 17.4283 20 16.5 20C15.5717 20 14.6815 19.6313 14.0251 18.9749C13.3687 18.3185 13 17.4283 13 16.5ZM20 13H21V12H20V13Z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col gap-7 md:w-3/12">
                  <span className="text-xl font-semibold">Useful Links</span>
                  <div className="flex flex-col gap-3">
                    {mavigationList?.map((data, index) => (
                      <span
                        className="hover:text-[#921CB1] text-md font-medium cursor-pointer w-fit"
                        key={index}
                      >
                        {data}
                      </span>
                    ))}
                  </div>
                </div>
                {/* </div> */}
                <div className="max-w-[290px] flex flex-col gap-8">
                  <div className="flex flex-col max-w-[260px] gap-6">
                    <span className="text-xl font-semibold">
                      Subscribe Newsletter
                    </span>
                    <span className="text-base font-medium">
                      Enter your email to receive our valuable newsletters.
                    </span>
                  </div>
                  <div className="bg-white py-4 px-5 rounded-lg flex justify-between items-center group border-[3px] focus-within:border-[#9517AF] border-[#233047]">
                    <input
                      type="text"
                      className=" w-2/3 h-6 text-black group outline-none"
                      placeholder="Enter your email"
                    />
                    <svg
                      width="23"
                      height="16"
                      viewBox="0 0 23 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.4614 0H2.12681C0.9534 0 0 0.983452 0 2.19385V13.8061C0 15.0165 0.9534 16 2.12681 16H20.4614C21.6348 16 22.5882 15.0165 22.5882 13.8061V2.19385C22.5882 0.983452 21.6348 0 20.4614 0ZM20.4614 1.32388C20.6448 1.32388 20.7914 1.3617 20.9381 1.47518L11.8075 7.18676C11.4775 7.37589 11.1108 7.37589 10.7807 7.18676L1.65011 1.47518C1.79679 1.39953 1.94347 1.32388 2.12681 1.32388H20.4614ZM20.4614 14.6383H2.12681C1.68678 14.6383 1.28342 14.26 1.28342 13.7683V2.79905L10.084 8.32151C10.4507 8.54846 10.8541 8.66194 11.2574 8.66194C11.6608 8.66194 12.0642 8.54846 12.4309 8.32151L21.2315 2.79905V13.7683C21.3048 14.26 20.9015 14.6383 20.4614 14.6383Z"
                        fill="#921CB1"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TemplateReact;
export const DropDown = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded((current) => !current);
  return (
    <div
      className="w-full cursor-pointer bg-transparent py-8 px-7 gap-3"
      onClick={toggleExpanded}
    >
      <div className="flex  flex-row items-center justify-between text-left gap-3">
        <h5 className="flex-1 text-lg sm:text-2xl font-medium ">{title}</h5>
        <div className="flex items-center justify-center rounded-full">
          <img
            src="/assets/nft/infytoken/uparrow.png"
            alt="arrow"
            className={!expanded ? "rotate-180" : "rotate-0"}
          />
        </div>
      </div>
      <div
        className={`overflow-hidden pt-0 transition-[max-height] duration-500 ease-in ${
          expanded ? "max-h-40" : "max-h-1"
        }`}
      >
        <p className="pb-4 text-left  sm:text-xl font-normal text-sm ">
          {content}
        </p>
      </div>
    </div>
  );
};
