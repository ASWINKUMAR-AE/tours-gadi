import React from 'react';

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "What makes TourGadi the best tour package and cab app in Madurai?",
      answer: "TourGadi stands out by connecting you directly with certified local operators and drivers. This eliminates third-party markups, giving you transparent upfront pricing, customisable tourist packages, and reliable rides across Madurai."
    },
    {
      question: "How does TourGadi ensure safety for riders and tourists?",
      answer: "Safety is our topmost priority. All TourGadi drivers and operators go through a multi-step verification process, including licensing, RC book checks, Aadhar, and PAN verification. Additionally, every trip has live GPS tracking enabled."
    },
    {
      question: "Are there any hidden costs when booking a tour package?",
      answer: "No, TourGadi works on a 100% transparent pricing model. The fare shown in your app is the exact price you pay. There are no hidden subscription charges or booking commissions added post-ride."
    },
    {
      question: "What is the commission model for TourGadi drivers?",
      answer: "We offer a driver-first earning model. Drivers pay only a flat commission per ride, with no monthly platform fees or hidden deductions. Earnings are processed weekly and can be tracked in real-time within the driver app."
    }
  ];

  return (
    <section className="faq-section py-5 my-5" id="faqs" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
      <div className="container">
        <div className="text-center mb-5" data-aos="fade-up">
          <h2 className="display-6 fw-bold mb-3">Frequently Asked Questions</h2>
          <p className="lead text-muted">Everything you need to know about booking rides, driver earnings, and customized tour packages.</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="accordion accordion-flush shadow-sm rounded-4 overflow-hidden border" id="faqAccordion" data-aos="fade-up" data-aos-delay="100">
              {faqs.map((faq, index) => (
                <div className="accordion-item border-bottom" key={index}>
                  <h3 className="accordion-header" id={`heading-${index}`}>
                    <button 
                      className="accordion-button collapsed fw-bold py-4 text-dark dark:text-light" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target={`#collapse-${index}`} 
                      aria-expanded="false" 
                      aria-controls={`collapse-${index}`}
                      style={{ fontSize: '1.1rem' }}
                    >
                      {faq.question}
                    </button>
                  </h3>
                  <div 
                    id={`collapse-${index}`} 
                    className="accordion-collapse collapse" 
                    aria-labelledby={`heading-${index}`} 
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body py-4 text-muted" style={{ lineHeight: '1.7', fontSize: '1rem' }}>
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
