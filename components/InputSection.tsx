import React from 'react';

export const SectionTitle = ({ children, icon: Icon }: { children?: React.ReactNode; icon?: any }) => (
  <h3 className="text-xl font-serif font-semibold text-white mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
    {Icon && <div className="p-2 bg-brand-900/50 rounded-lg text-brand-400"><Icon className="w-5 h-5" /></div>}
    {children}
  </h3>
);

export const Label = ({ children }: { children?: React.ReactNode }) => (
  <label className="block text-sm font-medium text-gray-300 mb-2 tracking-wide">{children}</label>
);

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full px-4 py-3 bg-dark-input border border-dark-border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all hover:border-gray-600"
  />
);

export const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <div className="relative">
    <select
      {...props}
      className="w-full px-4 py-3 bg-dark-input border border-dark-border rounded-lg text-white appearance-none focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all hover:border-gray-600 cursor-pointer"
    />
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
      </svg>
    </div>
  </div>
);

export const TextArea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className="w-full px-4 py-3 bg-dark-input border border-dark-border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all hover:border-gray-600 resize-none"
    rows={4}
  />
);

export const CheckboxGroup = ({ 
  label, 
  options, 
  selected, 
  onChange 
}: { 
  label: string; 
  options: string[]; 
  selected: string[]; 
  onChange: (val: string[]) => void;
}) => {
  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter(s => s !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  return (
    <div className="mb-6">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-3 mt-3">
        {options.map(opt => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all border ${
              selected.includes(opt)
                ? 'bg-brand-600 text-white border-brand-500 shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                : 'bg-dark-surface text-gray-400 border-dark-border hover:border-gray-500 hover:text-white'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export const Toggle = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) => (
  <div className="flex items-center justify-between py-4 px-4 bg-dark-surface rounded-lg border border-dark-border">
    <span className="text-sm font-medium text-gray-300">{label}</span>
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        checked ? 'bg-brand-600' : 'bg-gray-600'
      }`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  </div>
);