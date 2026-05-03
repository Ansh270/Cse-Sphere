import React from 'react';
import { Toaster } from './components/ui/sonner';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import NotesHub from './components/NotesHub';
import Forum from './components/Forum';
import NewsFeed from './components/NewsFeed';
import LoginPage from './components/LoginPage';
import { FirebaseProvider, useAuth } from './FirebaseProvider';
import { AppSection } from './types';

function AppContent() {
  const { user, loading } = useAuth();
  const [activeSection, setActiveSection] = React.useState<AppSection>('home');
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  if (loading) return null;
  if (!user) return <LoginPage />;

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Dashboard />;
      case 'notes':
        return <NotesHub />;
      case 'discussions':
        return <Forum />;
      case 'news':
        return <NewsFeed />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Layout 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        theme={theme}
        toggleTheme={toggleTheme}
      >
        {renderSection()}
      </Layout>
      <Toaster position="bottom-right" richColors theme={theme} />
    </>
  );
}

export default function App() {
  return (
    <FirebaseProvider>
      <AppContent />
    </FirebaseProvider>
  );
}
