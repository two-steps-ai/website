import { useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CaseStudy } from './types';
import { twMerge } from 'tailwind-merge';

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
  onSelect: (study: CaseStudy) => void;
}

// Pre-defined animation variants outside component
const cardAnimationVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

// Common class strings to avoid repetition
const GRADIENT_TEXT_CLASS = 'bg-gradient-to-r bg-clip-text text-transparent';
const CARD_WRAPPER_CLASS = 'relative overflow-hidden rounded-3xl bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300';

const CaseStudyCard = ({ study, index, onSelect }: CaseStudyCardProps) => {
  const {
    title,
    gradient,
    client,
    industry,
    deployedPlatform,
    description,
    icon: IconComponent,
    metrics,
    image,
  } = study;

  const handleSelect = useCallback(() => onSelect(study), [onSelect, study]);

  // Pre-calculate classes that combine gradient to avoid string concatenation in render
  const gradientTextClass = `${GRADIENT_TEXT_CLASS} ${gradient}`;
  const gradientBgClass = `bg-gradient-to-r ${gradient}`;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={cardAnimationVariants}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className={CARD_WRAPPER_CLASS}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          <div className="space-y-6">
            {/* Header section */}
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-xl p-[1px] shrink-0 ${gradientBgClass}`}>
                <div className="w-full h-full rounded-xl bg-gray-900 flex items-center justify-center">
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`text-2xl font-bold truncate ${gradientTextClass}`}>
                  {title}
                </h3>
                <div className="flex flex-wrap gap-x-4 text-gray-400 text-sm mt-0.5">
                  <p>Client: {client}</p>
                  <p>Industry: {industry}</p>
                  <p>Platform: {deployedPlatform}</p>
                </div>
              </div>
            </div>

            {/* Description and CTA section */}
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">{description}</p>
              <button
                onClick={handleSelect}
                className="flex items-center text-sm font-medium group/btn"
              >
                <span className={gradientTextClass}>
                  Learn More
                </span>
                <ArrowRight
                  className={twMerge(
                    'w-4 h-4 ml-1 opacity-0 group-hover/btn:opacity-100 transform -translate-x-2 group-hover/btn:translate-x-0 transition-all duration-300',
                    gradientTextClass
                  )}
                />
              </button>
            </div>

            {/* Metrics section */}
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(metrics).map(([key, value]) => (
                <div key={key} className="bg-gray-800/50 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-1">{key}</p>
                  <p className={`text-xl font-bold ${gradientTextClass}`}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image section */}
          <div className="relative h-[300px] lg:h-auto rounded-xl overflow-hidden">
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60" />
          </div>
        </div>
      </div>

      {/* Background glow effect - only visible on hover */}
      <div
        className={`absolute -inset-2 ${gradientBgClass} rounded-[2rem] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10`}
      />
    </motion.div>
  );
};

export default memo(CaseStudyCard);