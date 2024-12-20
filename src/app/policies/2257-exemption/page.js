'use client';
import Link from 'next/link';
import styles from './exemption.module.css';

export default function ExemptionPolicy() {
  return (
    <div className={styles.policyContainer}>
      <div className={styles.policyContent}>
        <h1>18 U.S.C. 2257 Exemption</h1>
        <p className={styles.date}>Date of Revision: 12/10/2024</p>

        <div className={styles.section}>
          <h2>Federal Labeling and Record-Keeping Law</h2>
          <p>
            We operate as a purely AI-generated content platform where no real individual or individuals are portrayed or engaged in any creation. Every piece of content accessible on NexusBond.AI (the App and website) is exclusively generated through artificial intelligence (AI) technology. This method eliminates the participation of real human beings in the creation of images, videos, or any other material available on our APP and website.
          </p>

          <div className={styles.exemptionNotice}>
            <p>The federal Labeling and Record-Keeping Law is therefore not applicable.</p>
          </div>

          <div className={styles.contactInfo}>
            <p>
              If you have any question or require further clarification regarding 18 U.S.C. 2257 Exemption, please contact us at{}
              <a href="mailto:info@nexusbond.ai" className={styles.link}>info@nexusbond.ai</a> or directly report in the APP or website in the <Link href="/contact" className={styles.link}>contact</Link> section.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
