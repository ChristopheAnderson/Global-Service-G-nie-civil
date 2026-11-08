import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../../data/siteData';
import confetti from 'canvas-confetti';
import { X, Send, MessageSquare, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useModalScrollLock } from '../../hooks/useModalScrollLock';
import { BorderBeam } from '../ui/BorderBeam';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  lenis?: any;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Construction de Bâtiments',
  lenis,
}) => {
  useModalScrollLock(isOpen, lenis);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    projectType: initialService,
    location: 'Cotonou, Bénin',
    budget: '',
    message: '',
    consent: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, projectType: initialService }));
    }
  }, [initialService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D97706', '#F59E0B', '#10B981'],
      });
    }, 600);
  };

  const getWhatsAppUrl = () => {
    const text = `Bonjour Global Service,
Je transmets ma demande de devis express via votre site :
• Nom : ${formData.fullName}
• Téléphone : ${formData.phone}
• Prestation : ${formData.projectType}
• Ville : ${formData.location}
• Budget : ${formData.budget || 'À étudier'}
• Détails : ${formData.message}`;

    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          data-lenis-prevent="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            data-lenis-prevent="true"
            className="relative w-full max-w-2xl max-h-[88vh] bg-white border border-slate-200 rounded-2xl sm:rounded-3xl overflow-y-auto overscroll-contain p-5 sm:p-8 shadow-2xl z-10 custom-scrollbar text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <BorderBeam size={200} duration={8} colorFrom="#D97706" colorTo="#F59E0B" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-950 border border-slate-200 transition-colors shadow-sm"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-[11px] font-mono text-amber-800 uppercase tracking-wider mb-2 font-bold shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Devis Technique Gratuit</span>
              </div>
              <h3 className="text-2xl font-heading font-bold text-slate-900">
                Demander une Cotation / Étude Préliminaire
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Global Service Génie Civil · Gbégamè, Cotonou, Bénin
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-4 animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-heading font-bold text-slate-900">
                  Demande enregistrée avec succès !
                </h4>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Notre équipe d'ingénieurs prend en charge votre dossier. Vous serez recontacté dans les plus brefs délais.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Poursuivre sur WhatsApp</span>
                  </a>
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-950 border border-slate-200 text-xs font-semibold"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Nom et Prénom *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Ex: M. Jean-Marc Houndété"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:bg-white focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Téléphone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+229 97 00 00 00"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:bg-white focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Adresse E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="votre.email@domaine.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:bg-white focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Localisation du chantier au Bénin *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Ex: Cotonou, Calavi, Ouidah..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:bg-white focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Prestation demandée *
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-sm focus:outline-none focus:bg-white focus:border-amber-500 cursor-pointer"
                    >
                      <option value="Construction de Bâtiments">Construction de Bâtiments</option>
                      <option value="Génie Civil & Ouvrages d'Art">Génie Civil &amp; Ouvrages d'Art</option>
                      <option value="Travaux Publics & Voiries">Travaux Publics &amp; Voiries</option>
                      <option value="Études Techniques & Conception BIM">Études Techniques &amp; Conception BIM</option>
                      <option value="Suivi, Contrôle & Audit">Suivi, Contrôle &amp; Audit</option>
                      <option value="Rénovation & Réhabilitation">Rénovation &amp; Réhabilitation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Budget indicatif
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-sm focus:outline-none focus:bg-white focus:border-amber-500 cursor-pointer"
                    >
                      <option value="">Non déterminé</option>
                      <option value="< 20 Millions FCFA">&lt; 20 Millions FCFA</option>
                      <option value="20 à 50 Millions FCFA">20 à 50 Millions FCFA</option>
                      <option value="50 à 150 Millions FCFA">50 à 150 Millions FCFA</option>
                      <option value="> 150 Millions FCFA">&gt; 150 Millions FCFA</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Description du projet *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Surface approximative, nombre d'étages, spécificités du terrain..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:bg-white focus:border-amber-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                  >
                    {loading ? (
                      <span>Envoi en cours...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Transmettre mon dossier</span>
                      </>
                    )}
                  </button>

                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 transition-colors shadow-sm"
                    title="Envoyer directement sur WhatsApp"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </a>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
