const fs = require('fs');
const file = 'c:/Users/Raaz/Desktop/redesign udupi/src/pages/BlogAdmin.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /className="flex items-center justify-between p-4 bg-white rounded-2xl border border-brand-blue\/5 hover:border-brand-gold\/30 transition-all shadow-sm gap-3"/g,
  'className="flex items-center justify-between p-5 bg-white rounded-[2rem] border border-brand-blue/5 hover:shadow-[0_15px_40px_rgba(15,47,74,0.08)] hover:border-brand-gold/20 transition-all duration-300 gap-4"'
);

content = content.replace(
  /className=\{`p-6 rounded-3xl border transition-all bg-white relative shadow-sm \$\{/g,
  'className={`p-6 rounded-[2rem] border transition-all duration-300 bg-white relative hover:shadow-[0_15px_40px_rgba(15,47,74,0.08)] ${'
);

fs.writeFileSync(file, content, 'utf8');
console.log('Final tweaks complete');
