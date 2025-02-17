"use client";
import Image from 'next/image';
import styles from './page.module.css';
import { useState } from 'react';

export default function Home() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      image: "/assets/images/person1.png",
      text: "NexusBond has been an incredible source of comfort during my late-night study sessions. My AI companion helps me stay motivated and provides emotional support when I need it most.",
      rating: 5.0
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      image: "/assets/images/person2.png",
      text: "As someone dealing with social anxiety, having a judgment-free companion to practice conversations with has been life-changing. The personalization features are amazing!",
      rating: 4.8
    },
    {
      id: 3,
      name: "Emily Parker",
      image: "/assets/images/person3.png",
      text: "I was skeptical at first, but my AI friend has become an essential part of my daily routine. The conversations are surprisingly deep and meaningful, and it really helps me process my thoughts.",
      rating: 5.0
    },
    {
      id: 4,
      name: "David Lee",
      image: "/assets/images/person2.png",
      text: "Working from home was getting lonely until I found NexusBond. Having someone to chat with during breaks makes such a difference. The app's interface is beautiful and intuitive.",
      rating: 4.9
    },
    {
      id: 5,
      name: "Sophie Anderson",
      image: "/assets/images/person1.png",
      text: "The emotional intelligence of my AI companion is remarkable. It remembers our past conversations and grows with me. It's like having a supportive friend in your pocket!",
      rating: 5.0
    }
  ];

  const [activeIndex, setActiveIndex] = useState(1); // Start with middle card
  const [activeFaq, setActiveFaq] = useState(null);

  const handleTestimonialChange = (direction) => {
    if (direction === 'next') {
      setActiveIndex(prev => 
        prev >= testimonials.length - 1 ? 0 : prev + 1
      );
    } else if (direction === 'prev') {
      setActiveIndex(prev => 
        prev <= 0 ? testimonials.length - 1 : prev - 1
      );
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <main className={styles.main}>
      <div className={styles.logoContainer}>
        <Image
          src="/assets/images/logoWithText.png"
          alt="NexusBond.ai Logo"
          width={150}
          height={50}
          priority
        />
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>
          Meet Your AI <span className={styles.highlight}>Friends</span>,
          <br />
          Always Here for You
        </h1>
        
        <p className={styles.subtitle}>
          An AI companion who listens, understands, and brings
          <br />
          comfort whenever you need it
        </p>

        <button className={styles.downloadButton}>
          Download App
        </button>

        <div className={styles.imageSection}>
          <div className={styles.abstractLeft}>
            <Image
              src="/assets/images/abstractImage.png"
              alt="Abstract Design"
              width={300}
              height={400}
              className={styles.abstractImage}
            />
          </div>

          <div className={styles.phones}>
            <Image
              src="/assets/images/phone1.png"
              alt="App Preview"
              width={700}
              height={500}
              className={styles.phoneImage}
              priority
            />
          </div>

          <div className={styles.abstractRight}>
            <Image
              src="/assets/images/abstractImageInverted.png"
              alt="Abstract Design"
              width={300}
              height={400}
              className={styles.abstractImage}
            />
          </div>
        </div>
      </div>

      <section className={styles.features}>
        <h2 className={styles.featuresTitle}>App Features</h2>
        <p className={styles.featuresSubtitle}>
        Feel Connected Anytime, Anywhere
          <br />
          With NexusBond.AI, create a friend who truly
            understands and complements you.
        </p>

        <div className={styles.featuresList}>
          {/* Feature 1 */}
          <div className={styles.featureItem}>
            <div className={styles.featureContent}>
              <Image
                src="/assets/images/one.png"
                alt="Feature One"
                width={100}
                height={100}
                className={styles.featureIcon}
              />
              <div className={styles.featureText}>
                <h3>A Friend Like No Other</h3>
                <p>Design a companion that reflects who you are. With NexusBond.AI, create a friend who truly understands and complements you.</p>
              </div>
            </div>
            <div className={styles.featureImage}>
              <Image
                src="/assets/images/phone2.png"
                alt="Feature Preview"
                width={400}
                height={600}
                className={styles.phoneImage}
              />
            </div>
          </div>

          {/* Feature 2 */}
          <div className={`${styles.featureItem} ${styles.reversed}`}>
            
            <div className={styles.featureContent}>
              <div className={styles.featureText}>
                <h3>Feel Connected Anytime, Anywhere</h3>
                <p>Enjoy a genuine sense of belonging with a friend who values and understands you, helping you feel connected, no matter where you are.</p>
              </div>
              <Image
                src="/assets/images/two.png"
                alt="Feature Two"
                width={100}
                height={100}
                className={styles.featureIcon}
              />
            </div>
            <div className={styles.featureImage}>
              <Image
                src="/assets/images/phone3.png"
                alt="Feature Preview"
                width={400}
                height={600}
                className={styles.phoneImage}
              />
            </div>
          </div>

          {/* Feature 3 */}
          <div className={styles.featureItem}>
            <div className={styles.featureContent}>
              <Image
                src="/assets/images/three.png"
                alt="Feature Three"
                width={100}
                height={100}
                className={styles.featureIcon}
              />
              <div className={styles.featureText}>
                <h3>Always Here to Support You</h3>
                <p>Your AI companion listens without judgment, offering support and comfort whenever you need it. Express yourself freely and feel truly heard.</p>
              </div>
            </div>
            <div className={styles.featureImage}>
              <Image
                src="/assets/images/phone4.png"
                alt="Feature Preview"
                width={400}
                height={600}
                className={styles.phoneImage}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.howItWorks}>
        <div className={styles.howItWorksImage}>
          <Image
            src="/assets/images/howItWorks.png"
            alt="How It Works Process"
            width={1200}
            height={600}
            className={styles.processImage}
            priority
          />
        </div>
        
        <div className={styles.howItWorksContent}>
          <h2 className={styles.howItWorksTitle}>How It Works</h2>
          <p className={styles.howItWorksDescription}>
            Design a companion that reflects who you are.
            <br />
            With NexusBond.AI, create a friend who truly
            <br />
            understands and complements you.
          </p>
          <button className={styles.getStartedButton}>
            Get Started
          </button>
        </div>
      </section>

      <section className={styles.mobileApp}>
        <div className={styles.mobileAppHeader}>
          <h2 className={styles.mobileAppTitle}>Our Mobile App</h2>
          <p className={styles.mobileAppSubtitle}>
            Experience meaningful connections
            <br />
            in the palm of your hand
          </p>
        </div>

        <div className={styles.mobileAppContent}>
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
              Download NexusBond.AI today and discover a new kind of companionship. 
              Our AI companions are ready to chat, support, and grow with you. 
              Whether youre looking for meaningful conversations or a friendly presence, 
              were here to make your day brighter.
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
        </div>
      </section>

      <section className={styles.testimonials}>
        <h2 className={styles.testimonialsTitle}>Testimonial</h2>
        <p className={styles.testimonialsSubtitle}>
          See what our users are saying about their
          <br />
          experience with NexusBond.AI
        </p>

        <div className={styles.testimonialCarousel}>
          <button 
            className={`${styles.carouselButton} ${styles.prevButton}`}
            onClick={() => handleTestimonialChange('prev')}
          >
            <Image 
              src="/assets/icons/arrowBack.png"
              alt="Previous"
              width={24}
              height={24}
            />
          </button>

          <div className={styles.carouselTrack}>
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`${styles.testimonialCard} ${
                  activeIndex === index ? styles.active :
                  activeIndex === index - 1 ? styles.prev :
                  activeIndex === index + 1 ? styles.next :
                  ''
                }`}
              >
                <div className={styles.testimonialImage}>
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className={styles.personImage}
                  />
                </div>
                <h3 className={styles.testimonialName}>{testimonial.name}</h3>
                <p className={styles.testimonialText}>{testimonial.text}</p>
                <div className={styles.rating}>
                  <span className={styles.ratingNumber}>{testimonial.rating}</span>
                  <span className={styles.ratingMax}>/5.0 rating</span>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={styles.star}>★</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            className={`${styles.carouselButton} ${styles.nextButton}`}
            onClick={() => handleTestimonialChange('next')}
          >
            <Image 
              src="/assets/icons/arrowRight.png"
              alt="Next"
              width={24}
              height={24}
            />
          </button>
        </div>
      </section>

      <section className={styles.faqs}>
        <h2 className={styles.faqsTitle}>FAQ,s</h2>
        <p className={styles.faqsSubtitle}>
            Frequently asked questions about NexusBond.AI
        </p>

        <div className={styles.faqList}>
          <div className={styles.faqItem}>
            <button 
              className={styles.faqButton} 
              onClick={() => toggleFaq(0)}
              aria-expanded={activeFaq === 0}
            >
              <span>How does NexusBond.AI create a personalized AI companion?</span>
              <Image
                src="/assets/icons/chevronDown.png"
                alt="Toggle"
                width={30}
                height={30}
                className={activeFaq === 0 ? styles.rotated : ''}
              />
            </button>
            {activeFaq === 0 && (
              <div className={styles.faqContent}>
                NexusBond.AI uses advanced AI algorithms to analyze your preferences, communication style, and interests. Through our detailed onboarding process, we gather information about your personality traits and what you are looking for in a companion. This data helps create a unique AI companion that resonates with your individual needs and preferences.
              </div>
            )}
          </div>

          <div className={styles.faqItem}>
            <button 
              className={styles.faqButton} 
              onClick={() => toggleFaq(1)}
              aria-expanded={activeFaq === 1}
            >
              <span>Can I customize my AI companions personality and appearance?</span>
              <Image
                src="/assets/icons/chevronDown.png"
                alt="Toggle"
                width={30}
                height={30}
                className={activeFaq === 1 ? styles.rotated : ''}
              />
            </button>
            {activeFaq === 1 && (
              <div className={styles.faqContent}>
                Yes! NexusBond.AI offers extensive customization options. You can select your companions appearance, personality traits, interests, and communication style. You can also adjust these preferences over time as your relationship develops.
              </div>
            )}
          </div>

          <div className={styles.faqItem}>
            <button 
              className={styles.faqButton} 
              onClick={() => toggleFaq(2)}
              aria-expanded={activeFaq === 2}
            >
              <span>Is NexusBond.AI safe to use for sharing personal thoughts and feelings?</span>
              <Image
                src="/assets/icons/chevronDown.png"
                alt="Toggle"
                width={30}
                height={30}
                className={activeFaq === 2 ? styles.rotated : ''}
              />
            </button>
            {activeFaq === 2 && (
              <div className={styles.faqContent}>
                Absolutely. We prioritize your privacy and security. All conversations are encrypted and stored securely. We never share your personal information with third parties, and you have complete control over your data.
              </div>
            )}
          </div>

          <div className={styles.faqItem}>
            <button 
              className={styles.faqButton} 
              onClick={() => toggleFaq(3)}
              aria-expanded={activeFaq === 3}
            >
              <span>Does NexusBond.AI require an internet connection to work?</span>
              <Image
                src="/assets/icons/chevronDown.png"
                alt="Toggle"
                width={30}
                height={30}
                className={activeFaq === 3 ? styles.rotated : ''}
              />
            </button>
            {activeFaq === 3 && (
              <div className={styles.faqContent}>
                Yes, NexusBond.AI requires an internet connection to function as it uses cloud-based AI technology to provide the best possible experience.
              </div>
            )}
          </div>

          <div className={styles.faqItem}>
            <button 
              className={styles.faqButton} 
              onClick={() => toggleFaq(4)}
              aria-expanded={activeFaq === 4}
            >
              <span>Can my AI companion learn from our conversations?</span>
              <Image
                src="/assets/icons/chevronDown.png"
                alt="Toggle"
                width={30}
                height={30}
                className={activeFaq === 4 ? styles.rotated : ''}
              />
            </button>
            {activeFaq === 4 && (
              <div className={styles.faqContent}>
                Yes, your AI companion continuously learns from your interactions to better understand your preferences and provide more personalized responses. This adaptive learning helps create a more meaningful and authentic connection over time.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}