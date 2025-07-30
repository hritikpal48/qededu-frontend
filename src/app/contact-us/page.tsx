"use client";

import React from "react";
import HomeLayout from "@/components/layouts/homelayout/HomeLayout";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";

const page = () => {
  return (
    <section className="bg-white py-12 px-4 md:px-10 max-w-7xl mx-auto">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Contact Us</h2>
        <p className="text-green-700 font-semibold mt-2">— Say Hello —</p>
        <p className="text-lg font-medium mt-4">
          Always there to have a conversation
        </p>
      </div>

      {/* Form and Info Section */}
      <div className="bg-white shadow-md rounded-lg grid md:grid-cols-3 gap-6 p-6 md:p-10">
        {/* Form */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-2">Reach out to us</h3>
          <p className="text-sm text-gray-600 mb-4">
            Contact us 24/7. Just let us know your query. Don’t like filling
            up forms? Mail us at{" "}
            <a
              href="mailto:info@qededu.com"
              className="text-green-600 underline"
            >
              info@qededu.com
            </a>
          </p>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="tel"
              placeholder="Mobile Number (WhatsApp)"
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full border px-4 py-2 rounded"
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full border px-4 py-2 rounded resize-none"
            ></textarea>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
          <div className="space-y-4 text-sm text-gray-700">
            <div className="flex items-start gap-3">
              <FaPhoneAlt className="mt-1 text-green-500" />
              <div>
                <p className="font-medium">Call us</p>
                <p>+91 9999999999</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaEnvelope className="mt-1 text-green-500" />
              <div>
                <p className="font-medium">Email</p>
                <p>info@qededu.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 text-green-500" />
              <div>
                <p className="font-medium">Location</p>
                <p>
                  1036, Behind Vidhikendra, Adipur-Kutch – 370205, Gujarat
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaWhatsapp className="mt-1 text-green-600" />
              <div>
                <p className="font-medium">WhatsApp Group</p>
                <a
                  href="#"
                  className="text-green-700 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join QedEdu's WhatsApp Group
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
