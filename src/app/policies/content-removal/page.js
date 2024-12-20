"use client";
import Link from "next/link";
import styles from "./content-removal.module.css";

export default function ContentRemovalPolicy() {
  return (
    <div className={styles.policyContainer}>
      <div className={styles.policyContent}>
        <h1>Content Removal Policy</h1>
        <p className={styles.date}>Date of Revision: 11/2/2024</p>

        <div className={styles.introduction}>
          <p>
            At NexusBond.AI we strive to maintain a safe and respectful experience of all our users. Our Content Removal Policy outlines our approach to addressing concerns related to content that may inadvertently resemble real individuals. All content accessible on NexusBond.AI is generated exclusively through artificial intelligence technology, allowing users to create and interact with AI-generated characters. It is important to note that any similarity to an actual NexusBond.AI person is unintentional and purely coincidental.
          </p>
        </div>

        <section className={styles.section}>
          <div className={styles.subsection}>
            <h3>1. Unintentional Resemblance to Actual Persons</h3>
            <p>
              Despite the AI-generated nature of the content on the APP or website we acknowledge that there might be instances where the generated content unintentionally resembles actual persons. Recognizing the concerns that may arise in such situations, we are dedicated to promptly addressing them.
            </p>
          </div>

          <div className={styles.subsection}>
            <h3>2. Content Removal Process</h3>
            <p>
              If a user believes that any content on our APP or website bears resemblance to them or another actual person, they can request its removal by contacting our support team at{" "}
              <a href="mailto:info@NexusBond.AI" className={styles.link}>info@NexusBond.AI</a> or directly report their concern in the APP or website in the <Link href="/contact" className={styles.link}>"Contact"</Link> section. We will thoroughly review the request and take appropriate action within a reasonable timeframe.
            </p>
          </div>

          <div className={styles.subsection}>
            <h3>3. User Verification</h3>
            <p>
              To ensure the accuracy and legitimacy of content removal requests, we may request the user to provide adequate evidence of their identity or relationship to the person depicted in the content. This verification process is implemented to responsibly handle requests and safeguard the rights and interests of all users.
            </p>
          </div>

          <div className={styles.subsection}>
            <h3>4. Content Removal</h3>
            <p>
              Upon verification and confirmation of a valid content removal request, the specified content will be removed in a timely manner from the APP/website. Our goal is to complete this process promptly while ensuring compliance with applicable laws and regulations.
            </p>
          </div>

          <div className={styles.subsection}>
            <h3>5. Privacy</h3>
            <p>
              Our highest priority is to respect user privacy throughout the entire content removal process. All requests are treated strictly confidentially, and we do not disclose any personal information or details of the requests to any third parties without explicit consent, unless required by law.
            </p>
          </div>

          <div className={styles.subsection}>
            <h3>6. Contact Information</h3>
            <p>
              If you have any questions or require further clarification regarding our Content Removal Policy, please contact us at:{" "}
              <a href="mailto:info@NexusBond.AI" className={styles.link}>info@NexusBond.AI</a> or directly report in the APP or website in the <Link href="/contact" className={styles.link}>"Contact"</Link> section. We are committed to addressing concerns in a timely manner and ensuring a positive experience for all our users.
            </p>
          </div>

          <div className={styles.otherMatters}>
            <h2>Other Matters</h2>
            <p>
              At NexusBond.AI, we are committed to maintaining a respectful and safe environment for all users. We understand that certain content may not adhere to our guidelines or may be deemed inappropriate. This Content Removal Policy outlines the procedures and circumstances under which content may be removed from our platform.
            </p>

            <div className={styles.removableContent}>
              <h3>Types of Removable Content:</h3>
              <ul>
                <li>Content that violates our Community Guidelines.</li>
                <li>Content that infringes upon intellectual property rights.</li>
                <li>Content that is considered illegal, harmful, or abusive.</li>
                <li>Content that involves impersonation or unauthorized use of personal information.</li>
              </ul>
            </div>

            <div className={styles.reportingProcess}>
              <h3>Reporting Mechanism:</h3>
              <p>
                Users can report inappropriate content directly to our support team at{" "}
                <a href="mailto:info@NexusBond.AI" className={styles.link}>info@NexusBond.AI</a>
              </p>

              <h3>Review Process:</h3>
              <ul>
                <li>All reported content is reviewed by our moderation team within 24-48 hours.</li>
                <li>During the review, content may be temporarily removed or restricted until a final decision is made.</li>
              </ul>

              <h3>Consequences of Violation:</h3>
              <p>
                Repeated violations of our Content Removal Policy may result in account suspension or termination.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
