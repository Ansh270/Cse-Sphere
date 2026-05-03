import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Newspaper, 
  Menu,
  X,
  Sun,
  Moon,
  ExternalLink,
  ChevronRight,
  Monitor,
  LogOut
} from 'lucide-react';
import { AppSection } from '../types';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { useAuth } from '../FirebaseProvider';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'sonner';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: AppSection;
  onSectionChange: (section: AppSection) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function Layout({ 
  children, 
  activeSection, 
  onSectionChange, 
  theme, 
  toggleTheme 
}: LayoutProps) {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'notes', label: 'Notes Hub', icon: FileText },
    { id: 'discussions', label: 'Forums', icon: MessageSquare },
    { id: 'news', label: 'CSE News', icon: Newspaper },
  ];

  const usefulLinks = [
    { label: 'Department ERP', url: '#' },
    { label: 'Academic Calendar', url: '#' },
    { label: 'Library Portal', url: '#' },
  ];

  const NavContent = () => (
    <>
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">C</div>
        {(isSidebarOpen || isMobileMenuOpen) && (
          <span className="font-bold text-lg tracking-tight">CSE Sphere</span>
        )}
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Main Navigation</p>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onSectionChange(item.id as AppSection);
              setIsMobileMenuOpen(false);
            }}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium",
              activeSection === item.id 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <item.icon size={18} />
            {(isSidebarOpen || isMobileMenuOpen) && <span>{item.label}</span>}
          </button>
        ))}

        <div className="pt-8 space-y-1">
          <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">External Links</p>
          {usefulLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              <div className="flex items-center gap-3">
                <ExternalLink size={16} />
                {(isSidebarOpen || isMobileMenuOpen) && <span>{link.label}</span>}
              </div>
              {(isSidebarOpen || isMobileMenuOpen) && <ChevronRight size={14} className="opacity-40" />}
            </a>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-border mt-auto space-y-2">
        {/* User Profile Section */}
        {user && (
          <div className={cn(
            "flex items-center gap-3 px-2 py-3 rounded-xl mb-2",
            isSidebarOpen || isMobileMenuOpen ? "bg-muted/50" : ""
          )}>
            <div className="w-8 h-8 rounded-full border-2 border-primary/20 overflow-hidden flex-shrink-0">
              <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} alt="avatar" className="w-full h-full object-cover" />
            </div>
            {(isSidebarOpen || isMobileMenuOpen) && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate leading-none">{user.displayName}</p>
                <p className="text-[10px] text-muted-foreground truncate mt-1">Student</p>
              </div>
            )}
            {(isSidebarOpen || isMobileMenuOpen) && (
              <button 
                onClick={handleLogout}
                className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-destructive/10"
              >
                <LogOut size={14} />
              </button>
            )}
          </div>
        )}

        <Button 
          variant="outline" 
          className="w-full justify-start gap-3 h-10 border-border bg-transparent text-muted-foreground hover:text-foreground"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          {(isSidebarOpen || isMobileMenuOpen) && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </Button>
        <div className="hidden lg:block">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full justify-start gap-3 text-muted-foreground"
          >
            <Monitor size={18} />
            {isSidebarOpen && <span>Collapse</span>}
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <div className={cn("min-h-screen bg-background text-foreground flex font-sans overflow-hidden", theme)}>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col border-r border-border bg-card/50 backdrop-blur-xl transition-all duration-300 relative z-40",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <NavContent />
      </aside>

      {/* Mobile Top Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-border bg-background/80 backdrop-blur-md z-40 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">C</div>
          <span className="font-bold text-base tracking-tight">CSE Sphere</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu size={24} />
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-background border-r border-border z-50 flex flex-col lg:hidden"
            >
              <NavContent />
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground"
              >
                <X size={24} />
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative h-screen overflow-hidden">
        {/* Content Viewport */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pt-16 lg:pt-0">
          <div className="max-w-7xl mx-auto p-4 md:p-10">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
