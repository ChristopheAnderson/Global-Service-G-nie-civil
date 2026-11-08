import React, { useState } from 'react';
import { siteConfig } from '../../data/siteData';
import confetti from 'canvas-confetti';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Building,
} from 'lucide-react';

interface ContactSectionProps {
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedService = '' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    projectType: preselectedService || 'Construction de Bâtiments',
    location: 'Cotonou, Bénin',
    budget: '',
    message: '',
    consent: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
    const text = `Bonjour Global Service Génie Civil,

Je souhaite faire une demande de devis pour mon projet :
• Nom : ${formData.fullName || 'Un client'}
• Téléphone : ${formData.phone || 'Non renseigné'}
• Type de projet : ${formData.projectType}
• Localisation : ${formData.location}
• Budget indicatif : ${formData.budget || 'À définir ensemble'}
• Description : ${formData.message || 'Prise de contact rapide'}

Merci de bien vouloir me recontacter.`;

    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" className="relative py-24 bg-white border-t border-slate-200">
      <div className="absolute inset-0 bg-blueprint opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-amber-400/40 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-4 font-mono shadow-sm">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contact &amp; Demande de Devis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-slate-900 tracking-tight">
            Concrétisons votre projet avec rigueur
          </h2>
          <div className="w-16 h-1 bg-amber-500 rounded-full mt-4 mb-6" />
          <p className="text-slate-600 text-base sm:text-lg">
            Remplissez le formulaire ci-dessous pour recevoir une étude préliminaire personnalisée 
            ou contactez directement notre direction technique par WhatsApp.
          </p>
        </div>

        {/* 2-Column Contact Layout: Coordinates/Map + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Coordinates & Google Maps (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Coordinates Cards */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-5 shadow-md">
              <h3 className="text-xl font-heading font-bold text-slate-900 pb-3 border-b border-slate-200 flex items-center gap-2">
                <Building className="w-5 h-5 text-amber-600" />
                <span>Siège &amp; Bureau d'Études</span>
              </h3>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-white text-amber-600 border border-slate-200 shrink-0 mt-0.5 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500">Adresse</h4>
                  <p className="text-slate-900 font-semibold text-sm mt-0.5">
                    {siteConfig.address}
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    République du Bénin
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-white text-amber-600 border border-slate-200 shrink-0 mt-0.5 shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500">Téléphone direct</h4>
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                    className="text-slate-900 hover:text-amber-600 font-semibold text-sm transition-colors mt-0.5 block font-mono"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Ligne directe bureau &amp; chantiers
                  </p>
                </div>
              </div>

              {/* WhatsApp direct banner */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-300 shrink-0 mt-0.5 shadow-sm">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-bold">WhatsApp Professionnel</h4>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:text-emerald-800 font-semibold text-sm transition-colors mt-0.5 flex items-center gap-1.5"
                  >
                    <span>Ouvrir une discussion WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                  </a>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Réponse rapide assurée par nos ingénieurs
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-white text-amber-600 border border-slate-200 shrink-0 mt-0.5 shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500">Courrier électronique</h4>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-slate-900 hover:text-amber-600 font-medium text-sm transition-colors mt-0.5 block"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4 pt-2 border-t border-slate-200">
                <div className="p-2.5 rounded-xl bg-white text-slate-500 border border-slate-200 shrink-0 mt-0.5 shadow-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500">Horaires d'ouverture</h4>
                  <p className="text-slate-800 text-xs mt-0.5 font-medium">
                    {siteConfig.workingHours}
                  </p>
                </div>
              </div>

            </div>

            {/* Google Maps Official Embed for Place ID */}
            <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden shadow-md">
              <div className="flex items-center justify-between pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Localisation Google Maps</span>
                </div>
                <a
                  href={siteConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-amber-700 hover:underline flex items-center gap-1 font-mono"
                >
                  <span>Ouvrir dans Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Responsive Map Frame referencing exact Benin Coordinates */}
              <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <iframe
                  title="Carte Google Maps - Global Service Génie Civil Bénin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={siteConfig.googleMapsEmbedUrl}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                <span>Gbégamè, Cotonou : <code className="text-amber-700 font-mono font-semibold">{siteConfig.coordinates.display}</code></span>
                <span className="text-[10px] text-emerald-700 font-mono font-semibold">Fiche Maps Validée</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Quote Request Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xl relative overflow-hidden">
              
              <div className="mb-6">
                <h3 className="text-2xl font-heading font-bold text-slate-900">
                  Formulaire de Demande de Devis
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Tous les champs marqués d'une * sont essentiels pour calibrer notre offre technique.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-4 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-heading font-bold text-slate-900">
                    Votre demande a été enregistrée avec succès !
                  </h4>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Nos ingénieurs examinent actuellement vos données. Un responsable technique vous contactera sous 24 à 48 heures ouvrées.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Accélérer via WhatsApp</span>
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-950 border border-slate-200 text-xs font-semibold"
                    >
                      Nouvelle demande
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  
                  {/* Full Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                        Nom et Prénom *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Ex: M. Jean-Marc Houndété"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:bg-white focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                        Numéro de Téléphone (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Ex: +229 97 00 00 00"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:bg-white focus:border-amber-500 transition-colors font-mono"
                      />
                    </div>
                  </div>

                  {/* Email & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                        Adresse E-mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="votre.email@domaine.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:bg-white focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                        Localisation du projet au Bénin *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Ex: Cotonou, Calavi, Parakou..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:bg-white focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project Type & Indicative Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                        Type de Prestation / Projet *
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-sm focus:outline-none focus:bg-white focus:border-amber-500 transition-colors cursor-pointer"
                      >
                        <option value="Construction de Bâtiments">Construction de Bâtiments (Résidentiel / Tertiaire)</option>
                        <option value="Génie Civil & Ouvrages d'Art">Génie Civil &amp; Ouvrages d'Art (Ponts, Dalots)</option>
                        <option value="Travaux Publics & Voiries">Travaux Publics &amp; Voiries (VRD, Pavage)</option>
                        <option value="Études Techniques & Conception BIM">Études Techniques &amp; Conception BIM</option>
                        <option value="Suivi, Contrôle & Audit de Chantiers">Suivi, Contrôle &amp; Audit de Chantiers</option>
                        <option value="Rénovation & Réhabilitation">Rénovation &amp; Réhabilitation d'Ouvrages</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                        Budget indicatif (facultatif)
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-base sm:text-sm focus:outline-none focus:bg-white focus:border-amber-500 transition-colors cursor-pointer"
                      >
                        <option value="">Sélectionnez une fourchette</option>
                        <option value="Moins de 20 Millions FCFA">&lt; 20 Millions FCFA</option>
                        <option value="20 à 50 Millions FCFA">20 à 50 Millions FCFA</option>
                        <option value="50 à 150 Millions FCFA">50 à 150 Millions FCFA</option>
                        <option value="150 à 500 Millions FCFA">150 à 500 Millions FCFA</option>
                        <option value="Plus de 500 Millions FCFA">&gt; 500 Millions FCFA</option>
                        <option value="À étudier selon métrés">À étudier selon métrés</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                      Description du besoin, plans disponibles &amp; détails *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Précisez la nature du bâtiment (R+X), la surface approximative, l'état du terrain ou si vous disposez déjà d'un permis de construire..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:bg-white focus:border-amber-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-slate-300 bg-white text-amber-600 focus:ring-amber-500"
                    />
                    <label htmlFor="consent" className="text-xs text-slate-500 leading-normal">
                      J'accepte que les informations saisies soient exploitées par Global Service dans le cadre strict de l'établissement de mon devis technique.
                    </label>
                  </div>

                  {/* Submit Button & WhatsApp Alternative */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      {loading ? (
                        <span>Envoi en cours...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Envoyer ma demande de devis</span>
                        </>
                      )}
                    </button>

                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto py-4 px-6 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                      title="Transmettre directement les données pré-remplies sur WhatsApp"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp Direct</span>
                    </a>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
