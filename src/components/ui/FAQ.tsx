'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimationFlag } from '@/config/animations';
import { siteConfig } from '@/config/siteConfig';

const faqs = [
  {
    question: '🔒 Is my poop photo data private and secure?',
    answer: 'Absolutely! Your photos are end-to-end encrypted with bank-level security. We never share your data with third parties. Photos are analyzed by AI on your device and immediately deleted from our servers. Your privacy is our top priority - we\'re HIPAA compliant.',
  },
  {
    question: '💎 How do the Poop Monster NFTs work?',
    answer: 'Every time you log a health entry, you have a chance to discover a new Poop Monster NFT! There are 7 unique types ranging from Common to Legendary, plus rare Zombie variants. Collect them all, trade with friends, or keep them as proof of your health journey. They\'re yours to own forever!',
  },
  {
    question: '📅 When will the app launch?',
    answer: 'We\'re launching our Beta in 7 days! Beta users get 50% off lifetime membership, 3 free Legendary Monsters, and early access to all features. Join the waitlist now to secure your spot - we only have 247 spots remaining!',
  },
  {
    question: '📱 Will it work on my phone?',
    answer: 'Yes! Phoop works on both iOS (iPhone) and Android devices. We\'re building native apps for the best experience. You\'ll get notified when the app is ready for download.',
  },
  {
    question: '💰 How much does it cost?',
    answer: 'Beta users get FREE access for 90 days, then it\'s just $4.99/month. Founding members (first 1000 users) get 50% off for LIFE - that\'s only $2.49/month forever! Plus, earn XP to redeem real products at 30-50% off.',
  },
  {
    question: '🎁 What rewards can I actually get?',
    answer: 'Use your earned XP to redeem real health products: premium probiotics, gut health test kits, supplements, organic foods, and more - all at 30-50% off retail prices. We partner with leading health brands to bring you actual value, not just points!',
  },
];

export function FAQ() {
  if (!siteConfig.features.showFAQ) return null;

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const enableAnimations = useAnimationFlag('sectionTransitions');

  return (
    <section id="faq" className="py-20 bg-[#a8bba3]/10 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={enableAnimations ? { opacity: 0, y: 30 } : undefined}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-4xl font-bold mb-4">
            <span className="text-[#6d3e0f] font-bold">Questions?</span> We've Got Answers
          </h2>
          <p className="font-body text-white/70 text-lg">
            Everything you need to know about Phoop before joining
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={enableAnimations ? { opacity: 0, y: 20 } : undefined}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={enableAnimations ? { delay: index * 0.1 } : undefined}
              className="card cursor-pointer hover:shadow-xl transition-all duration-300"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg font-bold text-white pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl text-[#ffa239] flex-shrink-0"
                >
                  {openIndex === index ? '−' : '+'}
                </motion.div>
              </div>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="font-body text-white/80 mt-4 pt-4 border-t border-white/10 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial={enableAnimations ? { opacity: 0, y: 20 } : undefined}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 p-6 bg-[#ffa239]/10 border-2 border-[#ffa239]/30 rounded-xl"
        >
          <p className="font-body text-white/80 dark:text-black mb-3">
            Still have questions? We'd love to hear from you!
          </p>
          <a
            href="mailto:hello@phoop.fit"
            className="text-[#ffa239] dark:text-black font-bold hover:text-[#ff8c1a] dark:hover:text-gray-800 transition-colors"
          >
            📧 hello@phoop.fit
          </a>
        </motion.div>
      </div>
    </section>
  );
}
