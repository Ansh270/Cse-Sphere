import React from 'react';
import { MOCK_NEWS } from '../constants';
import { 
  Calendar, 
  ArrowRight,
  Send,
  Bell,
  Clock
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

export default function NewsFeed() {
  return (
    <div className="space-y-10 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">The ByteBound Bulletin</h1>
        <p className="text-muted-foreground text-sm mt-1">Official announcements, upcoming academic events, and departmental highlights.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {MOCK_NEWS.map((item) => (
          <Card key={item.id} className="overflow-hidden group flex flex-col md:flex-row bg-card border-border hover:border-primary/30 transition-all shadow-sm">
            <div className="md:w-2/5 relative overflow-hidden">
              <img 
                src={item.imageUrl} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                 <span className="text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                   <Clock size={12} /> Read Full article
                 </span>
              </div>
            </div>
            <div className="md:w-3/5 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-1.5"><Calendar size={12} className="text-primary" /> {item.date}</span>
                  <Badge variant="outline" className="text-[9px] h-5 border-primary/20 text-primary">{item.category}</Badge>
                </div>
                <h2 className="text-lg font-bold mb-3 leading-snug group-hover:text-primary transition-colors">
                  {item.title}
                </h2>
                <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mb-6">
                  {item.content}
                </p>
              </div>
              <Button variant="ghost" className="p-0 h-auto self-start text-primary font-bold uppercase text-[10px] tracking-widest hover:bg-transparent group/btn">
                LEARN MORE <ArrowRight size={14} className="ml-2 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 p-12 rounded-3xl border border-dashed border-border bg-muted/30 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
          <Bell size={28} />
        </div>
        <h3 className="text-2xl font-bold mb-2">Contribute to the Bulletin</h3>
        <p className="text-muted-foreground max-w-sm mx-auto mb-8 text-sm">Submit your workshop proposals, research breakthroughs, or event notifications for inclusion.</p>
        <Button className="bg-primary text-primary-foreground rounded-full px-8 h-12 font-bold tracking-widest text-[10px] uppercase shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
          <Send size={16} className="mr-2" /> Submit Announcement
        </Button>
      </div>
    </div>
  );
}
