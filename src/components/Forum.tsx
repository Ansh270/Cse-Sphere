import React from 'react';
import { MOCK_DISCUSSIONS } from '../constants';
import { 
  Plus, 
  Search, 
  MessageSquare, 
  ThumbsUp, 
  MessageCircle, 
  TrendingUp,
  Tag
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Card,
  CardContent,
  CardHeader,
} from './ui/card';
import { Separator } from './ui/separator';

export default function Forum() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campus Discussions</h1>
          <p className="text-muted-foreground text-sm mt-1">Join the conversation with CSE students. Resolve doubts and share ideas.</p>
        </div>
        <Button className="bg-primary text-primary-foreground font-semibold rounded-xl h-11 px-6 shadow-lg shadow-primary/10 transition-all hover:scale-[1.02] active:scale-[0.98]">
          <Plus size={18} className="mr-2" /> Start Discussion
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input placeholder="Search threads or topics..." className="bg-card border-border pl-12 h-12 rounded-xl focus-visible:ring-primary" />
          </div>

          <div className="space-y-4">
            {MOCK_DISCUSSIONS.map((thread) => (
              <Card key={thread.id} className="cursor-pointer group hover:border-primary/40 transition-all bg-card shadow-sm">
                <CardHeader className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {thread.authorName[0]}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">{thread.authorName}</span>
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{thread.createdAt}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[9px] uppercase tracking-wider h-6 border-muted-foreground/20 text-muted-foreground">General</Badge>
                  </div>
                  <h2 className="text-lg font-bold group-hover:text-primary transition-colors mb-2 leading-tight">
                    {thread.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-6 leading-relaxed">
                    {thread.content}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {thread.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-muted text-muted-foreground border-none px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest rounded-md">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <Separator className="bg-border/50" />
                <CardContent className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-muted-foreground group/icon hover:text-primary transition-colors">
                      <ThumbsUp size={16} />
                      <span className="text-xs font-bold">{thread.likes}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground group/icon hover:text-primary transition-colors">
                      <MessageCircle size={16} />
                      <span className="text-xs font-bold">{thread.replies.length} REPLIES</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="bg-card border-border rounded-xl shadow-sm">
            <CardHeader className="p-5 pb-0 border-b border-border pb-4 flex flex-row items-center gap-2">
              <TrendingUp size={16} className="text-primary" />
              <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Trending Topics</h3>
            </CardHeader>
            <div className="p-5 space-y-4">
              {['#Gate2024', '#PlacementPrep', '#RustLang', '#Web3', '#AIEthics'].map((topic, i) => (
                <div key={topic} className="flex items-center justify-between group cursor-pointer hover:bg-muted p-2 rounded-lg transition-colors">
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">{topic}</span>
                  <span className="text-[9px] text-muted-foreground/60 font-bold tracking-widest uppercase">{(150 - i * 20)} posts</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-primary/5 border-primary/10 border p-6 text-center rounded-xl">
             <Tag size={24} className="mx-auto text-primary mb-3 opacity-40" />
             <h4 className="text-sm font-bold mb-1">Weekly AMA</h4>
             <p className="text-[11px] text-muted-foreground px-2">Join elective discussions this Friday with Faculty leads.</p>
             <Button variant="link" className="mt-2 p-0 h-auto text-xs font-bold text-primary">Details</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
