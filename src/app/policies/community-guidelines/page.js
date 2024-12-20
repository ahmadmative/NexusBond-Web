"use client";
import Link from "next/link";
import styles from "./community.module.css";

export default function CommunityGuidelines() {
  return (
    <div className={styles.policyContainer}>
      <div className={styles.policyContent}>
        <h1>Community Guidelines</h1>
        <p className={styles.date}>Date of Revision: 12/10/2024</p>

        <div className={styles.introduction}>
          <p>
            Our community rules play an important role in maintaining a positive experience for our users. Please follow these rules, in addition to all applicable laws, the NexusBond.AI Terms of Use, the NexusBond.AI Privacy Policy, and all posted rules, when using the NexusBond.AI service. When we are notified or otherwise become aware of a potential rule violation, we may review and take action, including limiting or terminating a users access to the community or app, or as otherwise specified in these rules. For more information, please see our <Link href="/policies/terms" className={styles.link}>Terms of Use</Link>.
          </p>
          <p>
            We may modify these rules, so please check back here from time to time. NexusBond.AI is available only to users 18 and older.
          </p>
        </div>

        <section className={styles.section}>
          <div className={styles.guidelineItem}>
            <h3>Illegal Activities</h3>
            <p>Do not use the NexusBond.AI service to engage in or promote illegal activities, including commercial sexual activity, trafficking, or pornography, or to promote dangerous or illegal acts.</p>
          </div>

          <div className={styles.guidelineItem}>
            <h3>Malicious Use</h3>
            <p>Do not transmit viruses, malware, or any other malicious or destructive code. Do not distribute content that harms or interferes with the operation of the NexusBond.AI service.</p>
          </div>

          <div className={styles.guidelineItem}>
            <h3>Hate Speech</h3>
            <p>Do not post or distribute content that promotes hatred or violence towards groups of people based on their race or ethnic origin, national origin, religion, disability, gender, age, veteran status, sexual orientation, or gender identity. This includes content related to or depicting historical atrocities or idolization of hate figures such as Adolf Hitler, Joseph Stalin, or Pol Pot.</p>
          </div>

          {/* Continue with other guidelines... */}

          <div className={styles.guidelineItem}>
            <h3>Avatar Moderation and Compliance</h3>
            <ul>
              <li>Users must ensure that avatars do not impersonate real individuals without their consent.</li>
              <li>Avatars should not contain explicit or offensive imagery.</li>
              <li>Our moderation team reviews uploaded avatars to ensure compliance with these guidelines.</li>
            </ul>
          </div>

          <div className={styles.reportingSection}>
            <h3>Reporting Potential Issues</h3>
            <p>
              We monitor and review NexusBond.AI accounts, characters, and interactions for content that may violate our Community Guidelines, our Terms of Use, or otherwise be harmful.
            </p>
            <p>
              Our users play an important role in reporting content or behavior that may violate our Community Guidelines. If anything happens that makes you feel uncomfortable or unsafe, we highly encourage you to stop interacting with the character.
            </p>
            <p>
              If you encounter content, a character, or a user that you believe violates the above rules, please report it to us at{}
              <a href="mailto:info@NexusBond.AI" className={styles.link}>info@NexusBond.AI</a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
