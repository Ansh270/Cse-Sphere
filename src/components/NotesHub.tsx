import React from 'react';
import { MOCK_NOTES } from '../constants';
import { 
  Plus, 
  Search, 
  FileText, 
  Download, 
  MoreVertical, 
  Upload,
  Book
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from './ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from './ui/dialog';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

export default function NotesHub() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isUploading, setIsUploading] = React.useState(false);

  const filteredNotes = MOCK_NOTES.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      toast.success("Resource uploaded successfully! It's now visible to everyone.");
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lecture Vault</h1>
          <p className="text-muted-foreground text-sm mt-1">Access or contribute to the CSE departmental academic repository.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground font-semibold rounded-xl h-11 px-6 shadow-lg shadow-primary/10 transition-all hover:scale-[1.02] active:scale-[0.98]">
              <Plus size={18} className="mr-2" /> Upload Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <form onSubmit={handleUpload}>
              <DialogHeader>
                <DialogTitle>Share Knowledge</DialogTitle>
                <DialogDescription>
                  Upload high-quality PDFs, research papers, or study summaries.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Document Title</label>
                  <Input placeholder="e.g. Distributed Systems Final Review" className="bg-muted focus-visible:ring-primary" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Abstract</label>
                  <Textarea placeholder="Quick summary of the contents..." className="bg-muted min-h-[100px] focus-visible:ring-primary" />
                </div>
                <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-primary/40 transition-colors cursor-pointer group bg-muted/30">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Upload className="text-primary" size={20} />
                  </div>
                  <p className="text-xs font-medium">Click to select files</p>
                  <p className="text-[9px] text-muted-foreground mt-1 uppercase tracking-widest font-mono">PDF, ZIP, DOCX (MAX 50MB)</p>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isUploading} className="w-full rounded-lg">
                  {isUploading ? "Uploading..." : "Publish to Vault"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input 
          placeholder="Search by topic, year, or keywords..." 
          className="bg-card border-border pl-12 h-12 rounded-xl focus-visible:ring-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <Card key={note.id} className="group flex flex-col overflow-hidden hover:border-primary/50 transition-colors bg-card shadow-sm">
              <CardHeader className="p-6 flex-1 pb-0">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Book className="text-primary" size={20} />
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground h-8 w-8">
                    <MoreVertical size={16} />
                  </Button>
                </div>
                <CardTitle className="text-lg font-bold mb-2 group-hover:text-primary transition-colors leading-tight">{note.title}</CardTitle>
                <CardDescription className="text-muted-foreground text-sm line-clamp-2 mb-6">{note.description}</CardDescription>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {note.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-muted text-muted-foreground border-none font-medium text-[10px] uppercase tracking-wider rounded-md">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              
              <CardFooter className="p-6 pt-0 bg-transparent flex items-center justify-between border-t border-border mt-4">
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary uppercase">
                    {note.authorName[0]}
                  </div>
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{note.authorName}</span>
                </div>
                <Button size="icon" variant="outline" className="mt-4 h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg">
                  <Download size={16} />
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-20 text-center opacity-40">
            <Search className="mx-auto mb-4" size={48} />
            <h3 className="text-xl font-medium">No resources found</h3>
            <p className="text-sm mt-2">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
