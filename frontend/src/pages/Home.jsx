import { Play, ArrowRight, Music2, Users, Radio, ThumbsUp } from "lucide-react";

function Home() {
  return (
    <section className="text-center flex flex-col items-center justify-center h-full  my-4 gap-6">
      <h1 className="font-bold text-transparent text-5xl md:text-7xl lg:text-8xl bg-clip-text bg-linear-to-br from-white to-white/50 tracking-tight">
        SYNC PLAYLIST
      </h1>

      <p className="text-gray-300 max-w-xl font- text-center text-md lg:text-lg md:text-lg text-wrap">
        Escucha junto a tus amigos sin importar la distancia. Crea salas
        privadas, comparte tus playlists favoritas y vive la música en perfecta
        sincronía.
      </p>
      <div className="flex gap-4 max-w-xl justify-between">
        <button className="inline-flex items-center justify-center gap-2 bg-[#0D9488] font-medium text-white/90 hover:bg-[#0F766E] px-4 py-2 rounded-lg transition-all duration-300">
          <Play className="h-4 w-4 shrink-0" />
          Comenzar ahora
        </button>
        <button className="inline-flex items-center justify-center gap-2 bg-transparent px-4 py-2 rounded-lg border border-gray-500 text-gray-300 hover:border-gray-300 hover:text-white hover:bg-white/5 font-medium transition-all duration-300">
          Saber más
          <ArrowRight className="h-4 w-4 shrink-0" />
        </button>
      </div>
      <section className="mt-8 lg:mt-16 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-6xl">
        <article className="group relative overflow-hidden border border-white/10 backdrop-blur-md bg-linear-to-br from-white/10 to-white/5 text-left p-6 rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(20,184,166,0.15)] hover:border-teal-500/40">
          <div className="absolute inset-0 bg-linear-to-br from-teal-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-teal-500/30 to-teal-600/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-teal-500/10">
              <Users className="h-7 w-7 text-teal-400 group-hover:text-teal-300 transition-colors"/>
            </div>
            <h2 className="text-white font-bold text-xl mb-3 group-hover:text-teal-50 transition-colors">Salas privadas</h2>
            <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
              Invita a tus amigos a una sala privada donde todos pueden agregar y votar por canciones.
            </p>
          </div>
        </article>
        <article className="group relative overflow-hidden border border-white/10 backdrop-blur-md bg-linear-to-br from-white/10 to-white/5 text-left p-6 rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(20,184,166,0.15)] hover:border-teal-500/40">
          <div className="absolute inset-0 bg-linear-to-br from-teal-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-teal-500/30 to-teal-600/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-teal-500/10">
              <Music2 className="h-7 w-7 text-teal-400 group-hover:text-teal-300 transition-colors"/>
            </div>
            <h2 className="text-white font-bold text-xl mb-3 group-hover:text-teal-50 transition-colors">Playlists compartidas</h2>
            <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
              Crea y comparte playlists colaborativas con tu grupo de amigos en tiempo real.
            </p>
          </div>
        </article>
        <article className="group relative overflow-hidden border border-white/10 backdrop-blur-md bg-linear-to-br from-white/10 to-white/5 text-left p-6 rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(20,184,166,0.15)] hover:border-teal-500/40">
          <div className="absolute inset-0 bg-linear-to-br from-teal-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-teal-500/30 to-teal-600/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-teal-500/10">
              <Radio className="h-7 w-7 text-teal-400 group-hover:text-teal-300 transition-colors"/>
            </div>
            <h2 className="text-white font-bold text-xl mb-3 group-hover:text-teal-50 transition-colors">Sincronización perfecta</h2>
            <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
              Escucha la misma canción al mismo tiempo, sin importar dónde estén.
            </p>
          </div>
        </article>
        <article className="group relative overflow-hidden border border-white/10 backdrop-blur-md bg-linear-to-br from-white/10 to-white/5 text-left p-6 rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(20,184,166,0.15)] hover:border-teal-500/40">
          <div className="absolute inset-0 bg-linear-to-br from-teal-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-teal-500/30 to-teal-600/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-teal-500/10">
              <ThumbsUp className="h-7 w-7 text-teal-400 group-hover:text-teal-300 transition-colors"/>
            </div>
            <h2 className="text-white font-bold text-xl mb-3 group-hover:text-teal-50 transition-colors">Vota tus favoritas</h2>
            <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
              Vota por las canciones que quieres escuchar y decide el orden de la playlist.
            </p>
          </div>
        </article>
      </section>
    </section>
  );
}

export default Home;
