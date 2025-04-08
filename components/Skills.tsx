"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Skill {
  name: string;
  level: number;
  icon: string;
}

const skills: Skill[] = [
  { name: "JavaScript", level: 90, icon: "🚀" },
  { name: "React", level: 85, icon: "⚛️" },
  { name: "Next.js", level: 80, icon: "⏭️" },
  { name: "TypeScript", level: 75, icon: "📘" },
  { name: "Node.js", level: 70, icon: "🟢" },
  { name: "Tailwind CSS", level: 85, icon: "🎨" },
  { name: "Java", level: 85, icon: "☕" },
  { name: "Spring Boot", level: 80, icon: "🍃" },
  { name: "MongoDB", level: 75, icon: "🍃" },
  { name: "HTML", level: 95, icon: "📄" },
  { name: "CSS", level: 90, icon: "🎨" },
];

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      id="skills"
      className="py-24 bg-gradient-to-b from-gray-800 to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Technical Skills
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Here are some of the technologies and tools I work with on a daily
            basis.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="group bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </span>
                  <h3 className="text-2xl font-semibold text-white group-hover:text-indigo-400 transition-colors duration-300">
                    {skill.name}
                  </h3>
                </div>
                <span className="text-indigo-400 font-medium">
                  {skill.level}%
                </span>
              </div>
              <div className="h-3 bg-gray-700/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{
                    delay: index * 0.2,
                    duration: 1.5,
                    ease: "easeOut",
                  }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
