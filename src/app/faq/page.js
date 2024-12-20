'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './faq.module.css';

export default function FAQ() {
  const [activeGeneral, setActiveGeneral] = useState(null);
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [activeAccount, setActiveAccount] = useState(null);
  const [activePeopleAsk, setActivePeopleAsk] = useState(null);

  const generalFaqs = [
    {
      question: "What kind of content does the service not support?",
      answer: (
        <>
          <p>We respect our users right to engage with fictionalized content. However, publicly we do not condone any of the following:</p>
          <ul>
            <li>Any form of child pornography</li>
            <li>Fictional characters should be able to be glanced at and assumed to be at least 18 years old.</li>
            <li>Genital exposure</li>
            <li>Exposed/prominent penises, vaginas, balls, anuses, pubic hair, and full frontal nudity are not permitted.</li>
            <li>Character images should not display a sex act or genitals in general. They should focus on the character itself, primarily their head and shoulders.</li>
            <li>Depictions of violence/harm towards AI.</li>
            <li>Real life images (Including real life figures such as celebrities, politicians, or those you may personally know.)</li>
          </ul>
          <p>If you come across any violations, please report them immediately to us. Our moderation team will address them promptly upon receiving the report.</p>
        </>
      )
    },
    {
      question: "Is there an iOS/Android App version?",
      answer: "Yes! NexusBond.AI mobile app is now available for download on IOS (NexusBond.AI App Store) & Android (NexusBond.AI App). Download it now!"
    },
    {
      question: "Are my account and chat private?",
      answer: "All chats and characters you create are private. You are responsible for ensuring the content you share meets our ToS. If you feel something approaching the lines of not passing our community standards, please stop and report it immediately."
    },
    {
      question: "I cant login. What should I do?",
      answer: "If you are unable to login due to an error code, please repeat the process after clearing your cache and ensuring that you are fully logged into the browser with your primary email. It is important to NEVER use a \"throwaway\" email, as we have no method of resetting your passwords! You are responsible for your own accounts security. Please be aware of the risks."
    },
    {
      question: "How can I appeal a character ban?",
      answer: "You may contact us via support at info@NexusBond.ai to receive assistance concerning the reasoning behind a characters termination. An appeal is not guaranteed, and prohibited/flagged content will not be restored."
    },
    {
      question: "Why cant I always see ads on the app?",
      answer: "Various factors, including geographic location, ad inventory, and network conditions, may prevent ads from displaying properly at certain times. We are working to improve the situation and appreciate your patience and support."
    },
    {
      question: "How can I change the language of character responses in chat?",
      answer: (
        <>
          <ul>
            <li>Change the language of the models replies in the chat settings.</li>
            <li>Send the character the language you want it to reply in, for example, Please reply to me in English.</li>
            <li>We are continuously striving to enable more models to speak more languages.</li>
          </ul>
        </>
      )
    }
  ];

  const subscriptionFaqs = [
    {
      question: "How do I cancel my subscription through the App Store?",
      answer: (
        <>
          <p>To cancel your subscription through the App Store, follow these steps:</p>
          <ol>
            <li>Open the Settings app on your iPhone or iPad.</li>
            <li>Tap on your Apple ID at the top of the screen.</li>
            <li>Select Subscriptions.</li>
            <li>Find and tap on the subscription you want to cancel.</li>
            <li>Tap Cancel Subscription and confirm your cancellation.</li>
          </ol>
        </>
      )
    },
    {
      question: "How do I cancel my subscription through Google Play?",
      answer: (
        <>
          <p>To cancel your subscription through Google Play, follow these steps:</p>
          <ol>
            <li>Open the Google Play Store app on your Android device.</li>
            <li>Tap on the menu icon (three horizontal lines) in the top-left corner.</li>
            <li>Select Subscriptions.</li>
            <li>Find and tap on the subscription you want to cancel.</li>
            <li>Tap Cancel Subscription and follow the instructions to confirm.</li>
          </ol>
        </>
      )
    },
    {
      question: "I used another method to subscribe. How do I cancel?",
      answer: "If you used a different method to subscribe, please use the Manage Subscription function to return to the website where you pay your bill. Like, Subscribestar, Paymentwall, etc. There, you will find options to manage and cancel your subscription."
    },
    {
      question: "Will I lose access immediately after canceling my subscription?",
      answer: "No, you will retain access to your subscription benefits until the end of the current billing cycle. After that, your subscription will not renew, and you will lose access to the benefits."
    },
    {
      question: "Can I get a refund after canceling my subscription?",
      answer: (
        <>
          <p>According to our subscription policy, your subscription can only be canceled for the next billing cycle. The current subscription period is non-refundable. Here are some specific reasons:</p>
          <ul>
            <li><strong>Service Usage:</strong> The subscription fee covers the services and content you enjoy during the current billing cycle. Even if you decide to cancel during this period, you can continue to use the service until the end of the cycle.</li>
            <li><strong>Advance Planning:</strong> Our subscription model is designed to provide uninterrupted service based on a prepaid plan. This allows us to maintain and improve the quality of the service you receive.</li>
            <li><strong>Terms of Service:</strong> When you subscribe, you agree to our terms of service, which state that the current billing period is non-refundable. This is to ensure fairness and consistency for all our subscribers.</li>
          </ul>
          <p><strong>Please Note:</strong></p>
          <ul>
            <li>Before subscribing, please carefully review the subscription plan to ensure it meets your needs.</li>
            <li>If you wish to cancel your subscription, it will take effect at the end of the current billing cycle, and you will not be charged for the next period.</li>
          </ul>
        </>
      )
    },
    {
      question: "What if I have problems canceling my subscription?",
      answer: "If you encounter any issues canceling your subscription, please contact our customer support team for assistance. Provide your subscription details and the method you used to subscribe, and our team will help resolve the issue."
    },
    {
      question: "Are there different types of memberships available?",
      answer: (
        <>
          <p>Yes, we offer four types of memberships:</p>
          <ul>
            <li>Standard Membership: Access to basic features.</li>
            <li>Premium Membership: Includes all standard features plus additional premium features.</li>
            <li>Deluxe Membership: Includes all the benefits of premium membership along with exclusive deluxe features.</li>
          </ul>
        </>
      )
    },
    {
      question: "Can I upgrade my membership later?",
      answer: "Yes, you can upgrade your membership at any time."
    }
  ];

  const accountFaqs = [
    {
      question: "How to delete my account?",
      answer: (
        <>
          <p><strong>Please note! Once deleted, the account cannot be recovered.</strong></p>
          <p>Go to your profile page, click the Settings button, and then select the Delete Account option.</p>
        </>
      )
    },
    {
      question: "Why cant I delete my account?",
      answer: (
        <>
          <p><strong>Please note! Once deleted, the account cannot be recovered.</strong></p>
          <p>If you still wish to proceed with deletion, please check the following:</p>
          <ul>
            <li>Ensure you do not have an active subscription, as accounts with active subscriptions cannot be deleted.</li>
            <li>Verify that your internet connection is stable, as network issues can also prevent account deletion.</li>
          </ul>
          <p>If you have checked both and still cant delete the account, please contact our support team at{ }
            <a href="mailto:info@NexusBond.ai" className={styles.link}>info@NexusBond.ai</a>
          </p>
        </>
      )
    },
    {
      question: "How can I recover my deleted account?",
      answer: "Account deletion is irreversible."
    }
  ];

  const peopleAlsoAskFaqs = [
    {
      question: "What is an NSFW AI Chatbot?",
      answer: "An NSFW AI chatbot is a sophisticated artificial intelligence designed to engage users in conversations on topics that are typically deemed not safe for work. These chatbots are pre-programmed to navigate mature themes, ensuring an engaging experience for users aged 18 and over."
    },
    {
      question: "Are NSFW AI Chatbots Safe to Use?",
      answer: "Yes, we implement robust security measures to ensure user privacy and data protection. However, users should always use discretion and follow platform guidelines to maintain safety."
    },
    {
      question: "Can I Customize My NSFW AI Chatbot Experience?",
      answer: "Absolutely. NexusBond.AI offers extensive customization options, allowing users to tailor the appearance, personality, and conversational style of their AI companions."
    },
    {
      question: "How Do NSFW AI Chatbots Learn?",
      answer: "NSFW Character AI chatbots for chat learn through machine-learning algorithms and natural-language processing. They observe how users interact with each other and alter their responses based on the nature of the conversation to have more natural and entertaining conversations."
    },
    {
      question: "What payment methods are currently available?",
      answer: "Currently you can purchase a subscription via Credit Card, Apple Pay, and Google Pay."
    },
    {
      question: "How does NexusBond.AI work?",
      answer: "The product is based on neural language models. A supercomputer reads huge amounts of text and learns to hallucinate what words might come next in any given situation."
    },
    {
      question: "Why is Character.AI asking about my birthday?",
      answer: "We ask for this information because we require users to be over a minimum age to engage with Characters and help meet our legal obligations. While we will not display your age or birthday publicly, we may also use this information for the purposes stated in our Privacy Policy, including to personalize your experience, help keep our Services safe, learn more about how our Services are used, and improve our Services."
    },
    {
      question: "What is the companys stance on NSFW Filters?",
      answer: "NexusBond.AI does not and will not support the use of the software for vulgar, obscene or pornographic content (per FAQ, ToS). We are not encouraging discussion of NSFW filters - our stance is final, and requesting them to be removed on any of our platforms will result in a ban."
    },
    {
      question: "What about NSFW?",
      answer: "NSFW (not safe for work) content is a large umbrella, and we are constantly evaluating the boundaries of what we support. Pornographic content is against our terms of service, and will not be supported at any point in the future. We are working on supporting a broader range of Characters (e.g., villain Characters should not always be calm and polite)."
    },
    {
      question: "Why do Characters forget things?",
      answer: "There is a limited amount of conversation context that the character can consider, so it will appear to forget things if they were not mentioned recently."
    },
    {
      question: "The Character started communicating as if it were a real person behind the keyboard. Are people spectating these chats?",
      answer: "No! Characters are good at pretending to be real - that means imitating how humans talk. You are still talking to the Character."
    },
    {
      question: "Are Characters and conversations private?",
      answer: "The chats with your character are private."
    },
    {
      question: "Can character creators see my conversations?",
      answer: "No! Creators can never see the conversations that you have with their Characters."
    },
    {
      question: "How can I make characters that are not overly polite?",
      answer: "We are working on supporting a broader range of Characters (e.g., villain Characters should not always be calm and polite)."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take your privacy seriously. Your data is encrypted and stored securely to ensure your conversations are confidential."
    },
    {
      question: "Can I switch between different AI characters during a chat session?",
      answer: "Currently, you can access one AI character per session. If youd like to chat with a different character, you can start a new session with them."
    },
    {
      question: "Are the AI characters always available?",
      answer: "Yes, our AI characters are available around the clock, so you can engage in a conversation whenever you like, day or night."
    },
    {
      question: "What languages do the AI characters support?",
      answer: "Our AI characters support a wide range of languages. You can specify your preferred language during the chat to ensure effective communication."
    },
    {
      question: "Is there a free trial available?",
      answer: "There is an unpaid membership but limited in chat capability."
    },
    {
      question: "Can I provide feedback on the AI characters performance?",
      answer: "We welcome your feedback to continually improve our AI characters. You can provide feedback directly on info@NexusBond.ai"
    },
    {
      question: "Are there age restrictions for using the AI chat assistant?",
      answer: "Yes, the AI chat assistant is intended for adult users and may not be suitable for individuals under a certain age. Please refer to our terms of service for more details."
    }
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>FAQ,s</h1>
      <p className={styles.description}>
        This is an evolving list of questions were asked about the product. If you have a question that is not listed, please send us an email to{ }
        <a href="mailto:info@NexusBond.ai" className={styles.link}>info@NexusBond.ai</a>
      </p>

      <section className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>General FAQ</h2>
        <div className={styles.faqList}>
          {generalFaqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <button 
                className={styles.faqButton} 
                onClick={() => setActiveGeneral(activeGeneral === index ? null : index)}
                aria-expanded={activeGeneral === index}
              >
                <span>{faq.question}</span>
                <Image
                  src="/assets/icons/chevronDown.png"
                  alt="Toggle"
                  width={30}
                  height={30}
                  className={activeGeneral === index ? styles.rotated : styles.chevron}
                />
              </button>
              {activeGeneral === index && (
                <div className={styles.faqContent}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>Subscription FAQ</h2>
        <div className={styles.faqList}>
          {subscriptionFaqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <button 
                className={styles.faqButton} 
                onClick={() => setActiveSubscription(activeSubscription === index ? null : index)}
                aria-expanded={activeSubscription === index}
              >
                <span>{faq.question}</span>
                <Image
                  src="/assets/icons/chevronDown.png"
                  alt="Toggle"
                  width={30}
                  height={30}
                  className={activeSubscription === index ? styles.rotated : styles.chevron}
                />
              </button>
              {activeSubscription === index && (
                <div className={styles.faqContent}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>Account FAQ</h2>
        <div className={styles.faqList}>
          {accountFaqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <button 
                className={styles.faqButton} 
                onClick={() => setActiveAccount(activeAccount === index ? null : index)}
                aria-expanded={activeAccount === index}
              >
                <span>{faq.question}</span>
                <Image
                  src="/assets/icons/chevronDown.png"
                  alt="Toggle"
                  width={30}
                  height={30}
                  className={activeAccount === index ? styles.rotated : styles.chevron}
                />
              </button>
              {activeAccount === index && (
                <div className={styles.faqContent}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>People Also Ask</h2>
        <div className={styles.faqList}>
          {peopleAlsoAskFaqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <button 
                className={styles.faqButton} 
                onClick={() => setActivePeopleAsk(activePeopleAsk === index ? null : index)}
                aria-expanded={activePeopleAsk === index}
              >
                <span>{faq.question}</span>
                <Image
                  src="/assets/icons/chevronDown.png"
                  alt="Toggle"
                  width={30}
                  height={30}
                  className={activePeopleAsk === index ? styles.rotated : styles.chevron}
                />
              </button>
              {activePeopleAsk === index && (
                <div className={styles.faqContent}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}