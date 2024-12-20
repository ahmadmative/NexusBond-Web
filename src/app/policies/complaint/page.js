'use client';
import Link from 'next/link';
import styles from './complaint.module.css';

export default function ComplaintPolicy() {
  return (
    <div className={styles.policyContainer}>
      <div className={styles.policyContent}>
        <h1>Complaints Policy</h1>
        <p className={styles.date}>Date of revision: 12/10/2024</p>

        <div className={styles.introduction}>
          <p>
            At NexusBond.AI we value our users and strive to provide a positive experience with NexusBond.AI. We understand that concerns or complaints may arise from time to time, and we are committed to addressing them. At NexusBond.AI, your feedback matters. We're committed to continuous improvement and want to address any concerns you may have promptly and effectively. This Complaints Policy outlines a clear process for reporting and resolving issues related to our services.
          </p>
        </div>

        <section className={styles.section}>
          <div className={styles.subsection}>
            <h3>1. Customer Support</h3>
            <p>
              We are dedicated to assisting and supporting our users with any concerns or complaints. We provide prompt and effective assistance. Users can contact our support team if they come across any issues or have inquiries regarding our APP or Website services.
            </p>
          </div>

          <div className={styles.subsection}>
            <h3>2. Submitting a complaint</h3>
            <ol>
              <li>You can submit a complaint via our <Link href="/contact" className={styles.link}>Contact us</Link> page on our app and website.</li>
              <li>You can also submit a complaint via email to <a href="mailto:info@NexusBond.AI" className={styles.link}>info@NexusBond.AI</a></li>
            </ol>
          </div>

          <div className={styles.subsection}>
            <h3>3. Information required</h3>
            <ol>
              <li>Detailed description of the complaint, including relevant details such as the date and time of the incident.</li>
              <li>Any supporting evidence or documentation or screenshots, if applicable.</li>
              <li>Contact information such as full name and email for follow-up.</li>
            </ol>
          </div>

          <div className={styles.subsection}>
            <h3>4. Acknowledgement</h3>
            <ol>
              <li>We make every attempt to review complaints within 24 hours and will acknowledge the complaint within 24-48 hours.</li>
            </ol>
          </div>

          <div className={styles.subsection}>
            <h3>5. Investigation and Resolution</h3>
            <ol>
              <li>We will conduct a thorough investigation into each complaint to understand the nature of the issue. Our goal is to provide a resolution within a reasonable timeframe. Depending on the complexity of the complaint, some cases may require additional time to conduct a comprehensive investigation. Users will be kept informed of the progress and expected resolution timeline.</li>
            </ol>
          </div>

          <div className={styles.subsection}>
            <h3>6. Feedback and Follow-up</h3>
            <p>
              Once the complaint has been addressed, users will receive feedback regarding the outcome of the investigation and any action taken. We may also seek user feedback on the resolution process to continuously improve our services.
            </p>
          </div>

          <div className={styles.subsection}>
            <h3>Confidentiality</h3>
            <ol>
              <li>All complaints and related information will be handled with strict confidentiality.</li>
              <li>All reported complaints will be reviewed and resolved within 7 business days.</li>
            </ol>
          </div>

          <div className={styles.contact}>
            <p>
              For any questions or concerns regarding this policy, please contact us at{' '}
              <a href="mailto:info@NexusBond.AI" className={styles.link}>info@NexusBond.AI</a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}