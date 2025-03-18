import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Sparkles } from 'lucide-react';
import SectionBackground from '../common/SectionBackground';

const faqs = [
  {
    question: "Is my business the right fit for AI solutions?",
    answer: "If you want to streamline operations, enhance customer experiences, or stay ahead of the competition, then yes! At Two Steps, we craft AI solutions tailored specifically to your business's needs. Book a call, and let's explore how we can help you succeed.",
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    question: "How do I know which AI solution is right for my business?",
    answer: "You don't need to know—we'll guide you. Our free consultation is designed to uncover your needs and recommend the ideal solution for your business. Let's take that first step together.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    question: "What industries do you work with?",
    answer: "From retail to healthcare, real estate, and beyond, we deliver AI solutions tailored to diverse industries. If your business has processes, we can automate and optimize them—no matter your niche or focus.",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    question: "What makes your team different from other AI agencies?",
    answer: "We don't just build AI—we build relationships. Our team works closely with you to design solutions that align perfectly with your goals. Your success is our success, and we're with you every step of the way.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    question: "How do you ensure the AI solution will deliver results?",
    answer: "Our solutions are custom-made for your business, rigorously tested, and optimized for real-world results. You'll quickly see how they save time, reduce costs, and make your operations more efficient.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    question: "Can AI solutions work with the tools/software I already use?",
    answer: "Absolutely. Our custom AI solutions integrate seamlessly with your existing platforms, whether it's a CRM, email system, or other internal tools. We'll make sure everything works together effortlessly.",
    gradient: "from-purple-500 to-indigo-500"
  }
];

const MobileFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <SectionBackground
      className="py-16 px-4"
      gradient="from-blue-500/10 via-purple-500/10 to-blue-500/10"
    >
      <div id="faq" className="text-center mb-12">
        {/* Subtle label / tagline */}
        <div
          className="group inline-flex px-4 py-2 
          bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent
          rounded-full backdrop-blur-sm border border-blue-500/10
          shadow-[0_0_20px_rgba(59,130,246,0.1)]
          hover:border-blue-500/20 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]
          transition-all duration-300 mb-4"
        >
          <span className="text-blue-400 text-xs font-medium flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 animate-[pulse_2s_ease-in-out_infinite]" />
            FREQUENTLY ASKED QUESTIONS
          </span>
        </div>

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[1.75rem] xs:text-[2rem] sm:text-[2.25rem] font-bold mb-4 block"
        >
          <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            Got Questions?
          </span>
        </motion.span>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group touch-manipulation relative"
          >
            <motion.div
              className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
                openIndex === index
                  ? 'bg-gray-900/50 border-blue-500/50'
                  : 'bg-gray-900/30 border-gray-800/50'
              } border backdrop-blur-xl`}
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6"
                whileTap={{ scale: 0.995 }}
              >
                <div className="flex justify-between items-start gap-4">
                  <h3 className={`text-base font-medium transition-colors duration-300 bg-gradient-to-r ${faq.gradient} bg-clip-text ${
                    openIndex === index ? 'text-transparent' : 'text-gray-300'
                  }`}>
                    {faq.question}
                  </h3>
                  <div className={`mt-1 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}>
                    <Plus className={`w-4 h-4 ${
                      openIndex === index ? 'text-blue-400' : 'text-gray-400'
                    }`} />
                  </div>
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 text-gray-400 text-sm leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
            {/* Hover Glow Effect */}
            <div className={`absolute -inset-2 bg-gradient-to-r ${faq.gradient} 
              rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10`} />
          </motion.div>
        ))}
      </div>
    </SectionBackground>
  );
};

export default MobileFAQ;