import React, { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IoCloudUploadOutline,
  IoCheckmarkCircleOutline,
  IoAlertCircleOutline,
  IoCloseOutline,
  IoImageOutline,
  IoLinkOutline,
  IoRefreshOutline,
} from 'react-icons/io5';

// imgbb free public API key — or leave blank for URL-only mode
// Set VITE_IMGBB_API_KEY in your .env to enable actual uploads
const IMGBB_API_KEY = (import.meta as any).env?.VITE_IMGBB_API_KEY || '';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
  className?: string;
}

type Tab = 'upload' | 'url';
type UploadState = 'idle' | 'uploading' | 'success' | 'error';

const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = 'Cover Image',
  required = false,
  className = '',
}) => {
  const [tab, setTab] = useState<Tab>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [urlInput, setUrlInput] = useState(value || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ── Upload to imgbb ── */
  const uploadToImgbb = async (file: File): Promise<string> => {
    if (!IMGBB_API_KEY) {
      // Fallback: convert to compressed WebP data URL
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target?.result as string;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 800; // Reduced from 1200 to fit Google Sheets 50,000 char limit
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
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(0, 0, width, height);
              ctx.drawImage(img, 0, 0, width, height);
            }
            resolve(canvas.toDataURL('image/webp', 0.45)); // Compressed heavily to fit Google Sheets limits
          };
          img.onerror = () => reject(new Error('Image load failed'));
        };
        reader.onerror = () => reject(new Error('File read failed'));
      });
    }

    const formData = new FormData();
    formData.append('image', file);

    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          setUploadProgress(Math.round((e.loaded / e.total) * 100));
        }
      };
      xhr.onload = () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          resolve(data.data.url);
        } else {
          reject(new Error('Upload failed'));
        }
      };
      xhr.onerror = () => reject(new Error('Network error'));
      xhr.open('POST', `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`);
      xhr.send(formData);
    });
  };

  const handleFile = useCallback(async (file: File) => {
    // Validate
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload an image file (JPG, PNG, WebP, GIF).');
      setUploadState('error');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Image must be smaller than 10 MB.');
      setUploadState('error');
      return;
    }

    setUploadState('uploading');
    setUploadProgress(0);
    setErrorMsg('');

    try {
      const url = await uploadToImgbb(file);
      onChange(url);
      setUrlInput(url);
      setUploadState('success');
    } catch {
      setErrorMsg('Upload failed. Please try again or paste a URL instead.');
      setUploadState('error');
    }
  }, [onChange]);

  /* ── Drag handlers ── */
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);

  /* ── File input ── */
  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  /* ── URL tab submit ── */
  const handleUrlApply = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUploadState('success');
    }
  };

  const handleClear = () => {
    onChange('');
    setUrlInput('');
    setUploadState('idle');
    setErrorMsg('');
    setUploadProgress(0);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Label */}
      <div className="flex items-center justify-between">
        <label className="text-[10px] uppercase tracking-widest font-bold text-brand-blue/50">
          {label} {required && <span className="text-brand-gold">*</span>}
        </label>
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="text-[10px] text-red-400 hover:text-red-500 font-bold flex items-center gap-1 cursor-pointer transition-colors"
          >
            <IoCloseOutline size={12} /> Clear image
          </button>
        )}
      </div>

      {/* Tab Switcher */}
      <div className="flex bg-brand-blue/5 p-1 rounded-xl gap-1">
        {(['upload', 'url'] as Tab[]).map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              tab === t
                ? 'bg-white text-brand-blue shadow-sm'
                : 'text-brand-blue/40 hover:text-brand-blue/60'
            }`}
          >
            {t === 'upload' ? <IoCloudUploadOutline size={13} /> : <IoLinkOutline size={13} />}
            {t === 'upload' ? 'Upload File' : 'Paste URL'}
          </button>
        ))}
      </div>

      {/* Upload Tab */}
      <AnimatePresence mode="wait">
        {tab === 'upload' && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFileInputChange}
            />

            {/* Drop Zone */}
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onClick={() => uploadState !== 'uploading' && fileInputRef.current?.click()}
              className={`relative w-full rounded-2xl border-2 border-dashed transition-all cursor-pointer select-none overflow-hidden ${
                isDragging
                  ? 'border-brand-gold bg-brand-gold/5 scale-[1.01]'
                  : uploadState === 'success'
                  ? 'border-green-300 bg-green-50/50'
                  : uploadState === 'error'
                  ? 'border-red-300 bg-red-50/30'
                  : 'border-brand-blue/15 bg-brand-blue/[0.02] hover:border-brand-gold/40 hover:bg-brand-gold/[0.03]'
              }`}
              style={{ minHeight: '160px' }}
            >
              {/* Uploading state */}
              {uploadState === 'uploading' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                  <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center">
                    <IoRefreshOutline className="animate-spin text-brand-blue" size={24} />
                  </div>
                  <div className="w-full max-w-[200px]">
                    <div className="h-1.5 bg-brand-blue/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-brand-gold rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <p className="text-center text-[10px] text-brand-blue/50 mt-2 font-bold">
                      Uploading… {uploadProgress}%
                    </p>
                  </div>
                </div>
              )}

              {/* Idle / drag state */}
              {(uploadState === 'idle' || isDragging) && (
                <div className="flex flex-col items-center justify-center gap-3 p-8 text-center">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                    isDragging ? 'bg-brand-gold/20 text-brand-gold' : 'bg-brand-blue/8 text-brand-blue/40'
                  }`}>
                    <IoCloudUploadOutline size={28} />
                  </div>
                  <div>
                    <p className="font-bold text-brand-blue/70 text-sm">
                      {isDragging ? 'Drop image here' : 'Drag & drop or click to browse'}
                    </p>
                    <p className="text-[10px] text-brand-blue/35 mt-1">
                      JPG, PNG, WebP or GIF · Max 10 MB
                    </p>
                  </div>
                  {!isDragging && (
                    <div className="px-4 py-2 bg-brand-blue text-brand-cream rounded-xl text-xs font-bold hover:bg-brand-blue/90 transition-colors mt-1">
                      Choose File
                    </div>
                  )}
                </div>
              )}

              {/* Success state (after upload) */}
              {uploadState === 'success' && !isDragging && (
                <div className="flex flex-col items-center justify-center gap-2 p-6 text-center">
                  <IoCheckmarkCircleOutline className="text-green-500" size={32} />
                  <p className="text-sm font-bold text-green-700">Image uploaded!</p>
                  <p className="text-[10px] text-green-600/70">Click to replace</p>
                </div>
              )}

              {/* Error state */}
              {uploadState === 'error' && !isDragging && (
                <div className="flex flex-col items-center justify-center gap-2 p-6 text-center">
                  <IoAlertCircleOutline className="text-red-400" size={32} />
                  <p className="text-xs font-bold text-red-600">{errorMsg}</p>
                  <p className="text-[10px] text-red-500/60">Click to try again</p>
                </div>
              )}
            </div>

            {!IMGBB_API_KEY && (
              <p className="text-[10px] text-brand-blue/35 mt-1.5 leading-relaxed">
                💡 To enable real uploads, add <code className="bg-brand-blue/5 px-1.5 py-0.5 rounded font-mono">VITE_IMGBB_API_KEY=your_key</code> to your <code className="bg-brand-blue/5 px-1.5 py-0.5 rounded font-mono">.env</code> file. Get a free key at <a href="https://imgbb.com" target="_blank" rel="noreferrer" className="text-brand-gold underline">imgbb.com</a>. Without a key, files are stored as base64 data URLs.
              </p>
            )}
          </motion.div>
        )}

        {/* URL Tab */}
        {tab === 'url' && (
          <motion.div
            key="url"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="space-y-2"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleUrlApply())}
                placeholder="https://i.ibb.co/example.jpg  or  /local-image.jpg"
                className="flex-1 px-4 py-3 bg-brand-cream border border-brand-blue/8 focus:border-brand-gold rounded-xl focus:outline-none text-brand-blue text-sm"
              />
              <button
                type="button"
                onClick={handleUrlApply}
                className="px-4 py-3 bg-brand-blue text-brand-cream rounded-xl font-bold text-xs hover:bg-brand-gold hover:text-brand-blue transition-all cursor-pointer whitespace-nowrap"
              >
                Apply
              </button>
            </div>
            <p className="text-[10px] text-brand-blue/35 leading-relaxed">
              Free upload: <a href="https://imgbb.com" target="_blank" rel="noreferrer" className="text-brand-gold font-bold hover:underline">imgbb.com</a> or <a href="https://imgur.com/upload" target="_blank" rel="noreferrer" className="text-brand-gold font-bold hover:underline">imgur.com</a> → right-click image → Copy image address.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Preview */}
      <AnimatePresence>
        {value && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="relative w-full rounded-2xl overflow-hidden border border-brand-blue/10 shadow-md group">
              <img
                src={value}
                alt="Preview"
                className="w-full object-cover"
                style={{ maxHeight: '240px' }}
                onError={(e) => { (e.target as HTMLImageElement).src = '/logo.png'; }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-[10px] font-bold uppercase tracking-widest">Cover Image Preview</span>
              </div>
              {/* Aspect badge */}
              <div className="absolute top-3 right-3">
                <span className="bg-black/40 backdrop-blur-sm text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Cover
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUploader;
