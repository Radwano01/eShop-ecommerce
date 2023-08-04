import { useRef } from "react";
import Card from "../../components/card/Card";
import "./contact.scss";
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(form.current);

    emailjs
      .sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, "template_icn714m", e.target, "GuJn4gDLOPHyec_tK")
      .then(
        (result) => {
          toast.success("Message sent successfully");
        },
        (error) => {
          toast.error(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <section>
      <div className={`container ${"contact"}`}>
        <h2>Contact Us</h2>
        <div className={"section"}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={"card"}>
              <label>Name</label>
              <input
                type="text"
                name="user_name"
                placeholder="Full Name"
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="user_email"
                placeholder="Your active email"
                required
              />
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
              <label>Message</label>
              <textarea name="message" cols="30" rows="10"></textarea>
              <button className="--btn --btn-primary">Send Message</button>
            </Card>
          </form>

          <div className={"details"}>
            <Card cardClass={"card2"}>
              <h3>Our Contact Information</h3>
              <p>Fill the form or contact us via other channels listed below</p>
              <div className={"icons"}>
                <span>
                  <FaPhoneAlt />
                  <p>+905386166619</p>
                </span>
                <span>
                  <FaEnvelope />
                  <p>www.radwaniq@gmail.com</p>
                </span>
                <span>
                  <GoLocation />
                  <p>Turkey, Gaziantep</p>
                </span>
                <span>
                  <FaTwitter />
                  <p>@Radwan</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;