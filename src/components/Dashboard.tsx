import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from './ui/card';
import { MOCK_NEWS, MOCK_NOTES } from '../constants';
import { 
  FileText, 
  MessageSquare, 
  Download, 
  ArrowUpRight, 
  Users, 
  Link as LinkIcon,
  ChevronRight,
  BookOpen,
  Calendar,
  ShieldCheck,
  TrendingUp,
  Clock,
  Bell
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';

export default function Dashboard() {
  const batches = [
    { name: 'Batch A', students: 64, room: '402-A', color: 'bg-blue-500' },
    { name: 'Batch B', students: 62, room: '402-B', color: 'bg-indigo-500' },
    { name: 'Batch C', students: 65, room: '403-A', color: 'bg-purple-500' },
  ];

  const quicklinks = [
    { title: 'Academic ERP', desc: 'Attendance & Grades', icon: ShieldCheck, url: '#' },
    { title: 'LMS Portal', desc: 'Course Materials', icon: BookOpen, url: '#' },
    { title: 'Exam Cell', desc: 'Schedules & Results', icon: Calendar, url: '#' },
    { title: 'Internal Links', desc: 'Dept Resources', icon: LinkIcon, url: '#' },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
            Departmental Hub
          </h1>
          <p className="text-muted-foreground text-lg">Welcome back, Alex. CSE is thriving today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="px-4 py-1.5 rounded-full bg-muted/50 border-border/50 backdrop-blur-md">
            Summer '24
          </Badge>
          <div className="h-8 w-[1px] bg-border mx-2 hidden md:block" />
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-muted-foreground">Live Updates</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-start">
        
        {/* Left Column: Stats & Batches */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Hero Highlight */}
          <div className="relative group overflow-hidden rounded-[2.5rem] bg-zinc-950 p-10 shadow-2xl transition-all duration-500 hover:shadow-primary/20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity" />
            <div className="absolute -right-20 -top-20 h-64 w-64 bg-primary/20 blur-[100px] transition-transform duration-700 group-hover:scale-125" />
            
            <div className="relative z-10 grid gap-8 md:grid-cols-2 items-center">
              <div>
                <Badge className="mb-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 font-bold tracking-wider text-[10px] uppercase">
                  COMMUNITY IMPACT
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.1] mb-4">
                  Contribute. <br />Collaborate. <br />Excel.
                </h2>
                <p className="text-zinc-400 text-base leading-relaxed mb-8 max-w-sm">
                  The Lecture Vault is now accepting submissions for Semester 6. Share your resources and climb the leaderboard.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="rounded-full bg-white text-black hover:bg-zinc-200 px-8 h-12 text-sm font-bold shadow-lg">
                    Upload Now
                  </Button>
                  <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10 px-8 h-12 text-sm font-bold backdrop-blur-sm">
                    View Impact
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Resources', value: '1,284', icon: FileText, color: 'text-blue-400' },
                  { label: 'Discussions', value: '412', icon: MessageSquare, color: 'text-emerald-400' },
                  { label: 'Active Users', value: '1.2k', icon: Users, color: 'text-purple-400' },
                  { label: 'Downloads', value: '5k+', icon: Download, color: 'text-orange-400' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 transition-all hover:bg-white/10">
                    <stat.icon className={cn("mb-3", stat.color)} size={20} />
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section: Batches */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-bold tracking-tight">Active Batches</h3>
              <Button variant="ghost" className="text-muted-foreground hover:text-primary gap-2 h-8">
                Manage All <ChevronRight size={14} />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {batches.map((batch) => (
                <Card key={batch.name} className="relative group overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:shadow-xl hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <div className={cn("absolute top-0 right-0 w-24 h-24 blur-[40px] -mr-8 -mt-8 opacity-20", batch.color)} />
                    <div className={cn("w-12 h-1.5 rounded-full mb-4", batch.color)} />
                    <CardTitle className="text-xl font-bold">{batch.name}</CardTitle>
                    <CardDescription>B.Tech CSE - Semester 6</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm font-medium">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Users size={14} /> {batch.students} Students
                      </span>
                      <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded-md">{batch.room}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Section: Useful Links */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-bold tracking-tight">Academic Ecosystem</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quicklinks.map((link) => (
                <a key={link.title} href={link.url} className="group p-5 rounded-3xl border border-border/60 hover:border-primary/40 hover:bg-muted/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3.5 rounded-2xl bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <link.icon size={22} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-bold group-hover:text-primary transition-colors">{link.title}</h4>
                      <p className="text-xs text-muted-foreground">{link.desc}</p>
                    </div>
                    <ArrowUpRight size={18} className="text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: News & Feed */}
        <div className="lg:col-span-4">
          <div className="sticky top-10 space-y-8">
            <Card className="bg-muted/10 border-border/80 rounded-[2rem] overflow-hidden flex flex-col">
              <CardHeader className="pb-4 border-b border-border/50">
                 <div className="flex items-center justify-between">
                  <Badge variant="outline" className="flex items-center gap-2 rounded-full font-bold text-[10px] tracking-widest uppercase border-primary/20 text-primary">
                    <TrendingUp size={12} /> Live Bulletin
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <Bell size={16} />
                  </Button>
                 </div>
              </CardHeader>
              <div className="flex-1 p-6 space-y-8 max-h-[500px] overflow-y-auto custom-scrollbar">
                {MOCK_NEWS.map((item, i) => (
                  <div key={item.id} className="relative pl-6 group/item cursor-pointer">
                    {i !== MOCK_NEWS.length - 1 && (
                      <div className="absolute top-2 left-[3px] bottom-[-24px] w-[1px] bg-border group-hover/item:bg-primary/30 transition-colors" />
                    )}
                    <div className="absolute top-1.5 left-0 w-[7px] h-[7px] rounded-full bg-border group-hover/item:bg-primary transition-colors" />
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                        <Clock size={10} /> {item.date}
                      </div>
                      <h4 className="text-sm font-bold leading-snug group-hover/item:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground/80 leading-relaxed line-clamp-2">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <CardFooter className="pt-2">
                <Button variant="secondary" className="w-full rounded-2xl h-11 text-xs font-bold uppercase tracking-widest">
                  Full Academic Feed
                </Button>
              </CardFooter>
            </Card>
  
            <Card className="bg-zinc-900 dark:bg-zinc-950 p-8 rounded-[2rem] text-white shadow-xl shadow-primary/20 border-none">
               <Calendar className="mb-4 opacity-50 text-white" size={32} />
               <h4 className="text-xl font-bold mb-2 text-white">Upcoming Exams</h4>
               <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                 The mid-semester practicals begin on April 15. Check your batch schedule.
               </p>
               <Button className="w-full bg-white text-zinc-950 hover:bg-zinc-100 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg border-none">
                 View Schedule
               </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
