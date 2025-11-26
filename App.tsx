import React, { useState } from 'react';
import { 
  Music, Calendar, MapPin, Users, Speaker, 
  Clock, CheckCircle2, Sparkles, 
  Printer, ArrowRight, ArrowLeft, Edit2
} from 'lucide-react';
import { EventData, INITIAL_DATA } from './types';
import { SectionTitle, Label, Input, Select, TextArea, CheckboxGroup, Toggle } from './components/InputSection';

function App() {
  const [data, setData] = useState<EventData>(INITIAL_DATA);
  const [currentStep, setCurrentStep] = useState(1);
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  const updateField = (field: keyof EventData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const formations = ["Voz e Violão", "Duo", "Trio", "Banda Completa"];
  const musicMoments = ["Cerimônia", "Recepção/Jantar", "Festa"];
  const showDurations = ["1h30min", "2h", "2h30min", "Dois Blocos"];
  const interactionLevels = ["Normal", "Alta Interação"];
  const volumes = ["Padrão", "Alto", "Baixo"];
  const interactiveTypes = ["Cantar junto", "Dançar com a banda", "Falar no show"];

  const steps = [
    { id: 1, title: "Dados Gerais" },
    { id: 2, title: "Estrutura" },
    { id: 3, title: "Vibe & Estilo" },
    { id: 4, title: "Finalização" },
  ];

  const nextStep = () => setCurrentStep(p => Math.min(steps.length, p + 1));
  const prevStep = () => setCurrentStep(p => Math.max(1, p - 1));

  // Helper to parse setlist text into array
  const getSetlistArray = () => {
    return data.suggestedSetlist 
      ? data.suggestedSetlist.split('\n').filter(line => line.trim().length > 0) 
      : [];
  };

  // --- Presentation View Component (Dark/Elegant) ---
  const PresentationView = () => (
    <div className="bg-[#0f0f0f] min-h-screen text-gray-200 font-sans print:bg-white print:text-black animate-fade-in">
      {/* Navbar for Presentation Mode */}
      <div className="sticky top-0 z-30 bg-[#0f0f0f]/90 backdrop-blur-md border-b border-gray-800 px-6 py-4 flex justify-between items-center print:hidden">
        <div className="flex items-center gap-3">
             <img src="logo.png" alt="Rafa Collioni" className="h-10 w-auto object-contain" />
        </div>
        <div className="flex gap-3">
          <button 
             onClick={() => setIsPresentationMode(false)}
             className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition text-sm font-medium flex items-center gap-2"
          >
             <Edit2 size={16} /> Editar
          </button>
          <button 
             onClick={() => window.print()}
             className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition text-sm font-medium flex items-center gap-2"
          >
             <Printer size={16} /> Imprimir / PDF
          </button>
        </div>
      </div>

      {/* Main Proposal Container */}
      <div className="max-w-4xl mx-auto bg-[#141414] shadow-2xl print:shadow-none print:bg-white overflow-hidden my-8 rounded-2xl border border-gray-800 print:border-none print:my-0">
        
        {/* Cover / Header */}
        <div className="bg-gradient-to-r from-brand-900 to-[#1a0b2e] p-12 relative overflow-hidden print:bg-none print:bg-slate-900 print:text-white">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Music size={300} />
          </div>
          <div className="relative z-10">
            <h2 className="text-brand-300 uppercase tracking-[0.2em] text-sm font-medium mb-4">Proposta Exclusiva</h2>
            <h1 className="text-5xl font-serif font-bold text-white mb-2 tracking-wide">Planejamento Musical</h1>
            {data.hostName && (
              <p className="text-2xl text-white font-serif mt-4 print:text-white">Preparado para {data.hostName}</p>
            )}
            <p className="text-xl text-brand-100 font-light opacity-80 mt-2">Rafa Collioni | Musica p/evento</p>
          </div>
        </div>
        
        {/* Event Summary Bar */}
        <div className="bg-[#1a1a1a] border-b border-gray-800 p-8 grid grid-cols-1 md:grid-cols-3 gap-8 print:bg-white print:border-gray-200 print:text-black">
          <div>
            <p className="text-xs text-brand-500 uppercase tracking-wider mb-1 font-bold">Evento</p>
            <p className="text-xl font-serif text-white print:text-black">{data.eventType || "Evento"}</p>
          </div>
          <div>
            <p className="text-xs text-brand-500 uppercase tracking-wider mb-1 font-bold">Data</p>
            <p className="text-xl font-serif text-white print:text-black">{data.date ? new Date(data.date).toLocaleDateString('pt-BR') : "A definir"}</p>
          </div>
          <div>
             <p className="text-xs text-brand-500 uppercase tracking-wider mb-1 font-bold">Local</p>
             <p className="text-xl font-serif text-white print:text-black">{data.location || "A definir"}</p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-12 space-y-12">
          
          {/* Concept */}
          {data.conceptSummary && (
            <div className="relative bg-[#1a1a1a] p-8 rounded-xl border border-brand-900/30 print:bg-slate-50 print:border-slate-200">
               <Sparkles className="absolute -top-3 -right-3 text-brand-500 bg-[#141414] rounded-full p-1 w-8 h-8 border border-gray-800" />
               <h3 className="font-serif text-2xl text-white mb-4 print:text-black">O Conceito</h3>
               <p className="text-gray-300 leading-relaxed italic text-lg print:text-gray-700">"{data.conceptSummary}"</p>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Column 1 */}
            <div className="space-y-8">
              <section>
                <h4 className="flex items-center gap-2 text-brand-400 font-bold uppercase tracking-wider text-sm border-b border-gray-800 pb-3 mb-5 print:text-brand-600 print:border-gray-200">
                  <Music className="w-4 h-4" /> Formato & Show
                </h4>
                <ul className="space-y-4">
                   <li className="flex justify-between items-center">
                     <span className="text-gray-500">Formação</span>
                     <span className="text-white font-medium print:text-black">{data.formation || "-"}</span>
                   </li>
                   <li className="flex justify-between items-center">
                     <span className="text-gray-500">Duração</span>
                     <span className="text-white font-medium print:text-black">{data.showDuration || "-"}</span>
                   </li>
                   <li className="flex justify-between items-center">
                     <span className="text-gray-500">Repertório</span>
                     <span className="text-white font-medium print:text-black">{data.repertoireType}</span>
                   </li>
                </ul>
              </section>

              <section>
                <h4 className="flex items-center gap-2 text-brand-400 font-bold uppercase tracking-wider text-sm border-b border-gray-800 pb-3 mb-5 print:text-brand-600 print:border-gray-200">
                  <Speaker className="w-4 h-4" /> Vibe & Interação
                </h4>
                <ul className="space-y-4">
                   <li className="flex justify-between items-center">
                     <span className="text-gray-500">Nível</span>
                     <span className="text-white font-medium print:text-black">{data.expectedInteraction}</span>
                   </li>
                   <li className="flex justify-between items-center">
                     <span className="text-gray-500">Figurino</span>
                     <span className="text-white font-medium print:text-black">{data.attire}</span>
                   </li>
                   <li className="flex justify-between items-center">
                     <span className="text-gray-500">Volume</span>
                     <span className="text-white font-medium print:text-black">{data.volume}</span>
                   </li>
                </ul>
              </section>
            </div>

            {/* Column 2 */}
            <div className="space-y-8">
               <section>
                <h4 className="flex items-center gap-2 text-brand-400 font-bold uppercase tracking-wider text-sm border-b border-gray-800 pb-3 mb-5 print:text-brand-600 print:border-gray-200">
                  <Users className="w-4 h-4" /> Perfil
                </h4>
                 <div className="space-y-4">
                    <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-800 print:bg-slate-50 print:border-slate-100">
                       <p className="text-xs text-gray-500 mb-1">Convidados</p>
                       <p className="text-white font-medium print:text-black">{data.guestCount || "0"} pessoas • {data.guestProfile || "Geral"}</p>
                    </div>
                    {data.doNotPlay && (
                      <div className="bg-red-900/10 p-4 rounded-lg border border-red-900/30 print:bg-red-50 print:border-red-100">
                         <p className="text-xs text-red-400 mb-1 print:text-red-600">Restrições Musicais</p>
                         <p className="text-red-200 text-sm print:text-red-800">{data.doNotPlay}</p>
                      </div>
                    )}
                 </div>
              </section>
              
              <section>
                <h4 className="flex items-center gap-2 text-brand-400 font-bold uppercase tracking-wider text-sm border-b border-gray-800 pb-3 mb-5 print:text-brand-600 print:border-gray-200">
                  <Clock className="w-4 h-4" /> Momentos
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.musicMoments.length > 0 ? data.musicMoments.map(m => (
                    <span key={m} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300 print:bg-gray-100 print:text-black">{m}</span>
                  )) : <span className="text-gray-600 italic">Nenhum selecionado</span>}
                </div>
              </section>
            </div>
          </div>

          {/* Setlist */}
          {getSetlistArray().length > 0 && (
            <section className="pt-8 border-t border-gray-800 print:border-gray-200">
               <div className="flex items-center justify-between mb-6">
                 <h3 className="text-2xl font-serif font-bold text-white print:text-black">Setlist Sugerido</h3>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getSetlistArray().map((song, i) => (
                    <div key={i} className="group flex items-center gap-4 p-3 rounded-lg hover:bg-[#1a1a1a] transition border border-transparent hover:border-gray-800 print:hover:bg-gray-50">
                       <span className="w-8 h-8 rounded-full bg-brand-900/30 text-brand-400 flex items-center justify-center text-xs font-bold border border-brand-500/20 print:bg-brand-100 print:text-brand-700">
                         {i + 1}
                       </span>
                       <span className="text-gray-300 font-medium group-hover:text-white print:text-gray-700 print:group-hover:text-black">{song}</span>
                    </div>
                  ))}
                </div>
            </section>
          )}

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col items-center justify-center text-center opacity-60 print:border-gray-200">
             <img src="logo.png" alt="Rafa Collioni" className="h-16 w-auto object-contain mb-4 grayscale" />
             <p className="text-xs text-gray-500 mt-2 print:text-gray-400">Transformando eventos em experiências.</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-dark-bg text-gray-200 font-sans selection:bg-brand-500 selection:text-white">
      {isPresentationMode ? (
        <PresentationView />
      ) : (
        <>
          {/* Header / Nav */}
          <header className="fixed top-0 w-full z-40 bg-dark-bg/80 backdrop-blur-lg border-b border-white/5">
            <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src="logo.png" alt="Rafa Collioni Logo" className="h-14 w-auto object-contain" />
              </div>
              
              <div className="hidden md:flex items-center gap-2">
                 {steps.map((step, idx) => (
                   <div key={step.id} className="flex items-center">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${currentStep === step.id ? 'bg-brand-900/50 text-brand-300 border border-brand-500/30' : 'text-gray-600'}`}>
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep === step.id ? 'bg-brand-500 text-white' : 'bg-gray-800'}`}>
                          {step.id}
                        </span>
                        {currentStep === step.id && <span className="font-medium">{step.title}</span>}
                      </div>
                      {idx < steps.length - 1 && <div className="w-8 h-[1px] bg-gray-800 mx-2" />}
                   </div>
                 ))}
              </div>
            </div>
          </header>

          {/* Form Content - Wizard Style */}
          <main className="pt-32 pb-24 px-4">
            <div className="max-w-2xl mx-auto">
              
              <div className="mb-8 md:hidden">
                <p className="text-brand-400 text-sm font-bold uppercase tracking-wider mb-2">Passo {currentStep} de 4</p>
                <h2 className="text-2xl font-serif text-white">{steps[currentStep-1].title}</h2>
              </div>

              <div className="animate-fade-in-up space-y-8">
                {currentStep === 1 && (
                  <div className="space-y-6">
                     <section>
                      <SectionTitle icon={Calendar}>Dados do Evento</SectionTitle>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="md:col-span-2">
                           <Label>Anfitrião(ões) / Responsável</Label>
                           <Input 
                            placeholder="Ex: João e Maria, Empresa X..." 
                            value={data.hostName}
                            onChange={(e) => updateField('hostName', e.target.value)}
                            autoFocus
                           />
                        </div>
                        <div className="md:col-span-2">
                          <Label>Tipo de Evento</Label>
                          <Input 
                            placeholder="Ex: Casamento, Aniversário..." 
                            value={data.eventType}
                            onChange={(e) => updateField('eventType', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Data</Label>
                          <Input 
                            type="date"
                            value={data.date}
                            onChange={(e) => updateField('date', e.target.value)}
                          />
                        </div>
                         <div>
                          <Label>Cidade / Local</Label>
                          <Input 
                            placeholder="Local do evento"
                            value={data.location}
                            onChange={(e) => updateField('location', e.target.value)}
                          />
                        </div>
                      </div>
                    </section>
                    <section>
                      <SectionTitle icon={Users}>O Público</SectionTitle>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label>Número de Convidados</Label>
                          <Input 
                            type="number"
                            value={data.guestCount}
                            onChange={(e) => updateField('guestCount', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Perfil (Idade/Estilo)</Label>
                          <Input 
                            placeholder="Ex: Jovens, Casais..."
                            value={data.guestProfile}
                            onChange={(e) => updateField('guestProfile', e.target.value)}
                          />
                        </div>
                      </div>
                    </section>
                  </div>
                )}

                {currentStep === 2 && (
                   <div className="space-y-6">
                      <section>
                        <SectionTitle icon={Music}>Formato Musical</SectionTitle>
                        <div className="space-y-6">
                          <CheckboxGroup 
                            label="Em quais momentos haverá música?"
                            options={musicMoments}
                            selected={data.musicMoments}
                            onChange={(val) => updateField('musicMoments', val)}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <Label>Formação</Label>
                              <Select value={data.formation} onChange={(e) => updateField('formation', e.target.value)}>
                                <option value="">Selecione...</option>
                                {formations.map(f => <option key={f} value={f}>{f}</option>)}
                              </Select>
                            </div>
                            <div>
                              <Label>Duração do Show</Label>
                              <Select value={data.showDuration} onChange={(e) => updateField('showDuration', e.target.value)}>
                                <option value="">Selecione...</option>
                                {showDurations.map(d => <option key={d} value={d}>{d}</option>)}
                              </Select>
                            </div>
                          </div>

                           <div className="bg-dark-surface p-4 rounded-xl border border-dark-border">
                              <Label>Tipo de Repertório</Label>
                              <div className="flex gap-6 mt-3">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${data.repertoireType === 'Show Normal' ? 'border-brand-500' : 'border-gray-600'}`}>
                                      {data.repertoireType === 'Show Normal' && <div className="w-3 h-3 bg-brand-500 rounded-full" />}
                                    </div>
                                    <input type="radio" name="rep" className="hidden" onChange={() => updateField('repertoireType', 'Show Normal')} checked={data.repertoireType === 'Show Normal'} />
                                    <span className="text-gray-300 group-hover:text-white transition">Show Normal</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                     <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${data.repertoireType === 'Show Especial' ? 'border-brand-500' : 'border-gray-600'}`}>
                                      {data.repertoireType === 'Show Especial' && <div className="w-3 h-3 bg-brand-500 rounded-full" />}
                                    </div>
                                    <input type="radio" name="rep" className="hidden" onChange={() => updateField('repertoireType', 'Show Especial')} checked={data.repertoireType === 'Show Especial'} />
                                    <span className="text-gray-300 group-hover:text-white transition">Show Especial</span>
                                </label>
                              </div>
                          </div>
                        </div>
                      </section>
                   </div>
                )}

                {currentStep === 3 && (
                   <div className="space-y-6">
                     <section>
                       <SectionTitle icon={Sparkles}>Vibe & Preferências</SectionTitle>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <Label>Nível de Interação</Label>
                            <Select value={data.expectedInteraction} onChange={(e) => updateField('expectedInteraction', e.target.value)}>
                              {interactionLevels.map(i => <option key={i} value={i}>{i}</option>)}
                            </Select>
                          </div>
                           <div>
                            <Label>Volume Ideal</Label>
                            <Select value={data.volume} onChange={(e) => updateField('volume', e.target.value)}>
                              {volumes.map(v => <option key={v} value={v}>{v}</option>)}
                            </Select>
                          </div>
                       </div>

                       <CheckboxGroup 
                          label="Momentos Interativos"
                          options={interactiveTypes}
                          selected={data.interactiveMoments}
                          onChange={(val) => updateField('interactiveMoments', val)}
                        />

                        <div className="space-y-4">
                           <div>
                              <Label>Músicas Especiais (Pedidos)</Label>
                              <TextArea placeholder="Alguma música que não pode faltar?" value={data.specialSongs} onChange={(e) => updateField('specialSongs', e.target.value)} />
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label>O que NÃO tocar</Label>
                                <TextArea placeholder="Restrições do cliente..." value={data.doNotPlay} onChange={(e) => updateField('doNotPlay', e.target.value)} />
                              </div>
                              <div>
                                <Label>Diversidade Musical</Label>
                                <TextArea placeholder="Observações sobre o gosto..." value={data.tasteDiversity} onChange={(e) => updateField('tasteDiversity', e.target.value)} />
                              </div>
                           </div>
                        </div>
                     </section>
                   </div>
                )}

                {currentStep === 4 && (
                   <div className="space-y-6">
                      <section>
                         <SectionTitle icon={Speaker}>Logística & Detalhes</SectionTitle>
                         
                         <div className="bg-dark-surface rounded-xl border border-dark-border divide-y divide-white/5">
                            <Toggle label="Evento já possui sonorização?" checked={data.soundSystemProvided} onChange={(v) => updateField('soundSystemProvided', v)} />
                            <Toggle label="Possibilidade de Hora Extra?" checked={data.overtimePossibility} onChange={(v) => updateField('overtimePossibility', v)} />
                            <Toggle label="Precisa de indicação de outros fornecedores?" checked={data.vendorReferral} onChange={(v) => updateField('vendorReferral', v)} />
                         </div>

                         <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                               <Label>Tamanho do Palco</Label>
                               <Input value={data.stageSize} onChange={(e) => updateField('stageSize', e.target.value)} placeholder="Ex: 4x3m" />
                            </div>
                             <div>
                               <Label>Obs. Acústica</Label>
                               <Input value={data.acousticsNotes} onChange={(e) => updateField('acousticsNotes', e.target.value)} placeholder="Ex: Salão com muito eco" />
                            </div>
                         </div>
                      </section>

                      {/* Final Presentation Input Section (Replaces AI) */}
                      <section>
                         <SectionTitle icon={Sparkles}>Conteúdo da Apresentação</SectionTitle>
                         <div className="space-y-6 p-6 bg-brand-900/10 border border-brand-900/30 rounded-xl">
                            <div>
                              <Label>Resumo do Conceito Musical</Label>
                              <p className="text-xs text-gray-400 mb-2">Descreva a atmosfera e o estilo planejado para o evento (aparecerá na proposta final).</p>
                              <TextArea 
                                value={data.conceptSummary} 
                                onChange={(e) => updateField('conceptSummary', e.target.value)} 
                                placeholder="Ex: Um show intimista e elegante, focado em clássicos do pop rock com arranjos modernos..."
                              />
                            </div>
                            <div>
                              <Label>Setlist Sugerido</Label>
                              <p className="text-xs text-gray-400 mb-2">Liste as músicas principais, uma por linha.</p>
                              <TextArea 
                                value={data.suggestedSetlist} 
                                onChange={(e) => updateField('suggestedSetlist', e.target.value)} 
                                placeholder={"Wonderwall - Oasis\nYellow - Coldplay\n..."}
                                rows={6}
                              />
                            </div>
                         </div>
                      </section>
                   </div>
                )}
              </div>
            </div>
          </main>

          {/* Bottom Navigation */}
          <footer className="fixed bottom-0 w-full bg-dark-bg border-t border-white/5 p-4 z-40">
             <div className="max-w-2xl mx-auto flex justify-between items-center">
                <button 
                  onClick={prevStep} 
                  disabled={currentStep === 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition ${
                    currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <ArrowLeft size={18} /> Voltar
                </button>

                {currentStep < 4 ? (
                   <button 
                    onClick={nextStep}
                    className="flex items-center gap-2 px-8 py-3 bg-brand-600 text-white rounded-xl font-bold shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:bg-brand-500 hover:shadow-[0_0_25px_rgba(124,58,237,0.6)] transition-all transform hover:-translate-y-0.5"
                   >
                    Próximo <ArrowRight size={18} />
                   </button>
                ) : (
                   <button 
                    onClick={() => {
                       window.scrollTo(0,0);
                       setIsPresentationMode(true);
                    }}
                    className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-xl font-bold shadow-lg hover:bg-gray-200 transition-all transform hover:-translate-y-0.5"
                   >
                    Ver Proposta Final <CheckCircle2 size={18} />
                   </button>
                )}
             </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;