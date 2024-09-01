import React from "react";
import { useMainContext } from "../store/Context";

const About = () => {
  const { Mode } = useMainContext();
  return (
    <article className={Mode === "dark" ? "dark-bg about" : "light-bg about"}>
      <div className="container">
        <h2>Terms & Conditions</h2>
        <h6>1. Introduction </h6>
        <p>
          Welcome to AI UPDATES. By accessing or using this Website, you agree
          to comply with and be bound by the following terms and conditions
          ("Terms"). If you do not agree with these Terms, please do not use the
          Website.
        </p>

        <h6>2. Eligibility</h6>
        <p>
          By using this Website, you affirm that you are at least 18 years of
          age or have the legal consent of a parent or guardian if under 18. You
          are fully able and competent to enter into these Terms.
        </p>

        <h6>3. User Accounts</h6>
        <p>
          1. Registration: Some parts of the Website may require you to create
          an account. You agree to provide accurate and complete information
          during the registration process.
          <p></p>2. Account Security: You are responsible for maintaining the
          confidentiality of your account information, including your password.
          You agree to notify us immediately of any unauthorized use of your
          account.
        </p>

        <h6>4. Content</h6>
        <p>
          1.User-Generated Content: You may submit, post, or display content on
          the Website ("User Content"). You retain ownership of your User
          Content but grant us a non-exclusive, royalty-free, perpetual, and
          worldwide license to use, display, and distribute it on the Website.
          <p></p>
          2. Content Standards: You agree not to post any content that is
          illegal, offensive, defamatory, or infringes on the rights of others.
          We reserve the right to remove any content that violates these Terms.
        </p>

        <h6>5. Intellectual Property</h6>
        <p>
          1. Our Content: The content on this Website, including text, graphics,
          logos, and images, is the property of AI UPDATES or its content
          suppliers and is protected by intellectual property laws.<p></p>
          2.User Content: You retain all rights to your User Content. By
          submitting it, you grant us a license to use it as described above
        </p>

        <h6>6. Prohibited Uses</h6>
        <p>
          You agree not to: <p></p> 1. Use the Website for any unlawful purpose.
          <p></p> 2. Attempt to gain unauthorized access to the Website. <p></p>{" "}
          3. Post or transmit any material that contains viruses or harmful
          components. <p></p> 4. Engage in any conduct that restricts or
          inhibits any other user from using the Website.
        </p>

        <h6>7. Privacy</h6>
        <p>
          Your use of the Website is also governed by our Privacy Policy, which
          describes how we collect, use, and protect your personal information.
        </p>

        <h6>8. Disclaimer of Warranties</h6>
        <p>
          The Website is provided "as is" without warranties of any kind, either
          express or implied. We do not guarantee that the Website will be
          error-free or that access will be uninterrupted.
        </p>

        <h6>9. Limitation of Liability</h6>
        <p>
          In no event shall AI UPDATES, its affiliates, or its partners be
          liable for any indirect, incidental, special, consequential, or
          punitive damages arising out of or in connection with your use of the
          Website.
        </p>

        <h6>10. Indemnification</h6>
        <p>
          You agree to indemnify, defend, and hold harmless AI UPDATES, its
          officers, directors, employees, and agents from and against any
          claims, liabilities, damages, losses, and expenses, including
          reasonable attorneys' fees, arising out of or in any way connected
          with your use of the Website.
        </p>

        <h6>11. Termination</h6>
        <p>
          We reserve the right to terminate or suspend your access to the
          Website, without notice, for conduct that we believe violates these
          Terms or is harmful to other users of the Website.
        </p>

        <h6>12. Governing Law</h6>
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of the State of Karnataka, without regard to its conflict of law
          principles.
        </p>

        <h6>13. Changes to Terms</h6>
        <p>
          We reserve the right to modify these Terms at any time. Your continued
          use of the Website after any changes are made constitutes acceptance
          of the new Terms.
        </p>

        <h6>14. Contact Information</h6>
        <p>
          If you have any questions about these Terms, please contact us at
          mhrithik450@gmail.com
        </p>
      </div>
    </article>
  );
};

export default About;
