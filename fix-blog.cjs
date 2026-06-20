const fs = require('fs');
const file = 'c:/Users/Raaz/Desktop/redesign udupi/src/pages/BlogAdmin.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Replace handleInlineUpload
content = content.replace(
  /const handleInlineUpload = async \(file: File\) => \{[\s\S]*?if \(fileInputRef\.current\) fileInputRef\.current\.value = '';\s*\}\s*\};/m,
  `const handleInlineUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File too large (max 10 MB).');
      setShowUrlPaste(true);
      return;
    }
    setUploadingInline(true);
    setUploadError('');
    try {
      let url = '';
      if (IMGBB_API_KEY) {
        const fd = new FormData();
        fd.append('image', file);
        const res = await fetch(\`https://api.imgbb.com/1/upload?key=\${IMGBB_API_KEY}\`, { method: 'POST', body: fd });
        const data = await res.json();
        if (data?.data?.url) url = data.data.url;
      }
      if (!url) {
        const compressImage = (f: File) => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(f);
            reader.onload = (e) => {
              const img = new Image();
              img.src = e.target?.result;
              img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800;
                let width = img.width;
                let height = img.height;
                if (width > MAX_WIDTH) {
                  height = Math.round((height * MAX_WIDTH) / width);
                  width = MAX_WIDTH;
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                  ctx.fillStyle = '#ffffff'; // Ensure non-transparent background
                  ctx.fillRect(0, 0, width, height);
                  ctx.drawImage(img, 0, 0, width, height);
                }
                resolve(canvas.toDataURL('image/webp', 0.65)); // Compress heavily
              };
              img.onerror = () => reject('Image load failed');
            };
            reader.onerror = () => reject('File read failed');
          });
        url = await compressImage(file);
      }
      if (url) {
        insertImgTag(url);
      } else {
        setUploadError('Upload failed. Paste an image URL manually:');
        setShowUrlPaste(true);
      }
    } catch {
      setUploadError('Upload failed. Paste an image URL manually:');
      setShowUrlPaste(true);
    } finally {
      setUploadingInline(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };`
);

// 2. Add new icons to import
if (!content.includes('IoCameraOutline')) {
  content = content.replace(
    /import \{\s*IoLockClosedOutline,/m,
    'import {\n  IoCameraOutline,\n  IoAddCircleOutline,\n  IoScanOutline,\n  IoMailOutline,\n  IoCallOutline,\n  IoBulbOutline,\n  IoChatbubbleEllipsesOutline,\n  IoLockClosedOutline,'
  );
}

// 3. Replace Emojis
content = content.replace(/>📸</g, '><IoCameraOutline size={18} className="text-brand-gold mt-1 shrink-0" /><');
content = content.replace(/>➕</g, '><IoAddCircleOutline size={18} className="text-brand-gold mt-1 shrink-0" /><');
content = content.replace(/>📐</g, '><IoScanOutline size={18} className="text-brand-gold mt-1 shrink-0" /><');
content = content.replace(/💡 /g, '<IoBulbOutline className="inline text-brand-gold mr-1" size={16} /> ');
content = content.replace(/📞 /g, '<IoCallOutline className="inline text-brand-gold mr-1" size={14} /> ');
content = content.replace(/✉️ /g, '<IoMailOutline className="inline text-brand-gold mr-1" size={14} /> ');
content = content.replace(/Notify Guest 💬/g, 'Notify Guest <IoChatbubbleEllipsesOutline size={14} />');
content = content.replace(/📊 Google Sheets/g, '<IoStatsChartOutline className="inline mr-1" size={12} /> Google Sheets');
content = content.replace(/🌟/g, ''); // just remove star from whatsapp message
content = content.replace(/🎉 /g, ''); // remove party popper

fs.writeFileSync(file, content, 'utf8');
console.log('Fixes complete');
