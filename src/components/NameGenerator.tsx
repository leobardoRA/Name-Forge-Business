"use client";

import { useState, useEffect } from 'react';

const nameDatabase = {
  gaming: ["Zenith", "Vortex", "Kratos", "Nova", "Cipher", "Apex", "Rift", "Titan", "Spectre", "Fury"],
  tech: ["Nexus", "Synergy", "Quantum", "Byte", "Logic", "Delta", "Aura", "Matrix", "Cloud", "Flow"],
  branding: ["Lumina", "Verve", "Motto", "Kite", "Zest", "Bloom", "Origin", "Flux", "Zento", "Aura"]
};

export default function NameGenerator() {
  const [names, setNames] = useState<{val: string, rarity: number, platforms: {ig: boolean, tt: boolean}}[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [category, setCategory] = useState<keyof typeof nameDatabase>("gaming");
  const [loading, setLoading] = useState(false);
  
  // Estado para el buscador/visualizador
  const [customName, setCustomName] = useState("");

  // Cargar favoritos del almacenamiento local
  useEffect(() => {
    const saved = localStorage.getItem('fav-names');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Error al cargar favoritos");
      }
    }
  }, []);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      const db = nameDatabase[category];
      const newBatch = Array.from({ length: 6 }, () => ({
        val: db[Math.floor(Math.random() * db.length)] + (Math.floor(Math.random() * 99)),
        rarity: Math.floor(Math.random() * 100),
        platforms: {
          ig: Math.random() > 0.5,
          tt: Math.random() > 0.4
        }
      }));
      setNames(newBatch);
      setLoading(false);
    }, 600);
  };

  const toggleFavorite = (name: string) => {
    const updated = favorites.includes(name) 
      ? favorites.filter(f => f !== name) 
      : [...favorites, name];
    setFavorites(updated);
    localStorage.setItem('fav-names', JSON.stringify(updated));
  };

  // FUNCIÓN DEL OJO (👁️): Manda el nombre al buscador y sube la pantalla
  const previewName = (name: string) => {
    setCustomName(name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-10 selection:bg-blue-500/30">
      {/* Fondo decorativo */}
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.1),transparent_50%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter italic">
            Name <span className="text-blue-500">Forge</span>
          </h1>
          <p className="text-gray-400 font-medium italic">Identity Generator & Visualizer</p>
        </header>

        {/* VISUALIZADOR PRO (Buscador central) */}
        <section className="mb-12 bg-zinc-900/40 border border-white/5 p-6 md:p-10 rounded-[2.5rem] backdrop-blur-sm">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-4 block">Visualizer Pro</label>
            <input 
              type="text" 
              placeholder="Escribe un nombre o usa el 👁️ de abajo..." 
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 text-xl text-center text-white focus:border-blue-500 outline-none transition-all placeholder:text-zinc-700"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-900/20 to-black p-6 rounded-2xl border border-blue-500/20 flex flex-col items-center justify-center min-h-[120px]">
              <span className="text-[9px] font-bold text-blue-400 uppercase mb-3 tracking-widest">Esports Style</span>
              <span className="text-2xl font-black italic tracking-tighter uppercase text-white drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
                {customName || "READY"}
              </span>
            </div>

            <div className="bg-white p-6 rounded-2xl flex flex-col items-center justify-center min-h-[120px]">
              <span className="text-[9px] font-bold text-zinc-400 uppercase mb-3 tracking-widest">Luxury Brand</span>
              <span className="text-2xl font-light tracking-[0.2em] text-black uppercase">
                {customName || "NAME"}
              </span>
            </div>

            <div className="bg-zinc-800/30 border border-zinc-700 p-6 rounded-2xl flex flex-col items-center justify-center min-h-[120px]">
              <span className="text-[9px] font-bold text-zinc-500 uppercase mb-3 tracking-widest">Social Media</span>
              <span className="text-xl font-bold text-blue-400 lowercase">
                @{customName.replace(/\s+/g, '') || "user"}
              </span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Controles laterales */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl">
              <label className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-4 block">Categoría</label>
              <div className="grid grid-cols-1 gap-2">
                {(Object.keys(nameDatabase) as Array<keyof typeof nameDatabase>).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
                      category === cat ? 'bg-white text-black border-white' : 'bg-transparent text-gray-500 border-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full mt-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition-all disabled:opacity-50 active:scale-95 shadow-lg shadow-blue-600/20"
              >
                {loading ? "GENERANDO..." : "GENERAR NOMBRES"}
              </button>
            </div>

            {/* Banner Publicidad (Monetización) */}
            <div className="bg-zinc-900 border border-dashed border-zinc-800 p-8 rounded-2xl text-center">
              <span className="text-[9px] text-zinc-600 font-bold block mb-2 uppercase tracking-tighter italic">Espacio Publicitario</span>
              <div className="w-full h-20 bg-black/50 rounded flex items-center justify-center text-[10px] text-zinc-700">ANUNCIO AQUÍ</div>
            </div>
          </div>

          {/* Listado de Nombres Generados */}
          <div className="lg:col-span-3">
            {names.length === 0 ? (
              <div className="h-64 flex items-center justify-center border border-zinc-800 rounded-3xl bg-zinc-950 text-zinc-600 italic">
                Elige una categoría y forja tus nuevos nombres...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {names.map((item, i) => (
                  <div key={i} className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl hover:border-blue-500/50 transition-all group">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold tracking-tight text-white">{item.val}</span>
                      <div className="flex gap-2">
                        {/* EL BOTÓN DEL OJO 👁️ */}
                        <button 
                          onClick={() => previewName(item.val)}
                          className="bg-zinc-800 hover:bg-white hover:text-black p-2 rounded-lg transition-all duration-200 border border-zinc-700 shadow-sm"
                          title="Visualizar este nombre"
                        >
                          👁️
                        </button>
                        <button 
                          onClick={() => toggleFavorite(item.val)} 
                          className="text-xl p-1 hover:scale-110 transition-transform"
                        >
                          {favorites.includes(item.val) ? '💙' : '🤍'}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mb-4">
                      <span className={`text-[9px] font-black px-2 py-1 rounded ${item.platforms.ig ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                        IG: {item.platforms.ig ? 'LIBRE' : 'OCUPADO'}
                      </span>
                      <span className={`text-[9px] font-black px-2 py-1 rounded ${item.platforms.tt ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                        TT: {item.platforms.tt ? 'LIBRE' : 'OCUPADO'}
                      </span>
                    </div>

                    <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 transition-all duration-700 shadow-[0_0_8px_rgba(37,99,235,0.8)]" style={{ width: `${item.rarity}%` }} />
                    </div>
                    <div className="flex justify-between mt-3">
                      <span className="text-[9px] text-zinc-500 font-bold uppercase">Rareza: {item.rarity}%</span>
                      <button onClick={() => navigator.clipboard.writeText(item.val)} className="text-[9px] text-blue-500 font-black hover:text-white transition-colors uppercase tracking-widest">Copiar</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Widget de Favoritos */}
      {favorites.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-[200px] z-50">
          <p className="text-[10px] font-black uppercase text-zinc-500 mb-2 tracking-widest">Guardados ({favorites.length})</p>
          <div className="flex flex-wrap gap-1">
            {favorites.slice(-4).map((f, idx) => (
              <span key={idx} className="text-[10px] bg-blue-600 px-2 py-1 rounded font-bold uppercase truncate max-w-full">{f}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}