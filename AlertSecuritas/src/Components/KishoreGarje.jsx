import React from "react";
import { useRef } from "react";
import html2canvas from "html2canvas";
import { KishoreGarje } from "../Data/KishoreGarje";
import jsPDF from "jspdf";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaLinkedin,
  FaFacebookSquare,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const ProfileCard = () => {
  const user = KishoreGarje[0];
  const cardRef = useRef();

  // ✅ Move inside component
  const handleDownload = async () => {
    const element = cardRef.current;

    // 🔥 scroll reset (IMPORTANT)
    window.scrollTo(0, 0);

    const rect = element.getBoundingClientRect();

    const canvas = await html2canvas(element, {
      scale: 4,
      useCORS: true,
      backgroundColor: "#ffffff",

      // 🔥 EXACT CROP (MAIN FIX)
      width: rect.width,
      height: rect.height,
      x: 0,
      y: 0,

      scrollX: 0,
      scrollY: 0,
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight,

      onclone: (doc) => {
        const clonedCard = doc.querySelector("#card");

        if (clonedCard) {
          // 🔥 REMOVE ANY TRANSFORM / SHIFT
          clonedCard.style.transform = "none";
          clonedCard.style.margin = "0";
        }

        const all = doc.querySelectorAll("*");

        all.forEach((el) => {
          const computed = window.getComputedStyle(el);

          // 🔥 FIX OKLCH
          if (computed.color.includes("oklch")) {
            el.style.color = "#000000";
          }

          if (computed.backgroundColor.includes("oklch")) {
            el.style.backgroundColor = "#ffffff";
          }

          if (computed.borderColor.includes("oklch")) {
            el.style.borderColor = "#000000";
          }
        });
      },
    });

    const imgData = canvas.toDataURL("image/png", 1.0);

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("profile-card.pdf");
  };

  // ✅ Also fix this (user access issue)
  const handleSaveContact = () => {
    const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${user.founderFirst} ${user.founderLast}
ORG:${user.companyName}
TEL:${user.phone}
EMAIL:${user.email}
URL:${user.website}
ADR:${user.address}
END:VCARD
    `;

    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${user.founderFirst}.vcf`;
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div
        id="card"
        ref={cardRef}
        className="bg-[#fffff2] w-full max-w-sm rounded-xl shadow-lg overflow-hidden relative text-[#ffffff]"
      >
        {/* Top Banner */}
        <div className="bg-[#0E0545] h-28"></div>

        {/* Profile Image */}
        <div className="flex justify-center -mt-14">
          <img
            src={user.Image}
            alt="profile"
            className="w-30 h-30 rounded-full border border-[#fffff2] object-cover"
          />
        </div>

        {/* Content */}
        <div className="pb-6 flex flex-col items-center justify-center">
          {/* Name */}
          <div className="text-center px-6 w-full flex flex-col gap-0.8 mb-2">
            <h2 className="text-2xl font-bold text-[#0E0545] italic">
              {user.founderFirst}{" "}
              <span className="text-[#E53935]">{user.founderLast}</span>
            </h2>

            <p className="text-[16px] text-[#0E0545] font-bold tracking-wider">
              {user.title}
            </p>
            {/* <p className="text-[14px] font-semibold tracking-wider text-[#E53935]">{user.companyName}</p> */}
          </div>

          {/* ✅ Services */}
          <div className="flex flex-wrap py-3 justify-center gap-3 items-center px-6 border-t border-[#dfdfdf]">
            {user.services.map((service, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs border border-[#0E0545] text-[#0E0545] font-semibold tracking-wider rounded-full hover:bg-[#E53935]/30 duration-700 transition"
              >
                {service}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="border-y w-full py-3 justify-center border-[#dfdfdf]">
            <div className="px-6 w-full flex gap-3">
              <a
                href={`https://contacts.google.com/new?name=${user.founderFirst}&phone=${user.phone}`}
                target="_blank"
                className="flex-1 border border-[#0E0545] font-semibold tracking-wider py-2 rounded text-[#0E0545] text-center hover:bg-[#0e0545] hover:text-[#ffffff] w-full durartion-1000 transition-all ease"
              >
                Save Contact
              </a>

              <button
                onClick={handleDownload}
                className="flex-1 border border-[#0E0545] font-semibold tracking-wider py-2 text-[#0E0545] rounded hover:bg-[#0e0545] hover:text-[#ffffff]  w-full durartion-1000 transition-all ease"
              >
                Download
              </button>
            </div>
          </div>

          {/* Contact List */}
          <div className="">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${user.phone.replace(/\D/g, "")}`}
              target="_blank"
              className="flex items-center gap-3 py-3 px-6"
            >
              <div className="bg-[#0E0545] text-[#ffffff] p-2.5 rounded-full">
                <FaWhatsapp size={16} />
              </div>
              <p className="text-[16px] font-bold text-[#0E0545]">
                Connect On WhatsApp
              </p>
            </a>

            {/* Phone */}
            <a
              href={user.phoneHref}
              target="_blank"
              className="flex items-center gap-3  py-3 px-6"
            >
              <div className="bg-[#0E0545] text-[#ffffff] p-2.5 rounded-full">
                <FaPhoneAlt size={16} />
              </div>
              <p className="text-[16px] font-bold text-[#0E0545]">
                {user.phone}
              </p>
            </a>

            {/* Email */}
            <a
              href={user.emailHref}
              target="_blank"
              className="flex items-center gap-3 py-3 px-6"
            >
              <div className="bg-[#0E0545] text-[#ffffff] p-2.5 rounded-full">
                <FaEnvelope size={16} />
              </div>
              <p className="text-[16px] font-bold text-[#0E0545]">
                {user.email}
              </p>
            </a>

            {/* Website */}
            <a
              href={user.websiteHref}
              target="_blank"
              className="flex items-center gap-3 py-3 px-6"
            >
              <div className="bg-[#0E0545] text-[#ffffff] p-2.5 rounded-full">
                <FaGlobe size={16} />
              </div>
              <p className="text-[16px] font-bold text-[#0E0545]">
                {user.website}
              </p>
            </a>

            {/* Address */}
            <a
              href={`https://www.google.com/maps?q=${encodeURIComponent(user.address)}`}
              target="_blank"
              className="flex items-center gap-3 py-3 px-6"
            >
              <div className="bg-[#0E0545]  text-[#ffffff] p-2.5 rounded-full">
                <FaMapMarkerAlt size={16} />
              </div>
              <p className="text-[14px] text-[#0E0545] font-bold tracking-tight">
                {user.address}
              </p>
            </a>
          </div>

          {/* Bottom Social Icons Grid */}
          <div className="grid grid-cols-4 gap-4 text-2xl text-center w-full px-6 text-[#0E0545] border-t border-[#dfdfdf] pt-3">
            <a
              href="https://www.linkedin.com/company/alert-securitas"
              className="border p-2.5 w-fit rounded-full transition duration-700 hover:bg-[#031824] hover:text-[#ffffff] hover:scale-110"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://www.facebook.com/alertsecuritas/"
              className="border p-2.5 w-fit rounded-full transition duration-700 hover:bg-[#031824] hover:text-[#ffffff] hover:scale-110"
            >
              <FaFacebookSquare />
            </a>

            <a
              href="https://www.youtube.com/@alertsecuritas"
              className="border p-2.5 w-fit rounded-full transition duration-700 hover:bg-[#031824] hover:text-[#ffffff] hover:scale-110"
            >
              <FaYoutube />
            </a>

            <a
              href="https://www.instagram.com/alert_securitas/"
              className="border p-2.5 w-fit rounded-full transition duration-700 hover:bg-[#031824] hover:text-[#ffffff] hover:scale-110"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Views */}
        <div className="absolute top-3 right-3  text-[] duration-1200 ease-in-out transition-color text-[14px] border border-white px-3 py-1 rounded-2xl uppercase font-bold tracking-widest ">
          alert securitas
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
