"use client";
import { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import { TbMailForward } from "react-icons/tb";
import { isValidEmail } from "/utils/check-email";

/**
 * ContactWithoutCaptcha component renders a contact form without captcha verification.
 * It allows users to input their name, email, and message, and send the information via email.
 *
 * @component
 * @example
 * return (
 *   <ContactWithoutCaptcha />
 * )
 *
 * @returns {JSX.Element} The rendered contact form component.
 *
 * @function
 * @name ContactWithoutCaptcha
 *
 * @description
 * - Uses `useState` to manage form input and error states.
 * - Validates required fields and email format.
 * - Sends the form data using `emailjs` and `axios` upon form submission.
 * - Displays success or error messages based on the response.
 *
 * @requires emailjs
 * @requires axios
 * @requires toast
 * @requires TbMailForward
 *
 * @example
 * // Example usage:
 * <ContactWithoutCaptcha />
 */
function ContactWithoutCaptcha() {
  const [error, setError] = useState({ email: false, required: false });
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  /**
   * Checks if the required fields (email, message, and name) in the userInput object are filled.
   * If all required fields are filled, it updates the error state to indicate no required field errors.
   */
  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  /**
   * Handles the sending of an email using EmailJS and logs the contact message to the server.
   *
   * @param {Event} e - The event object from the form submission.
   * @returns {Promise<void>} - A promise that resolves when the email and log are successfully sent.
   *
   * @throws Will display an error toast if the email or log fails to send.
   */
  const handleSendMail = async (e) => {
    e.preventDefault();
    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    }

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const myPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    emailjs.init(myPublicKey);
    const templateParams = {
      from_name: userInput.name,
      from_email: userInput.email,
      message: userInput.message,
    };

    try {
      console.log("Sending email with EmailJS...");
      const res = await emailjs.send(serviceID, templateID, templateParams);
      console.log("EmailJS response:", res);

      if (res.status === 200) {
        toast.success("Message sent successfully!");
        setUserInput({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error(error?.text || error.message || "An error occurred");
    }
  };

  return (
    <div className="">
      <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
        Contact with me
      </p>
      <div className="max-w-3xl text-white rounded-lg border border-[#464c6a] p-3 lg:p-5">
        <p className="text-sm text-[#d3d8e8]">
          {
            "If you have any questions or concerns, please don't hesitate to contact me. I am open to any work opportunities that align with my skills and interests."
          }
        </p>
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-base">Your Name: </label>
            <input
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              type="text"
              name="user_name"
              maxLength="100"
              required={true}
              onChange={(e) =>
                setUserInput({ ...userInput, name: e.target.value })
              }
              onBlur={checkRequired}
              value={userInput.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">Your Email: </label>
            <input
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              type="email"
              name="user_email"
              maxLength="100"
              required={true}
              value={userInput.email}
              onChange={(e) =>
                setUserInput({ ...userInput, email: e.target.value })
              }
              onBlur={() => {
                checkRequired();
                setError({ ...error, email: !isValidEmail(userInput.email) });
              }}
            />
            {error.email && (
              <p className="text-sm text-red-400">
                Please provide a valid email!
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">Your Message: </label>
            <textarea
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              maxLength="500"
              name="message"
              required={true}
              onChange={(e) =>
                setUserInput({ ...userInput, message: e.target.value })
              }
              onBlur={checkRequired}
              rows="4"
              value={userInput.message}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            {error.required && (
              <p className="text-sm text-red-400">
                Email and Message are required!
              </p>
            )}
            <button
              className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-5 md:px-12 py-2.5 md:py-3 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
              role="button"
              onClick={handleSendMail}
            >
              <span>Send Message</span>
              <TbMailForward className="mt-1" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactWithoutCaptcha;
