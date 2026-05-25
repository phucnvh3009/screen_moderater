import React, { useState } from 'react';
import { User, Shield, Lock, Phone, Mail, Key, CheckCircle, RefreshCcw } from 'lucide-react';

interface ProfileViewProps {
  onShowToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export default function ProfileView({ onShowToast }: ProfileViewProps) {
  // Local state for Section A: Personal Info
  const [fullName, setFullName] = useState('Alice Harrison');
  const [email] = useState('alice.harrison@eventhub.com'); // disabled/readonly
  const [phoneNumber, setPhoneNumber] = useState('+1 (512) 555-0199');
  
  // Local state for Section B: Security (Change password)
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Loading & error details
  const [isSaving, setIsSaving] = useState(false);
  const [securityErrors, setSecurityErrors] = useState<string | null>(null);

  // Profile Avatar photo
  const [avatarUrl, setAvatarUrl] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuBd3FJ4wzGpHv5l3Xtqq7NdyXnjiKJr-MjTF6MgZFm0LTvxE0V_7MlaAUPXPzgK_4vK8u6KT2uTEJjS76F6sIKQX6TE_BGnQuFS9_wXOXZQxqbur7N2PyX5JlDkHThp2Y8__FqqgCVbgFtrhPvAoefVeFSkMWGc0aN3AiBueh3HqcxKLF1SbFiV_V_V4ss8bckCr23LpUuqFlrrKjHv8prp8Bj7PBIxVebi3ZtKGXXYRw9U_Xh6BAyP4Y-IIrgzYM_RxLMspGL_Fos');

  const handleRandomizeAvatar = () => {
    // Generate a different gorgeous avatar URL to simulate upload or update
    const randomSeed = Math.floor(Math.random() * 1000);
    setAvatarUrl(`https://picsum.photos/seed/${randomSeed}/200/200`);
    onShowToast('Simulating secure local avatar replacement.', 'info');
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSecurityErrors(null);

    // Validate password if user starts typing in any security input
    if (currentPassword || newPassword || confirmPassword) {
      if (!currentPassword) {
        setSecurityErrors('Please provide your Current Password to update credentials.');
        setIsSaving(false);
        onShowToast('Security validation failed.', 'error');
        return;
      }
      if (newPassword.length < 6) {
        setSecurityErrors('New Password must be at least 6 characters long.');
        setIsSaving(false);
        onShowToast('Password too short.', 'error');
        return;
      }
      if (newPassword !== confirmPassword) {
        setSecurityErrors('Confirmation password does not match new password.');
        setIsSaving(false);
        onShowToast('Passwords do not match.', 'error');
        return;
      }
    }

    // Simulate Server Request delay
    setTimeout(() => {
      setIsSaving(false);
      onShowToast('Profile settings and security protocols updated successfully!', 'success');
      
      // Reset security input states
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-fade-in text-sans max-w-4xl mx-auto">
      {/* Title block banner */}
      <div>
        <h1 className="text-3xl font-extrabold text-on-surface tracking-tight mb-2">
          Moderator Account Settings
        </h1>
        <p className="text-on-surface-variant text-base">
          Update your public profile configuration and change your cryptographic authentication password.
        </p>
      </div>

      <form onSubmit={handleSaveChanges} className="space-y-8">
        {/* Core Settings layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Section A: Personal Information */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-fuchsia-500/10 shadow-emerald-500/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-300"></div>
            
            <h2 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2.5 border-b border-outline-variant/15 pb-3">
              <User className="w-5 h-5 text-primary" />
              Personal Information
            </h2>

            <div className="space-y-6">
              {/* Profile image placeholder selection & design */}
              <div className="flex flex-col sm:flex-row items-center gap-5 bg-surface-dim/30 p-4 rounded-2xl border border-outline-variant/10">
                <div className="relative group shrink-0">
                  <div className="absolute inset-0 bg-primary/30 blur-md rounded-full"></div>
                  <img 
                    src={avatarUrl} 
                    alt="Moderator avatar placeholder" 
                    referrerPolicy="no-referrer"
                    className="relative w-20 h-20 rounded-full object-cover border-2 border-primary/50 shadow-lg group-hover:brightness-90 transition-all"
                  />
                </div>
                <div className="text-center sm:text-left space-y-2">
                  <p className="text-sm font-bold text-on-surface">Alice Harrison</p>
                  <p className="text-xs text-on-surface-variant">Role: senior_system_auditor</p>
                  <button 
                    type="button"
                    onClick={handleRandomizeAvatar}
                    className="mt-1 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary hover:text-white text-xs font-bold transition-all border border-primary/20"
                  >
                    <RefreshCcw className="w-3.5 h-3.5" />
                    Rotate Profile Avatar
                  </button>
                </div>
              </div>

              {/* Full Name input */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-wider">
                  Full Name
                </label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-surface-container-high border border-outline-variant/30 rounded-xl px-4 py-3 text-xs md:text-sm text-on-surface font-semibold focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-outline-variant/50"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email details input (disabled/readonly) */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-wider">
                  Email Address <span className="text-[10px] text-outline italic font-medium">(Read-only)</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline-variant" />
                  <input 
                    type="email" 
                    value={email}
                    disabled
                    className="w-full bg-surface-dim border border-outline-variant/15 rounded-xl pl-11 pr-4 py-3 text-xs md:text-sm text-on-surface-variant font-semibold cursor-not-allowed outline-none opacity-80"
                  />
                </div>
                <p className="text-[10px] text-outline mt-1.5 font-medium leading-relaxed">
                  Authentication email is linked via IDP and cannot be manually updated here.
                </p>
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-wider">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline-variant" />
                  <input 
                    type="text" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-surface-container-high border border-outline-variant/30 rounded-xl pl-11 pr-4 py-3 text-xs md:text-sm text-on-surface font-semibold focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-outline-variant/50"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section B: Security Configuration */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-fuchsia-500/10 shadow-emerald-500/5 shadow-2xl relative overflow-hidden group">
            <h2 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2.5 border-b border-outline-variant/15 pb-3">
              <Lock className="w-5 h-5 text-primary" />
              Security & Credentials
            </h2>

            <div className="space-y-6">
              {securityErrors && (
                <div className="p-3.5 bg-danger/10 border border-danger/25 text-danger font-semibold text-xs rounded-xl leading-relaxed">
                  ⚠️ {securityErrors}
                </div>
              )}

              {/* Current Password */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-wider">
                  Current Password
                </label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline-variant" />
                  <input 
                    type="password" 
                    value={currentPassword}
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                      if (securityErrors) setSecurityErrors(null);
                    }}
                    className="w-full bg-surface-container-high border border-outline-variant/30 rounded-xl pl-11 pr-4 py-3 text-xs md:text-sm text-on-surface font-semibold focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-outline-variant/50"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-wider">
                  New Password
                </label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (securityErrors) setSecurityErrors(null);
                  }}
                  className="w-full bg-surface-container-high border border-outline-variant/30 rounded-xl px-4 py-3 text-xs md:text-sm text-on-surface font-semibold focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-outline-variant/50"
                  placeholder="At least 6 characters"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-wider">
                  Confirm Password
                </label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (securityErrors) setSecurityErrors(null);
                  }}
                  className="w-full bg-surface-container-high border border-outline-variant/30 rounded-xl px-4 py-3 text-xs md:text-sm text-on-surface font-semibold focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-outline-variant/50"
                  placeholder="Must match newly entered password"
                />
              </div>

              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <p className="text-[11px] text-on-surface-variant font-medium leading-relaxed flex items-start gap-2">
                  <Shield className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  Password strength relies on utilizing a randomized mixture of mixed status characters, metrics, and numerical symbols.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Save Changes CTA */}
        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            disabled={isSaving}
            className="w-full sm:w-auto px-10 py-4 rounded-xl bg-primary hover:bg-fuchsia-400 text-on-primary font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.98] duration-200 cursor-pointer shadow-[0_0_20px_rgba(251,171,255,0.4)] disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin h-5 w-5 text-on-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Deploying Security Keys...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 pointer-events-none text-on-primary stroke-[3px]" />
                Save Changes & Credentials
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
