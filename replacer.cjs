const fs = require('fs');
const file = 'c:/Users/Raaz/Desktop/redesign udupi/src/pages/BlogAdmin.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. StepCard
content = content.replace(
  /const StepCard = \(\{ number, title, desc, children \}: \{ number: number; title: string; desc: string; children: React\.ReactNode \}\) => \([\s\S]*?  <\/div>\n\);/m,
  `const StepCard = ({ number, title, desc, children }: { number: number; title: string; desc: string; children: React.ReactNode }) => (
  <div className="bg-white/80 backdrop-blur-md border border-brand-blue/5 rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-brand-gold/20">
    <div className="flex items-center gap-4 pb-4 border-b border-brand-blue/5">
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-gold to-brand-gold/80 text-white text-sm font-black flex items-center justify-center shrink-0 shadow-lg shadow-brand-gold/20">
        {number}
      </div>
      <div>
        <h3 className="font-display font-bold text-brand-blue text-lg tracking-tight">{title}</h3>
        <p className="text-[11px] text-brand-blue/50 font-medium mt-0.5">{desc}</p>
      </div>
    </div>
    <div className="pt-2">
      {children}
    </div>
  </div>
);`
);

// 2. MenuButton
content = content.replace(
  /const MenuButton = \(\{ label, desc, onClick, href, icon, primary = false, internal = false \}: any\) => \{[\s\S]*?\n\};\n/m,
  `const MenuButton = ({ label, desc, onClick, href, icon, primary = false, internal = false }: any) => {
  const CardClass = \`group w-full flex items-center justify-between p-5 rounded-[1.25rem] transition-all border text-left cursor-pointer \${
    primary
      ? 'bg-brand-blue text-brand-cream border-brand-blue shadow-[0_12px_35px_rgba(15,47,74,0.2)] hover:shadow-[0_20px_40px_rgba(15,47,74,0.25)]'
      : 'bg-white text-brand-blue border-brand-blue/5 shadow-sm hover:shadow-[0_10px_30px_rgba(15,47,74,0.08)] hover:border-brand-gold/30'
  }\`;

  const InnerContent = (
    <>
      <div className="flex items-center gap-4">
        <div className={\`p-3 rounded-2xl transition-colors \${primary ? 'bg-white/10 shadow-inner' : 'bg-brand-gold/10 shadow-inner shadow-brand-gold/20'}\`}>
          {icon}
        </div>
        <div>
          <div className="text-[17px] font-bold font-display leading-tight">{label}</div>
          <div className={\`text-[11px] mt-1 font-medium \${primary ? 'text-brand-cream/70' : 'text-brand-blue/50'}\`}>{desc}</div>
        </div>
      </div>
      <div className={\`w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:scale-110 \${primary ? 'bg-brand-gold/20 text-brand-gold' : 'bg-brand-blue/5 text-brand-blue/50 group-hover:bg-brand-gold/10 group-hover:text-brand-gold'}\`}>
        <IoArrowForwardOutline className="transition-transform group-hover:translate-x-0.5" size={16} />
      </div>
    </>
  );

  if (href) {
    return (
      <motion.a href={href} target={internal ? '_self' : '_blank'} rel="noopener noreferrer"
        whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className={CardClass}>
        {InnerContent}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className={CardClass}>
      {InnerContent}
    </motion.button>
  );
};
`
);

// 3. Inputs & textareas
content = content.replace(/className="w-full px-4 py-3 bg-brand-cream border border-brand-blue\/8 focus:border-brand-gold rounded-xl focus:outline-none text-brand-blue text-sm"/g, 'className="w-full px-5 py-4 bg-brand-blue/[0.02] border border-brand-blue/10 focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 rounded-2xl outline-none text-brand-blue text-sm font-medium transition-all"');
content = content.replace(/className="w-full px-4 py-3 bg-brand-cream border border-brand-blue\/8 focus:border-brand-gold rounded-xl focus:outline-none text-brand-blue text-sm font-mono"/g, 'className="w-full px-5 py-4 bg-brand-blue/[0.02] border border-brand-blue/10 focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 rounded-2xl outline-none text-brand-blue text-sm font-medium font-mono transition-all"');
content = content.replace(/className="w-full px-4 py-3 bg-brand-cream border border-brand-blue\/8 focus:border-brand-gold rounded-xl focus:outline-none text-brand-blue text-sm resize-none"/g, 'className="w-full px-5 py-4 bg-brand-blue/[0.02] border border-brand-blue/10 focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 rounded-2xl outline-none text-brand-blue text-sm font-medium resize-none transition-all"');
content = content.replace(/className="w-full px-5 py-3\.5 bg-brand-cream border border-brand-blue\/8 focus:border-brand-gold rounded-2xl focus:outline-none text-brand-blue text-sm"/g, 'className="w-full px-5 py-4 bg-brand-blue/[0.02] border border-brand-blue/10 focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 rounded-2xl outline-none text-brand-blue text-sm font-medium transition-all"');

// 4. Main content textareas
content = content.replace(/className="w-full px-4 py-3 bg-brand-cream border border-brand-blue\/10 focus:border-brand-gold rounded-none focus:outline-none text-brand-blue text-sm font-mono leading-relaxed resize-y"/g, 'className="w-full px-5 py-4 bg-brand-blue/[0.02] border border-brand-blue/10 focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 rounded-b-2xl focus:rounded-b-2xl outline-none text-brand-blue text-sm font-medium font-mono leading-relaxed resize-y transition-all"');

// Fix content stats bar rounding
content = content.replace(/border-t-0 rounded-b-xl/g, 'border-t-0 rounded-b-2xl');

// Add to write header "bg-white/80" -> "bg-white/95" for better contrast
content = content.replace(/className="w-full max-w-4xl bg-white\/80 backdrop-blur-2xl rounded-\[2rem\] p-5 md:p-8 shadow-\[0_20px_60px_rgba\(15,47,74,0\.08\)\] border border-white\/40 relative z-10"/, 'className="w-full max-w-4xl bg-white/95 backdrop-blur-2xl rounded-[2.5rem] p-6 md:p-10 shadow-[0_30px_80px_rgba(15,47,74,0.1)] border border-white relative z-10"');

fs.writeFileSync(file, content, 'utf8');
console.log('Replacements complete');
