import { NoteCard } from "@/components/NoteCard";
import { AddNoteCard } from "@/components/AddNoteCard";
import { useNotes } from "@/hooks/useNotes";
import { StickyNote, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Index = () => {
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <StickyNote className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              내 메모장
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            생각을 기록하고 정리하세요
          </p>
        </div>

        {/* Search Bar */}
        {notes.length > 0 && (
          <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="메모 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card"
              />
            </div>
          </div>
        )}

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="group">
            <AddNoteCard onAdd={addNote} />
          </div>
          
          {filteredNotes.map((note) => (
            <div key={note.id} className="group">
              <NoteCard
                note={note}
                onUpdate={updateNote}
                onDelete={deleteNote}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {notes.length === 0 && (
          <div className="text-center mt-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-center">
              <StickyNote className="w-12 h-12 text-primary/50" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              첫 번째 메모를 작성해보세요!
            </h3>
            <p className="text-muted-foreground">
              위의 카드를 클릭하여 새로운 메모를 시작하세요.
            </p>
          </div>
        )}

        {/* Search Results */}
        {searchQuery && filteredNotes.length === 0 && notes.length > 0 && (
          <div className="text-center mt-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              검색 결과가 없습니다
            </h3>
            <p className="text-muted-foreground">
              "{searchQuery}"와 일치하는 메모를 찾을 수 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
