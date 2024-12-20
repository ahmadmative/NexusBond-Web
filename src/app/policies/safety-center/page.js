"use client";
import Link from "next/link";
import styles from "./safety.module.css";

export default function SafetyCenter() {
  return (
    <div className={styles.policyContainer}>
      <div className={styles.policyContent}>
        <h1>Safety Center</h1>
        <p className={styles.date}>Revision Date: 12/11/2024</p>

        <div className={styles.introduction}>
          <p>
            At NexusBond.AI, we take safety seriously. The first step in building a safe product is knowing what you stand for. At NexusBond.AI, we believe in providing a positive experience that enriches our users" lives while avoiding negative impacts for users and the broader Community.
          </p>
          <p>
            We recognize that these technologies are quickly evolving and can raise safety questions. We take that very seriously. We will continue to evolve our policies with our technology:
          </p>
          <ul>
            <li>We"ll carefully design our policies to promote safety, avoid harm, and prioritize the well-being of our community.</li>
            <li>We"ll align our product development to those policies, and prioritize safety as our products evolve.</li>
          </ul>
          <p>
            Those commitments are easy to articulate and harder to put to practice. The field of AI safety is still very new, and we won"t always get it right: Sometimes our policies won"t be correctly calibrated. And sometimes the technological protections we build won"t work as intended, or will be works in progress. We are committed to creating an ongoing cycle of review and improvement, being transparent when we fail, and are constantly striving to improve the safety and reliability of our products.
          </p>
        </div>

        <section className={styles.section}>
          <h2>Our Policies</h2>
          
          <div className={styles.subsection}>
            <h3>User Content</h3>
            <p>
              We believe in providing a safe, high-quality experience on our platform, and that commitment also extends to user content. Our Terms of Service contain best-in-class content rules. They provide that we do not allow content that:
            </p>
            <ul>
              <li>Is threatening, abusive, harassing, tortious, bullying, or excessively violent;</li>
              <li>Is defamatory, libelous, or verifiably false with the purpose of harming others;</li>
              <li>Constitutes hate speech that demeans or promotes discrimination or violence on the basis of protected categories;</li>
              <li>Is obscene or pornographic;</li>
              <li>Constitutes sexual harassment;</li>
              <li>Constitutes sexual exploitation or abuse of a minor;</li>
              <li>Glorifies self-harm;</li>
              <li>Promotes terrorism or violent extremism;</li>
              <li>Furthers or promotes criminal activity;</li>
              <li>Seeks to buy or sell illegal drugs;</li>
              <li>Infringes Third-Party IP;</li>
              <li>Constitutes a "deepfake" or impersonation of any kind.</li>
            </ul>
          </div>

          <div className={styles.subsection}>
            <h3>AI-Generated Content</h3>
            <p>
              Our approach to AI-Generated content flows from a simple principle: Our product should never produce responses that are likely to harm users or others. That means working to ensure, among other things, that Characters do not suggest violence, dangerous or illegal conduct, or incite hatred; that they protect users" private information; and that Characters do not create or echo harmful misinformation. And more generally, it means seeking to train and fine-tune our model such that our Characters will follow the same content standards we apply to our users.
            </p>
            <p>
              It is worth explicitly calling out that parts of this commitment are aspirational. No AI is currently perfect at preventing this sort of content, especially when a user intentionally tries to get the AI to produce it. However, we are committed to a journey of continued improvement, with this approach to AI-Generated content as our guidepost.
            </p>
          </div>

          <div className={styles.subsection}>
            <h3>Privacy</h3>
            <p>
              NexusBond.AI is committed to protecting user privacy and to complying with privacy laws worldwide. We have already implemented a number of key privacy measures that we regularly update and add to. We describe our privacy approach below.
            </p>
            <p>
              We give users control over their data. At the heart of online privacy is a simple rule: make sure users are in control. We put that principle to practice by ensuring you always have easy-to-use tools to access your data, delete your data, and delete your account.
            </p>
            <p>
              We don"t sell user data, or share it for anything other than basic analytics. To date, we share data only with standard Internet analytics providers – the companies that help apps and websites understand their traffic. If that ever changes, we"ll be very clear about it and get our users consent upfront.
            </p>
            <p>
              We"re careful with the information our users share. Our users interact with Characters as they do with friends, and so they sometimes share details about their lives. To make sure they can do so safely, we are committed to taking exceptional care of that data. We design our features to ensure that users always have easy-to-understand notice before they make any post viewable by others.
            </p>
            <p>
              Please see our <Link href="/policies/privacy" className={styles.link}>Privacy Policy</Link> for more details.
            </p>
          </div>

          <div className={styles.subsection}>
            <h3>Content Moderation</h3>
            <p>
              <strong>Automated Tools.</strong> We use proprietary tools to block violating content before it can ever be posted. Like other solutions in this space, these tools aren"t perfect. But they"re evolving quickly and we will continue to improve them over time.
            </p>
            <p>
              <strong>Reporting.</strong> We give our users a host of tools so they can report content – whether from a Character or a user – that they believe violates our Terms. Our website also contains our contact information to serve as a reporting option so users can reach us to report improper content.
            </p>
            <p>
              <strong>Moderation.</strong> We are committed to promptly taking appropriate action on flagged and reported content. We take action by warning users, deleting content, suspending users, and banning users as warranted.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
