"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import TextInput from "@/components/ui/input/TextInput";
import { useCreateContact } from "@/services/contact.service";
import toast from "react-hot-toast";
import { LoaderButton } from "@/components/ui/button";

//zod validations
const validationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  phoneNo: z
    .string()
    .min(10, "Phone must be 10 digits")
    .max(10, "Phone must be 10 digits"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof validationSchema>;

const Contactpage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(validationSchema),
  });

  // ✅ service hook
  const { mutate: createContact } = useCreateContact({
    onSuccess: (res: any) => {
      toast.success(res?.message || "Your message has been sent!");
      reset();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });

  const onSubmit = (data: ContactFormData) => {
    createContact(data);
  };

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">Let’s Talk</h2>
        <p className="text-green-600 font-medium mt-2 text-lg">
          — Get in Touch —
        </p>
        <p className="mt-4 text-gray-600">
          We’re here to answer any questions you may have.
        </p>
      </div>

      {/* Form & Info Grid */}
      <div className="grid md:grid-cols-3 gap-10 bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Contact Form */}
        <div className="md:col-span-2 p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Send Us a Message
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Have a question or feedback? Fill out the form and we’ll get back to
            you. Or drop an email at{" "}
            <a
              href="mailto:info@qededu.com"
              className="text-green-600 underline"
            >
              info@qededu.com
            </a>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <TextInput
                label="Full Name"
                name="fullName"
                register={register}
                error={errors.fullName}
              />

              <TextInput
                label="Email Address"
                name="email"
                type="email"
                register={register}
                error={errors.email}
              />
            </div>

            <TextInput
              label="Mobile Number (WhatsApp)"
              name="phoneNo"
              type="tel"
              register={register}
              error={errors.phoneNo}
            />

            <TextInput
              label="Subject"
              name="subject"
              register={register}
              error={errors.subject}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Message
              </label>
              <textarea
                {...register("message")}
                rows={5}
                className="w-full border border-gray-300 px-4 py-3 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.message && (
                <span className="text-red-500 text-sm">
                  {errors.message.message}
                </span>
              )}
            </div>

            <LoaderButton
              type="submit"
              text="Send Message"
              className="bg-green-600 text-white px-6 py-2 rounded-[5px] hover:bg-green-700 font-semibold cursor-pointer"
            />
          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-green-50 p-8 flex flex-col justify-center">
          <h4 className="text-xl font-semibold text-gray-800 mb-6">
            Contact Info
          </h4>
          <div className="space-y-6 text-sm text-gray-700">
            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-green-500 mt-1" />
              <div>
                <p className="font-medium">Phone</p>
                <p>+91 9999999999</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaEnvelope className="text-green-500 mt-1" />
              <div>
                <p className="font-medium">Email</p>
                <p>info@qededu.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-green-500 mt-1" />
              <div>
                <p className="font-medium">Address</p>
                <p>1036, Behind Vidhikendra, Adipur-Kutch – 370205, Gujarat</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaWhatsapp className="text-green-600 mt-1" />
              <div>
                <p className="font-medium">WhatsApp Group</p>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 underline"
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

export default Contactpage;
