import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const faqData = [
  { question: "How do I track my order?", answer: "Once your order ships, you will receive a tracking number via email." },
  { question: "What is your return policy?", answer: "We offer a 30-day money-back guarantee on all unused products." },
  { question: "Do you ship internationally?", answer: "Yes, we ship to over 50 countries worldwide." }
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex justify-between w-full text-left font-semibold text-gray-900 hover:text-[#fe3448] transition-colors"
      >
        {question}
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
      </button>
      {isOpen && <p className="mt-2 text-sm text-[#757575] leading-relaxed">{answer}</p>}
    </div>
  );
};

const FAQ = () => (
  // The ID here is critical for the footer anchor link to work
  <section id="faq-section" className="max-w-3xl mx-auto py-16 px-4 scroll-mt-20">
    <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      {faqData.map((item, index) => <FAQItem key={index} {...item} />)}
    </div>
  </section>
);

export default FAQ;