import { useState } from "react";

const DAYS = [
  {
    num: 1, date: "Mer 30/04", title: "Jura & Gorges", subtitle: "Bienne + Areuse",
    color: "#2196F3", icon: "🌊", km: "550 km", budget: "~220€",
    stops: [
      { time: "06:00", name: "Départ Beaufays", emoji: "🚗", lat: 50.585, lng: 5.655,
        desc: "Autoroute E25 → Luxembourg → Bâle. Acheter la vignette suisse à la frontière !",
        tip: "Café thermos + croissants. Plein d'essence avant la frontière.", price: null },
      { time: "10:30", name: "Gorges du Taubenloch", emoji: "🌊", lat: 47.1637, lng: 7.2591,
        desc: "Canyon de 3 km aux portes de Bienne. Balade facile 45 min. Les seules gorges en Europe collées à une ville !",
        tip: "Parking limité à Boujean. Accès bus depuis gare de Bienne.", price: "GRATUIT",
        link: "https://taubenloch.ch", duration: "45 min" },
      { time: "12:00", name: "Déjeuner à Bienne", emoji: "🍽️", lat: 47.1368, lng: 7.2467,
        desc: "Vieille ville bilingue. Berceau de Swatch et Omega.", tip: null, price: null },
      { time: "13:30", name: "Gorges de l'Areuse", emoji: "🌊", lat: 46.9505, lng: 6.7470,
        desc: "Rando star ! 8,5 km, 2h30-3h. Ponts de pierre, cascades, passerelles suspendues. Tronçon Champ-du-Moulin → Boudry = le plus spectaculaire.",
        tip: "ASTUCE : Garer à Boudry, train → Noiraigue (15 min), redescendre à pied. Pause au Restaurant de la Truite !",
        price: "GRATUIT", link: "https://gorgesdelareuse.ch", duration: "2h30-3h" },
      { time: "17:30", name: "Airbnb Val-de-Travers", emoji: "🏠", lat: 46.9465, lng: 6.6326,
        desc: "Noiraigue, Couvet ou Travers. Le berceau de l'absinthe — dégustation possible en distillerie !",
        tip: "⚠️ COURSES ce soir au Coop/Migros ! Le 1er mai est férié.", price: "~80-100€" },
    ]
  },
  {
    num: 2, date: "Jeu 01/05", title: "Canyon + Souterrain", subtitle: "Creux du Van + Lac St-Léonard",
    color: "#4CAF50", icon: "🪨", km: "160 km", budget: "~200€",
    stops: [
      { time: "08:00", name: "Creux du Van", emoji: "🪨", lat: 46.9361, lng: 6.7205,
        desc: "Le Grand Canyon suisse ! Amphithéâtre de 160m de falaises sur 1,4 km. Panorama 360° sur les Alpes. Bouquetins au bord le matin !",
        tip: "VERSION RANDO : Sentier des 14 contours depuis Noiraigue (12,9 km, 5h, 798m D+). VERSION RELAX : Voiture au parking du Soliat (5 min à pied du bord).",
        price: "GRATUIT", link: "https://www.creuxduvan.com", duration: "3-5h" },
      { time: "14:30", name: "Lac Souterrain St-Léonard", emoji: "🚣", lat: 46.2563, lng: 7.4255,
        desc: "Plus grand lac souterrain navigable d'Europe ! 300m de long, barque avec guide, eau cristalline, 15°C constant. Nouvel éclairage immersif.",
        tip: "Réservation OBLIGATOIRE en ligne ! Créneau de 14h recommandé. 1h45 de route depuis Val-de-Travers.",
        price: "16 CHF/pers", link: "https://lac-souterrain.com", duration: "30 min" },
      { time: "16:30", name: "Martigny — Nuit", emoji: "🏠", lat: 46.1027, lng: 7.0736,
        desc: "Amphithéâtre romain, Fondation Gianadda. Dîner : raclette ou fondue obligatoire, vous êtes au cœur du Valais !",
        tip: null, price: "Airbnb ~80-120€" },
    ]
  },
  {
    num: 3, date: "Ven 02/05", title: "Valais Sauvage", subtitle: "Durnand + Randa",
    color: "#FF5722", icon: "🏔️", km: "130 km", budget: "~160€",
    stops: [
      { time: "09:00", name: "Gorges du Durnand", emoji: "💧", lat: 46.0697, lng: 7.0713,
        desc: "Top 10 des plus belles gorges d'Europe ! 330 marches, 14 cascades. Avec la fonte des neiges de mai = puissance maximale !",
        tip: "10 min de Martigny. Déjeuner au Café-Restaurant des Gorges (planchette valaisanne).",
        price: "9 CHF/pers", link: "https://gorgesdudurnand.ch", duration: "1h" },
      { time: "13:00", name: "Passerelle Charles Kuonen", emoji: "🌉", lat: 46.0996, lng: 7.8000,
        desc: "Plus longue passerelle suspendue des Alpes ! 494m de long, 65cm de large, 85m au-dessus du vide. Face au Weisshorn (4 506m).",
        tip: "⚠️ Vérifier europaweg.ch avant ! Rando 4-5h depuis Randa (700m D+). Plan B : Gorges du Trient (Vernayaz).",
        price: "GRATUIT", link: "https://www.europaweg.ch", duration: "4-5h" },
      { time: "18:30", name: "Nuit — Visp ou Randa", emoji: "🚗", lat: 46.2931, lng: 7.8812,
        desc: "Spot voiture à Randa (parking gare, calme) ou Airbnb à Visp (~70-90€).",
        tip: "Nuit en voiture à Randa = endormissement sous les étoiles alpines.", price: null },
    ]
  },
  {
    num: 4, date: "Sam 03/05", title: "Aareschlucht + Retour", subtitle: "Dernière merveille",
    color: "#9C27B0", icon: "🌊", km: "550 km", budget: "~170€",
    stops: [
      { time: "08:00", name: "Route vers Meiringen", emoji: "🚗", lat: 46.7272, lng: 8.1892,
        desc: "Visp → Spiez → Interlaken → Meiringen (~2h). Trajet le long du lac de Thoune = magnifique.",
        tip: null, price: null },
      { time: "10:30", name: "Gorges de l'Aar", emoji: "🌊", lat: 46.7192, lng: 8.2122,
        desc: "Dernière claque ! Canyon de 200m de profondeur, eau turquoise, passage à 1m de large entre les parois. 40 min de balade.",
        tip: "Fun fact : Meiringen = berceau de la meringue. Chutes de Reichenbach juste à côté (mort de Sherlock Holmes) !",
        price: "9 CHF/pers", link: "https://aareschlucht.ch", duration: "40 min" },
      { time: "12:30", name: "Retour Beaufays", emoji: "🏠", lat: 50.585, lng: 5.655,
        desc: "Meiringen → Brünig → Lucerne → Bâle → Luxembourg → Beaufays. Arrivée ~18h.",
        tip: "Alternative plus rapide : via Berne (autoroute directe).", price: null },
    ]
  }
];

const CHECKLIST = [
  "Vignette suisse (e-vignette.ch)",
  "Airbnb Val-de-Travers (30/04)",
  "Airbnb Martigny (01/05)",
  "Résa Lac Souterrain (~14h le 01/05)",
  "Google Maps offline (carte Suisse)",
  "Vérifier europaweg.ch (Randa)",
  "Chaussures de randonnée",
  "Veste imperméable + polaire",
  "Couverture/sac couchage (nuit voiture)",
  "Chargeur voiture + batterie externe",
  "Cash CHF + carte CEAM + ID",
  "Gourdes 1L × 2",
];

function WazeBtn({ lat, lng, name }) {
  return (
    <a href={`https://waze.com/ul?ll=${lat},${lng}&navigate=yes&z=14`} 
       target="_blank" rel="noopener noreferrer"
       onClick={(e) => e.stopPropagation()}
       className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all duration-200 active:scale-95 no-underline"
       style={{ background: '#33ccff', color: '#000', textDecoration: 'none' }}>
      <span>📍</span> Ouvrir Waze
    </a>
  );
}

function GMapsBtn({ lat, lng }) {
  return (
    <a href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`}
       target="_blank" rel="noopener noreferrer"
       onClick={(e) => e.stopPropagation()}
       className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all duration-200 active:scale-95 no-underline"
       style={{ background: '#34A853', color: '#fff', textDecoration: 'none' }}>
      <span>🗺️</span> Google Maps
    </a>
  );
}

function AppleMapsBtn({ lat, lng }) {
  return (
    <a href={`https://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`}
       target="_blank" rel="noopener noreferrer"
       onClick={(e) => e.stopPropagation()}
       className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all duration-200 active:scale-95 no-underline"
       style={{ background: '#555', color: '#fff', textDecoration: 'none' }}>
      <span>🍎</span> Apple Maps
    </a>
  );
}

function StopCard({ stop, dayColor }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="relative pl-8 pb-6 group">
      {/* Timeline dot + line */}
      <div className="absolute left-0 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] z-10"
           style={{ borderColor: dayColor, background: '#1a1a2e' }}>
        <span>{stop.emoji}</span>
      </div>
      <div className="absolute left-[9px] top-6 bottom-0 w-0.5 opacity-20" style={{ background: dayColor }}/>
      
      {/* Card */}
      <div className="rounded-xl p-4 cursor-pointer transition-all duration-300"
           style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
           onClick={() => setExpanded(!expanded)}>
        
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                    style={{ color: dayColor, background: `${dayColor}20` }}>
                {stop.time}
              </span>
              {stop.duration && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/50">
                  ⏱ {stop.duration}
                </span>
              )}
              {stop.price && (
                <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold"
                      style={{ background: stop.price === "GRATUIT" ? '#22c55e20' : '#f59e0b20',
                               color: stop.price === "GRATUIT" ? '#22c55e' : '#f59e0b' }}>
                  {stop.price}
                </span>
              )}
            </div>
            <h3 className="text-white font-bold mt-1.5 text-sm leading-tight">{stop.name}</h3>
          </div>
          <svg className={`w-4 h-4 text-white/30 transition-transform duration-300 flex-shrink-0 mt-1 ${expanded ? 'rotate-180' : ''}`}
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
          </svg>
        </div>

        {/* Content */}
        <p className="text-white/60 text-xs mt-2 leading-relaxed">{stop.desc}</p>

        {/* Expanded content */}
        {expanded && (
          <div className="mt-3 space-y-2 animate-in">
            {stop.tip && (
              <div className="flex gap-2 p-2.5 rounded-lg" style={{ background: `${dayColor}10` }}>
                <span className="text-xs">💡</span>
                <p className="text-[11px] leading-relaxed" style={{ color: `${dayColor}dd` }}>{stop.tip}</p>
              </div>
            )}
            {stop.link && (
              <a href={stop.link} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300">
                🔗 {stop.link}
              </a>
            )}
            {/* Navigation buttons */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <WazeBtn lat={stop.lat} lng={stop.lng} name={stop.name}/>
              <GMapsBtn lat={stop.lat} lng={stop.lng}/>
              <AppleMapsBtn lat={stop.lat} lng={stop.lng}/>
            </div>
          </div>
        )}

        {/* Quick nav buttons (always visible) */}
        {!expanded && (
          <div className="flex items-center gap-2 mt-2.5 flex-wrap">
            <WazeBtn lat={stop.lat} lng={stop.lng} name={stop.name}/>
            <GMapsBtn lat={stop.lat} lng={stop.lng}/>
            <AppleMapsBtn lat={stop.lat} lng={stop.lng}/>
          </div>
        )}
      </div>
    </div>
  );
}

function DaySummary({ day }) {
  return (
    <div className="flex gap-3 mt-2 mb-4">
      <div className="flex-1 rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div className="text-lg font-bold text-white">{day.km}</div>
        <div className="text-[10px] text-white/40 uppercase tracking-wider">Route</div>
      </div>
      <div className="flex-1 rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div className="text-lg font-bold" style={{ color: day.color }}>{day.budget}</div>
        <div className="text-[10px] text-white/40 uppercase tracking-wider">Budget</div>
      </div>
      <div className="flex-1 rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div className="text-lg font-bold text-white">{day.stops.length}</div>
        <div className="text-[10px] text-white/40 uppercase tracking-wider">Stops</div>
      </div>
    </div>
  );
}

export default function RoadTripGuide() {
  const [activeDay, setActiveDay] = useState(0);
  const [showChecklist, setShowChecklist] = useState(false);
  const [checked, setChecked] = useState({});

  const toggleCheck = (i) => setChecked(prev => ({...prev, [i]: !prev[i]}));

  const day = DAYS[activeDay];

  return (
    <div className="min-h-screen text-white" style={{ background: '#0d1117', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .animate-in { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        * { -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Header */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 50%, #264653 100%)' }}>
        {/* Mountain silhouette */}
        <svg className="absolute bottom-0 w-full" viewBox="0 0 400 60" preserveAspectRatio="none" style={{ height: '40px' }}>
          <path d="M0,60 L0,35 L40,25 L80,40 L120,20 L160,35 L200,15 L240,30 L280,22 L320,38 L360,18 L400,30 L400,60 Z"
                fill="#0d1117" opacity="1"/>
        </svg>
        
        <div className="px-5 pt-6 pb-14 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇨🇭</span>
                <h1 className="text-xl font-extrabold tracking-tight">Road Trip Suisse</h1>
              </div>
              <p className="text-white/50 text-xs mt-0.5 tracking-widest uppercase">Gorges & Passerelles</p>
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold text-white/70">30 avr — 3 mai</div>
              <div className="text-[10px] text-white/40">1 400 km • 7 spots</div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-2 mt-4">
            {[
              { v: "7", l: "Merveilles", c: "#D4A373" },
              { v: "4j", l: "Durée", c: "#81B29A" },
              { v: "~800€", l: "Budget", c: "#E07A5F" },
            ].map((s, i) => (
              <div key={i} className="flex-1 rounded-lg p-2 text-center" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <div className="text-sm font-bold" style={{ color: s.c }}>{s.v}</div>
                <div className="text-[9px] text-white/40 uppercase">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Day tabs */}
      <div className="flex gap-1.5 px-4 py-3 overflow-x-auto" style={{ background: '#0d1117' }}>
        {DAYS.map((d, i) => (
          <button key={i}
            onClick={() => { setActiveDay(i); setShowChecklist(false); }}
            className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${activeDay === i && !showChecklist ? 'scale-105' : 'opacity-60'}`}
            style={{
              background: activeDay === i && !showChecklist ? d.color : 'rgba(255,255,255,0.05)',
              color: activeDay === i && !showChecklist ? '#fff' : 'rgba(255,255,255,0.6)',
              border: `1px solid ${activeDay === i && !showChecklist ? d.color : 'transparent'}`
            }}>
            <span className="text-base mr-1">{d.icon}</span> J{d.num}
          </button>
        ))}
        <button onClick={() => setShowChecklist(true)}
          className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${showChecklist ? 'scale-105 opacity-100' : 'opacity-60'}`}
          style={{
            background: showChecklist ? '#D4A373' : 'rgba(255,255,255,0.05)',
            color: showChecklist ? '#000' : 'rgba(255,255,255,0.6)',
          }}>
          📋 Check
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-8">
        {showChecklist ? (
          <div className="animate-in">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              📋 Checklist avant le départ
            </h2>
            <div className="space-y-2">
              {CHECKLIST.map((item, i) => (
                <button key={i} onClick={() => toggleCheck(i)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200"
                  style={{ background: checked[i] ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.04)',
                           border: `1px solid ${checked[i] ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.06)'}` }}>
                  <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-xs transition-all ${checked[i] ? 'bg-green-500' : 'border border-white/20'}`}>
                    {checked[i] && "✓"}
                  </div>
                  <span className={`text-sm ${checked[i] ? 'text-white/40 line-through' : 'text-white/80'}`}>{item}</span>
                </button>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-xl text-center text-xs" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <span className="text-white/40">{Object.values(checked).filter(Boolean).length}/{CHECKLIST.length} complétés</span>
            </div>

            {/* Links section */}
            <h2 className="text-lg font-bold mt-6 mb-3 flex items-center gap-2">🔗 Liens utiles</h2>
            {[
              { name: "Vignette suisse", url: "https://www.e-vignette.ch", emoji: "🏷️" },
              { name: "Lac Souterrain — Réservation", url: "https://lac-souterrain.com", emoji: "🚣" },
              { name: "Passerelle Randa — Statut", url: "https://www.europaweg.ch", emoji: "🌉" },
              { name: "Gorges du Durnand", url: "https://gorgesdudurnand.ch", emoji: "💧" },
              { name: "Gorges de l'Aar", url: "https://aareschlucht.ch", emoji: "🌊" },
              { name: "Météo Suisse", url: "https://www.meteosuisse.admin.ch", emoji: "🌤️" },
              { name: "CFF (trains)", url: "https://www.sbb.ch/fr", emoji: "🚂" },
            ].map((l, i) => (
              <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-3 p-3 rounded-xl mb-2 transition-all"
                 style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="text-lg">{l.emoji}</span>
                <div className="flex-1">
                  <div className="text-sm text-white/80 font-medium">{l.name}</div>
                  <div className="text-[10px] text-blue-400">{l.url}</div>
                </div>
                <svg className="w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            ))}
          </div>
        ) : (
          <div className="animate-in">
            {/* Day header */}
            <div className="rounded-2xl p-4 mb-4 relative overflow-hidden"
                 style={{ background: `linear-gradient(135deg, ${day.color}30, ${day.color}10)`,
                          border: `1px solid ${day.color}30` }}>
              <div className="relative z-10">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{day.icon}</span>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: day.color }}>
                      Jour {day.num} — {day.date}
                    </div>
                    <h2 className="text-lg font-extrabold text-white">{day.title}</h2>
                    <p className="text-xs text-white/50">{day.subtitle}</p>
                  </div>
                </div>
              </div>
              {/* Decorative circle */}
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10" style={{ background: day.color }}/>
            </div>

            <DaySummary day={day}/>

            {/* Stops */}
            {day.stops.map((stop, i) => (
              <StopCard key={i} stop={stop} dayColor={day.color}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
