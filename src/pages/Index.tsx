import { useState, useEffect } from 'react';
import { Globe, Settings, Moon, Sun } from 'lucide-react';
import TopBar from '@/components/CommandCenter/TopBar';
import StatusTab from '@/components/CommandCenter/Tabs/StatusTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState('status');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle('dark', saved === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="mx-auto max-w-[1680px] px-3 py-2">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://www.btgpactual.com/content/dam/pactual-public/logos/btg-logo-blue.svg" 
                alt="BTG Pactual" 
                className="h-7"
              />
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-foreground">Command Center</h1>
                <span className="text-sm text-muted-foreground">& Status Operacional</span>
              </div>
            </div>
            
            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1680px] p-3">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="status">Status Operacional</TabsTrigger>
            <TabsTrigger value="rotinas">Rotinas de Produção</TabsTrigger>
            <TabsTrigger value="comunicacao">Comunicação</TabsTrigger>
            <TabsTrigger value="cockpit">Cockpit Operacional</TabsTrigger>
            <TabsTrigger value="threshold">Threshold Dinâmico</TabsTrigger>
          </TabsList>

          <TabsContent value="status" className="space-y-3">
            <StatusTab />
          </TabsContent>

          <TabsContent value="rotinas">
            <div className="rounded-xl border bg-card p-6">
              <h2 className="text-xl font-bold">Rotinas de Produção</h2>
              <p className="mt-2 text-sm text-muted-foreground">Em desenvolvimento...</p>
            </div>
          </TabsContent>

          <TabsContent value="comunicacao">
            <div className="rounded-xl border bg-card p-6">
              <h2 className="text-xl font-bold">Comunicação via Teams</h2>
              <p className="mt-2 text-sm text-muted-foreground">Em desenvolvimento...</p>
            </div>
          </TabsContent>

          <TabsContent value="cockpit">
            <div className="rounded-xl border bg-card p-6">
              <h2 className="text-xl font-bold">Cockpit Operacional</h2>
              <p className="mt-2 text-sm text-muted-foreground">Em desenvolvimento...</p>
            </div>
          </TabsContent>

          <TabsContent value="threshold">
            <div className="rounded-xl border bg-card p-6">
              <h2 className="text-xl font-bold">Threshold Dinâmico</h2>
              <p className="mt-2 text-sm text-muted-foreground">Em desenvolvimento...</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;