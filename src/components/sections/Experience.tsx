import React from "react";
import { motion } from "framer-motion";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import { experiences } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { Header } from "../atoms/Header";
import { TExperience } from "../../types";
import { config } from "../../constants/config";

// Re-export experiences to fix the export issue
export { experiences };

interface ExperienceCardProps {
  experience: TExperience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => (
  <VerticalTimelineElement
    contentStyle={{
      background: "#1d1836",
      color: "#fff",
      borderBottom: "3px solid #915EFF",
      borderRadius: "0.5rem",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      padding: "1.5rem"
    }}
    contentArrowStyle={{ borderRight: "7px solid #232631" }}
    date={experience.date}
    dateClassName="text-white"
    iconStyle={{ background: experience.iconBg }}
    icon={
      <div className="flex justify-center items-center w-full h-full">
        <img
          src={experience.icon}
          alt={experience.companyName}
          className="w-[60%] h-[60%] object-contain"
        />
      </div>
    }
  >
    <div>
      <h3 className="text-2xl font-bold text-white">{experience.title}</h3>
      <p className="text-secondary text-base font-semibold">
        {experience.companyName}
      </p>
    </div>

    <ul className="mt-4 ml-5 space-y-2 list-disc">
      {experience.points.map((point: string, index: number) => (
        <li
          key={`experience-point-${index}`}
          className="text-white-100 text-sm pl-1 tracking-wider"
        >
          {point}
        </li>
      ))}
    </ul>
  </VerticalTimelineElement>
);

const Experience: React.FC = () => {
  return (
    <section className="relative z-0 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5 }}
      >
        <Header useMotion={true} {...config.sections.experience} />
      </motion.div>

      <div className="mt-12">
        <VerticalTimeline lineColor="#3d3a4e">
          {experiences.map((experience: TExperience, index: number) => (
            <ExperienceCard key={`experience-${index}`} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default SectionWrapper(Experience, "work");
