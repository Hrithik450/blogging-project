import React from "react";
import { useMainContext } from "../store/Context";

const Privacy = () => {
  const { Mode } = useMainContext();
  return (
    <article className={Mode === "dark" ? "dark-bg about" : "light-bg about"}>
      <div className="container">
        <h2>Privacy Policy</h2>

        <h6>1. Introduction</h6>
        <p>
          Welcome to AI UPDATES. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you visit our
          Website. Please read this policy carefully.
        </p>

        <h6>2. Information We Collect</h6>
        <p>
          We may collect and process the following types of information:<p></p>
          1. Personal Information: Name, email address, contact information, and
          any other information you provide when you register or interact with
          our Website.<p></p> 2. Usage Data: Information about how you use the
          Website, including your IP address, browser type, operating system,
          pages visited, and the time and date of your visit.<p></p> 3.Cookies
          and Tracking Technologies: We use cookies and similar tracking
          technologies to enhance your experience on our Website.
        </p>

        <h6>3. How We Use Your Information</h6>
        <p>
          We use the information we collect to:<p></p> 1.Provide, operate, and
          maintain our Website.<p></p> 2.Improve, personalize, and expand our
          Website.<p></p> 3.Understand and analyze how you use our Website.
          <p></p> 4.Communicate with you, including responding to your comments,
          questions, or requests.<p></p> 5.Send you updates, newsletters, and
          promotional materials (if you have opted in).<p></p> 6.Protect against
          fraudulent or unauthorized activity.
        </p>

        <h6>4. How We Share Your Information</h6>
        <p>
          We do not sell or rent your personal information.We may share your
          information in the following situations:<p></p> 1. With Service
          Providers: We may share your information with third-party service
          providers who perform services on our behalf, such as payment
          processing or analytics.<p></p> 2.For Legal Reasons: We may disclose
          your information to comply with legal obligations, enforce our Terms
          and Conditions, or protect the rights, property, or safety of our
          Website or others.<p></p> 3.Business Transfers: If we are involved in
          a merger, acquisition, or asset sale, your information may be
          transferred as part of that transaction.
        </p>

        <h6>5. Cookies and Tracking Technologies</h6>
        <p>
          1. Cookies: We use cookies to enhance your experience on our Website.
          Cookies are small files placed on your device that help us remember
          your preferences and track your usage.<p></p> 2. Managing Cookies: You
          can manage or disable cookies through your browser settings. However,
          disabling cookies may affect the functionality of the Website.
        </p>

        <h6>6. Security</h6>
        <p>
          We take reasonable measures to protect your information from
          unauthorized access, use, or disclosure. However, no method of
          transmission over the internet or electronic storage is 100% secure.
          We cannot guarantee the absolute security of your information.
        </p>

        <h6>7. Your Choices</h6>
        <p>
          1. Access and Update: You can access and update your personal
          information by contacting us. <p></p> 2.Opt-Out: You can opt-out of
          receiving promotional emails from us by following the instructions in
          those emails or contacting us directly.
        </p>

        <h6>8. Children's Privacy</h6>
        <p>
          Our Website is not intended for children under the age of 13. We do
          not knowingly collect personal information from children under 13. If
          we become aware that we have collected personal information from a
          child under 13, we will take steps to delete such information.
        </p>

        <h6>9. Changes to This Privacy Policy</h6>
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on our Website.
          You are advised to review this Privacy Policy periodically for any
          changes.
        </p>

        <h6>10. Contact Us</h6>
        <p>
          If you have any questions or concerns about this Privacy Policy or our
          data practices, please contact us at: mhrithik450@gmail.com
        </p>
      </div>
    </article>
  );
};

export default Privacy;
