'use client';
import styles from './dmca.module.css';

export default function DMCAPolicy() {
  return (
    <div className={styles.policyContainer}>
      <div className={styles.policyContent}>
        <h1>DMCA Policy</h1>
        <h2>Digital Millennium Copyright Act (DMCA)</h2>
        <p className={styles.date}>Date of Revision: 12/10/2024</p>

        <div className={styles.introduction}>
          <p>
            NexusBond.AI values and upholds the intellectual property rights of others, and we are dedicated to adhering to the Digital Millennium Copyright Act (DMCA) and other relevant copyright laws. Our DMCA Policy delineates the steps we take to address notifications of copyright infringement and provides guidance on reaching out to us if you suspect that your copyrighted material has been utilized on our platform without proper authorization.
          </p>
        </div>

        <section className={styles.section}>
          <h3>1. Reporting Copyright Infringement</h3>
          <p>
            If you believe in good faith that materials transmitted or created through NexusBond.AI infringe your copyright, you (or your agent) may send us a notice requesting that we remove the material or block access to it. Please provide the following information in writing:
          </p>
          <ul>
            <li>
              a. An electronic or physical signature of the owner (or person authorized to act on behalf of the owner) of the copyrighted work;
            </li>
            <li>
              b. A description of the copyrighted work that you claim has been infringed upon and sufficient information for us to locate such copyrighted work;
            </li>
            <li>
              c. Your address, telephone number, and e-mail address;
            </li>
            <li>
              d. A statement by you that you have a good-faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law;
            </li>
            <li>
              e. A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h3>2. DMCA Notices Response</h3>
          <p>After receiving a complete infringement notice, we will take the following actions:</p>
          <ul>
            <li>
              a. Review and confirm that received documents meet DMCA requirements;
            </li>
            <li>
              b. Take proper preliminary actions against said alleged infringement within 1-3 days after receipt of said information, including without limitation link blockage;
            </li>
            <li>
              c. Notify the alleged infringer and demand him or her to explain and provide counter evidence.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h3>3. Counter Notification</h3>
          <p>
            If you believe in good faith that someone has wrongly filed a notice of copyright infringement against you, you may send us a counter-notice. If you do, we will notify the alleged claimant and hold the process for 10-14 days and then re-enable your content unless the copyright owner initiates a legal action against you before then.
          </p>
        </section>

        <section className={styles.section}>
          <h3>4. Contact Information</h3>
          <p>
            Notices and counter-notices should be sent to us via email at: <a href="mailto:info@NexusBond.AI">info@NexusBond.AI</a>. We are committed to addressing concerns in a timely manner and ensuring a positive experience for all our users.
          </p>
        </section>

        <section className={styles.section}>
          <h3>5. Termination</h3>
          <p>
            We have the right to suspend or terminate the use of the APP and the website by anyone engaged in suspected infringement described above.
          </p>
        </section>
      </div>
    </div>
  );
}
