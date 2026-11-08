import React from 'react';
import { Logo } from '../brand/Logo';
import { siteConfig, servicesData } from '../../data/siteData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowUpRight, 
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-slate-950 border-t border-white/[0.08] pt-16 pb-12 overflow-hidden text-slate-400 text-xs">
      <div className="absolute inset-0 bg-blueprint opacity-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="horizontal" size="md" />
            
            <p className="text-slate-400 text-sm leading-relaxed mt-4">
              Entreprise de Bâtiment et Travaux Publics (BTP) et de Génie Civil au Bénin. 
              Excellence architecturale, conformité géotechnique et sécurité sans compromis.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Agrément technique &amp; conformité CCTP</span>
            </div>

            {/* Benin Flag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/[0.08] text-[11px] text-white">
              <span className="flex items-center overflow-hidden rounded-sm w-4 h-3">
                <span className="w-1.5 h-full bg-[#008751]" />
                <span className="flex-1 h-full flex flex-col">
                  <span className="flex-1 bg-[#FCD116]" />
                  <span className="flex-1 bg-[#E8112D]" />
                </span>
              </span>
              <span className="font-semibold">Entreprise béninoise de référence</span>
            </div>
          </div>

          {/* Quick Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#accueil" className="hover:text-amber-400 transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#a-propos" className="hover:text-amber-400 transition-colors">
                  À Propos
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Nos Expertises
                </a>
              </li>
              <li>
                <a href="#simulateur" className="hover:text-amber-400 transition-colors">
                  Simulateur Budget
                </a>
              </li>
              <li>
                <a href="#realisations" className="hover:text-amber-400 transition-colors">
                  Réalisations
                </a>
              </li>
              <li>
                <a href="#engagements" className="hover:text-amber-400 transition-colors">
                  Engagements &amp; HSE
                </a>
              </li>
              <li>
                <a href="#equipe" className="hover:text-amber-400 transition-colors">
                  Nos Équipes
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors">
                  Contact &amp; Devis
                </a>
              </li>
            </ul>
          </div>

          {/* Services Catalog (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Prestations BTP
            </h4>
            <ul className="space-y-2">
              {servicesData.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="hover:text-amber-400 transition-colors flex items-center justify-between group">
                    <span>{s.title}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coordinates & Google Maps (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Coordonnées
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors font-mono">
                  {siteConfig.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{siteConfig.workingHours}</span>
              </div>

              <div className="pt-2">
                <a
                  href={siteConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 border border-white/[0.08] font-semibold transition-colors text-[11px] font-mono"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Google Maps · Gbégamè ({siteConfig.coordinates.lat}, {siteConfig.coordinates.lng})</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} GLOBAL SERVICE – GÉNIE CIVIL. Tous droits réservés.</p>
          <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono">
            <span>Mentions Légales</span>
            <span>•</span>
            <span>Politique de Confidentialité</span>
            <span>•</span>
            <span>Normes Eurocodes &amp; BAEL Bénin</span>
          </div>
        </div>

      </div>
    </footer>
  );
};


