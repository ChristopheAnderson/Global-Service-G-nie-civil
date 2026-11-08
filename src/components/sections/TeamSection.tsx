import React from 'react';
import { motion } from 'framer-motion';
import { teamData } from '../../data/siteData';
import { Users, Award } from 'lucide-react';

export const TeamSection: React.FC = () => {
  return (
    <section id="equipe" className="relative py-24 bg-white border-t border-slate-200 overflow-hidden">
      <div className="absolute inset-0 bg-blueprint opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-amber-400/40 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-4 font-mono shadow-sm"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Capital Humain &amp; Savoir-Faire</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            Des ingénieurs et techniciens d'élite
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-amber-500 rounded-full mt-4 mb-6"
          />
          <p className="text-slate-600 text-base sm:text-lg">
            La force de Global Service repose sur une synergie entre ingénieurs calculs, 
            conducteurs de travaux expérimentés et techniciens de terrain formés aux standards internationaux.
          </p>

          <div className="mt-3 text-xs text-slate-500 font-mono">
            * Profils directeurs et pôles de compétences techniques de notre organisation.
          </div>
        </motion.div>

        {/* Team Grid with Staggered Motion and Clean Separation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamData.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              className="group rounded-3xl bg-white border border-slate-200/90 hover:border-amber-400 transition-colors duration-300 overflow-hidden shadow-sm hover:shadow-xl flex flex-col justify-between backdrop-blur-md"
            >
              {/* Member Photo - 100% UNCLUTTERED, NO TEXT OVERLAY */}
              <div className="relative h-72 w-full overflow-hidden bg-slate-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle top pill only for experience */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[10px] text-amber-700 font-mono font-bold shadow-sm">
                  {member.experience.split(' ')[0]} {member.experience.split(' ')[1]} exp.
                </div>
              </div>

              {/* Member Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-heading font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-amber-700 tracking-wide mt-0.5 mb-2.5 font-mono">
                    {member.role}
                  </p>

                  <div className="inline-block px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-[11px] text-slate-700 font-medium mb-3">
                    {member.specialty}
                  </div>
                  
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                  <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Diplômé en Génie Civil</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Supervision Banner with Motion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center max-w-2xl mx-auto p-6 rounded-2xl bg-slate-50 border border-slate-200"
        >
          <p className="text-xs sm:text-sm text-slate-600">
            Nos équipes permanentes sont appuyées par un réseau d'experts géotechniciens, de géomètres-experts assermentés et de bureaux de contrôle partenaires agréés au Bénin.
          </p>
        </motion.div>

      </div>
    </section>
  );
};
