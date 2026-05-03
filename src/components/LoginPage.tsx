import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, googleProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Shield, Sparkles, LayoutDashboard, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignUp && password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Update Firebase Auth profile
        await updateProfile(user, { displayName: name });
        
        // Create Firestore profile
        try {
          const { doc, setDoc } = await import('firebase/firestore');
          const { db } = await import('../lib/firebase');
          
          await setDoc(doc(db, 'users', user.uid), {
            name: name,
            email: email,
            role: 'student'
          });
        } catch (fsError) {
          console.error("Firestore Profile Creation Error:", fsError);
          // We don't block the user if only the profile document fails, but we log it
        }
        
        toast.success("Account created! Welcome to CSE Sphere.");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Welcome back to CSE Sphere!");
      }
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/operation-not-allowed') {
        const projectId = auth.app.options.projectId;
        toast.error(`Sign-in provider not enabled for project "${projectId}". Visit the Firebase Console to enable it.`, {
          duration: 10000,
          action: {
            label: "Open Console",
            onClick: () => window.open(`https://console.firebase.google.com/project/${projectId}/authentication/providers`, '_blank')
          }
        });
      } else if (error.code === 'auth/email-already-in-use') {
        toast.error("An account with this email already exists.");
      } else {
        toast.error(error.message || "Authentication failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Welcome back to CSE Sphere!");
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        // User closed the popup, no need to show an error toast
        return;
      }
      if (error.code === 'auth/operation-not-allowed') {
        toast.error("Google sign-in is disabled. Enable it in Firebase Console -> Authentication.", {
          duration: 6000
        });
      } else {
        console.error(error);
        toast.error("Failed to sign in with Google.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Left side: Branding/Visual */}
      <div className="hidden md:flex flex-1 bg-zinc-950 relative overflow-hidden items-center justify-center p-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 opacity-50" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full" />
        
        <div className="relative z-10 space-y-8 max-w-lg">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/40"
          >
            <Shield size={32} className="text-white" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
              The Hub for <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">CSE Excellence.</span>
            </h1>
            <p className="mt-8 text-zinc-400 text-lg leading-relaxed">
              Join the official departmental platform for notes, discussions, and real-time updates. Your academic portal, redefined.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-6 pt-10"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-zinc-950 bg-zinc-800" />
              ))}
            </div>
            <p className="text-sm text-zinc-500 font-medium tracking-wide">Joined by 1,200+ students</p>
          </motion.div>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-20 relative bg-background">
        <div className="w-full max-w-sm space-y-8">
          <div className="flex flex-col items-start gap-2">
            <h2 className="text-3xl font-bold tracking-tight">
              {isSignUp ? "Create an account" : "Welcome back"}
            </h2>
            <p className="text-muted-foreground text-sm">
              {isSignUp ? "Join the CSE community today." : "Log in to your departmental portal."}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <AnimatePresence mode="wait">
              {isSignUp && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1.5"
                >
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-muted-foreground" size={18} />
                    <Input 
                      required
                      placeholder="John Doe" 
                      className="pl-10 h-12 rounded-xl bg-muted/30" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <Input 
                  required
                  type="email" 
                  placeholder="name@university.edu" 
                  className="pl-10 h-12 rounded-xl bg-muted/30" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
                {!isSignUp && <span className="text-[10px] font-bold text-primary cursor-pointer hover:underline">Forgot?</span>}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <Input 
                  required
                  type="password" 
                  minLength={6}
                  placeholder="••••••••" 
                  className="pl-10 h-12 rounded-xl bg-muted/30" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 rounded-xl font-bold gap-2 group shadow-lg shadow-primary/20"
            >
              {loading ? "Processing..." : (isSignUp ? "Sign Up" : "Sign In")}
              {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </Button>
          </form>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-muted-foreground font-bold tracking-widest text-[10px]">Or continue with</span>
            </div>
          </div>

          <Button 
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full h-12 rounded-xl font-bold bg-muted/20 border-border/10 hover:bg-muted/40 gap-3"
          >
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
            Google Academy
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <span 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary font-bold cursor-pointer hover:underline transition-all"
            >
              {isSignUp ? "Log In" : "Register Now"}
            </span>
          </p>
        </div>
        
        <div className="absolute bottom-8 text-[10px] font-bold text-muted-foreground/30 uppercase tracking-[0.2em] hidden md:block">
          © 2024 Department of Computer Science & Engineering
        </div>
      </div>
    </div>
  );
}
