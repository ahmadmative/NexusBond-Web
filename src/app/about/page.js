'use client';
import Image from 'next/image';
import styles from './about.module.css';
import { useState } from 'react';

export default function About() {
  const [activeTab, setActiveTab] = useState('characters');

  const offerContent = {
    characters: {
      title: "Personalized AI Characters",
      description: "Create and customize AI companions that mirror your personality and preferences."
    },
    experiences: {
      title: "Unique Experiences",
      description: "Create multiple AI companions with different personalities and interests."
    },

  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            Welcome to <span className={styles.highlight}>NexusBond.AI</span>
          </h1>
          <p className={styles.subtitle}>
            The Future of Socializing - Where Connection Transcends Artificial!
          </p>
        </section>

        <section className={styles.introSection}>
          <div className={styles.introContent}>
            <div className={styles.textContent}>
              <h2>Introduction</h2>
              <p>
                NexusBond.AI is a revolutionary platform connecting people with 
                personalized AI companions. Using advanced AI technology, we 
                empower users to create characters that reflect their unique 
                personalities and interests. These AI companions offer more than 
                interaction—they provide meaningful connections.
              </p>
            </div>
            <div className={styles.imageContainer}>
              <Image
                src="/assets/images/about2.png"
                alt="Introduction"
                width={500}
                height={300}
                className={styles.introImage}
                priority
              />
            </div>
          </div>
        </section>

        <section className={styles.missionSection}>
          <div className={styles.missionContent}>
            <div className={styles.imageContainer}>
              <Image
                src="/assets/images/about1.png"
                alt="Visual Persona Interface"
                width={500}
                height={600}
                className={styles.missionImage}
                priority
              />
            </div>
            <div className={styles.textContent}>
              <h2>Our Mission and Philosophy</h2>
              <p>
                At NexusBond.AI, our mission is to enhance human connections 
                through AI, bridging gaps and creating new opportunities for 
                interaction. We envision a future where technology fosters 
                relationships rather than creating barriers.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.offerSection}>
          <h2 className={styles.offerTitle}>What We Offer?</h2>
          <div className={styles.tabsContainer}>
            {Object.entries(offerContent).map(([key, content]) => (
              <div key={key} className={styles.tabItem}>
                <button 
                  className={`${styles.tabButton} ${activeTab === key ? styles.active : ''}`}
                  onClick={() => setActiveTab(key)}
                >
                  <span>{content.title}</span>
                  <Image
                    src="/assets/icons/chevronDown.png"
                    alt="Toggle"
                    width={20}
                    height={20}
                    className={activeTab === key ? styles.rotated : ''}
                  />
                </button>
                {activeTab === key && (
                  <div className={styles.tabContent}>
                    <p>{content.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.mobileApp}>
          <div className={styles.mobileAppHeader}>
            <h2 className={styles.mobileAppTitle}>Our Mobile App</h2>
            <p className={styles.mobileAppSubtitle}>
              Experience NexusBond.AI on the go
              <br />
              Available for iOS and Android
            </p>
          </div>

          <div className={styles.mobileAppContent}>
          <div className={styles.mobileAppRight}>
              <div className={styles.phonesContainer}>
                <Image
                  src="/assets/images/phone1.png"
                  alt="Mobile App Preview"
                  width={700}
                  height={500}
                  className={styles.phonePreview}
                  priority
                />
              </div>
            </div>
            <div className={styles.mobileAppLeft}>
              <div className={styles.getStartedHeader}>
                <h3>Get Started with</h3>
                <Image
                  src="/assets/images/logoWithText2.png"
                  alt="NexusBond.AI Logo"
                  width={200}
                  height={50}
                  className={styles.logoImage}
                />
              </div>

              <p className={styles.getStartedDescription}>
                Take your AI companions wherever you go with our mobile app. 
                Stay connected, chat on the move, and never miss a moment 
                with your personalized AI characters. Our mobile app offers 
                the same powerful features as our web platform, optimized 
                for your smartphone.
              </p>

              <div className={styles.downloadOptions}>
                <div className={styles.storeButtons}>
                  <Image
                    src="/assets/images/google.png"
                    alt="Get it on Google Play"
                    width={180}
                    height={53}
                    className={styles.storeButton}
                  />
                  <Image
                    src="/assets/images/apple.png"
                    alt="Download on App Store"
                    width={180}
                    height={53}
                    className={styles.storeButton}
                  />
                </div>
                <Image
                  src="/assets/images/qr.png"
                  alt="QR Code"
                  width={100}
                  height={100}
                  className={styles.qrCode}
                />
              </div>
            </div>

           
          </div>
        </section>
      </main>
    </div>
  );
}