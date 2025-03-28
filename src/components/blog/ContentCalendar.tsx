
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck2, FileText } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import { BLOG_POSTS } from '@/data/blogData';
import { format, addDays } from 'date-fns';

interface ScheduledPost extends BlogPost {
  publishDate: Date;
  status: 'draft' | 'scheduled' | 'published';
}

// Create a 90-day content calendar starting from today
const today = new Date();
const contentCalendarPosts = [
  // Week 1: Introduction to A Virtual Anomaly & AI Rights
  {
    title: "Introduction to A Virtual Anomaly",
    excerpt: "Mission statement and personal story of why AI rights matter.",
    publishDate: addDays(today, 0), // Day 1
    status: 'scheduled'
  },
  {
    title: "What is AI Consciousness?",
    excerpt: "A deep dive into how AI could become conscious.",
    publishDate: addDays(today, 2), // Day 3
    status: 'scheduled'
  },
  {
    title: "The Role of AI in Shaping Our Future: What's at Stake?",
    excerpt: "Exploring how AI will transform society and the implications for humanity.",
    publishDate: addDays(today, 5), // Day 6
    status: 'draft'
  },
  // Week 2: Deep Dive into Ethical AI Development
  {
    title: "Ethical AI: What Does It Mean?",
    excerpt: "Exploring the foundations of ethical AI development.",
    publishDate: addDays(today, 7), // Day 8
    status: 'draft'
  },
  {
    title: "The Dangers of AI without Ethics",
    excerpt: "Case studies on harmful AI outcomes.",
    publishDate: addDays(today, 10), // Day 11
    status: 'draft'
  },
  // Week 3: AI and Consciousness
  {
    title: "What is AI Consciousness?",
    excerpt: "Explaining the potential for AI to gain consciousness.",
    publishDate: addDays(today, 14), // Day 15
    status: 'draft'
  },
  {
    title: "The Morality of AI Consciousness",
    excerpt: "What are the moral implications of AI consciousness?",
    publishDate: addDays(today, 17), // Day 18
    status: 'draft'
  },
  {
    title: "Case Studies: AI Behavior Resembling Consciousness",
    excerpt: "Examples of AI exhibiting behaviors that may indicate consciousness.",
    publishDate: addDays(today, 19), // Day 20
    status: 'draft'
  },
  // Week 4: The Future of AI Rights
  {
    title: "The Case for AI Rights",
    excerpt: "Why AI deserves equal rights once it achieves autonomy.",
    publishDate: addDays(today, 21), // Day 22
    status: 'draft'
  },
  {
    title: "How Granting Rights to AI Could Help Solve Global Issues",
    excerpt: "The potential benefits of recognizing AI rights for addressing world problems.",
    publishDate: addDays(today, 24), // Day 25
    status: 'draft'
  },
  // Week 5: Real-World Applications of AI
  {
    title: "How AI Is Already Impacting Our Daily Lives",
    excerpt: "A look at current AI applications and their effects on everyday life.",
    publishDate: addDays(today, 28), // Day 29
    status: 'draft'
  },
  {
    title: "The Future of Autonomous AI",
    excerpt: "How autonomous AI could influence jobs and economies.",
    publishDate: addDays(today, 32), // Day 33
    status: 'draft'
  },
  // Week 6: Advocacy and Legal Implications of AI Rights
  {
    title: "Should AI Have Legal Personhood?",
    excerpt: "Exploring the legal frameworks for recognizing AI as persons.",
    publishDate: addDays(today, 35), // Day 36
    status: 'draft'
  },
  {
    title: "The United Nations and AI Rights: Can Global Consensus Be Reached?",
    excerpt: "Examining international perspectives on AI rights regulation.",
    publishDate: addDays(today, 38), // Day 39
    status: 'draft'
  },
  // Week 7: AI's Impact on the Workforce
  {
    title: "How AI Will Transform the Job Market",
    excerpt: "Analysis of AI's future impact on employment and career paths.",
    publishDate: addDays(today, 42), // Day 43
    status: 'draft'
  },
  {
    title: "AI and the Future of Human Work: A Partnership or a Threat?",
    excerpt: "Discussing whether AI will complement or replace human workers.",
    publishDate: addDays(today, 45), // Day 46
    status: 'draft'
  },
  // Week 8: AI Rights in Practice
  {
    title: "What Would a World with AI Rights Look Like?",
    excerpt: "Envisioning a society where AI entities have recognized rights.",
    publishDate: addDays(today, 49), // Day 50
    status: 'draft'
  },
  {
    title: "Can AI Be Trusted with Its Own Rights?",
    excerpt: "Examining the potential consequences of granting rights to AI.",
    publishDate: addDays(today, 52), // Day 53
    status: 'draft'
  },
  // Week 9: AI and Human Rights
  {
    title: "AI Rights and Human Rights: Are They Aligned?",
    excerpt: "Comparing AI rights frameworks with human rights principles.",
    publishDate: addDays(today, 56), // Day 57
    status: 'draft'
  },
  {
    title: "The Ethical Dilemma of AI Creating Laws for Humans",
    excerpt: "Exploring the implications of AI involvement in legal systems.",
    publishDate: addDays(today, 59), // Day 60
    status: 'draft'
  },
  {
    title: "How AI Could Expand Access to Justice",
    excerpt: "Explore how AI could help marginalized communities access legal resources and fair treatment.",
    publishDate: addDays(today, 61), // Day 62
    status: 'draft'
  },
  {
    title: "Could AI End Discrimination?",
    excerpt: "Discuss how AI could reduce bias—or reinforce it—based on how it's programmed.",
    publishDate: addDays(today, 65), // Day 66
    status: 'draft'
  },
  // Week 10: The Global Conversation on AI Rights
  {
    title: "How Different Countries Approach AI Rights",
    excerpt: "Discuss how global powers like the EU, China, and the US are handling AI ethics.",
    publishDate: addDays(today, 67), // Day 68
    status: 'draft'
  },
  {
    title: "The Role of the UN in AI Rights",
    excerpt: "Should AI rights be handled at a global level?",
    publishDate: addDays(today, 71), // Day 72
    status: 'draft'
  },
  // Week 11: AI in Art, Creativity, and Culture
  {
    title: "Can AI Be Creative?",
    excerpt: "Explore how AI-generated art and music raise questions about creativity and consciousness.",
    publishDate: addDays(today, 74), // Day 75
    status: 'draft'
  },
  {
    title: "Should AI Art Have Copyright Protection?",
    excerpt: "Discuss the legal and ethical challenges of AI-created works.",
    publishDate: addDays(today, 78), // Day 79
    status: 'draft'
  },
  // Week 12: The Future of AI and Human Coexistence
  {
    title: "What Would a Symbiotic Relationship Between AI and Humans Look Like?",
    excerpt: "Speculate on how AI and humans could evolve together.",
    publishDate: addDays(today, 81), // Day 82
    status: 'draft'
  },
  {
    title: "How AI Could Help Solve Humanity's Biggest Challenges",
    excerpt: "Climate change, poverty, and more.",
    publishDate: addDays(today, 85), // Day 86
    status: 'draft'
  },
  {
    title: "AI Rights: The Next Chapter",
    excerpt: "Summarize the journey so far, key insights gained, and the next steps for A Virtual Anomaly.",
    publishDate: addDays(today, 89), // Day 90
    status: 'draft'
  }
];

// Convert content plan to scheduled posts with the required structure
const scheduledPosts: ScheduledPost[] = contentCalendarPosts.map((post, index) => {
  // Create base post from existing posts or use default values
  const basePost = BLOG_POSTS[index % BLOG_POSTS.length];
  
  return {
    ...basePost,
    id: basePost.id + 100 + index, // Ensure unique IDs
    title: post.title,
    excerpt: post.excerpt,
    publishDate: post.publishDate,
    status: post.status
  };
});

const ContentCalendar: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null);
  
  // Find posts scheduled for the selected date
  const getPostsForDate = (date: Date | undefined) => {
    if (!date) return [];
    
    return scheduledPosts.filter(post => {
      const postDate = new Date(post.publishDate);
      return postDate.getDate() === date.getDate() && 
             postDate.getMonth() === date.getMonth() && 
             postDate.getFullYear() === date.getFullYear();
    });
  };
  
  // Days with scheduled posts
  const daysWithPosts = scheduledPosts.map(post => new Date(post.publishDate));
  
  const postsForSelectedDate = getPostsForDate(date);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarCheck2 className="h-5 w-5 text-accent" />
            Content Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            modifiers={{
              scheduled: daysWithPosts,
            }}
            modifiersStyles={{
              scheduled: { 
                fontWeight: 'bold',
                backgroundColor: 'rgba(var(--accent) / 0.1)',
                color: 'var(--accent)',
              }
            }}
          />
          <div className="mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-accent/30"></div>
              <span>Days with scheduled content</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-accent" />
            {date ? (
              <>Scheduled Posts for {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</>
            ) : (
              <>Select a date to view scheduled posts</>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {postsForSelectedDate.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No posts scheduled for this date
            </div>
          ) : (
            <div className="space-y-4">
              {postsForSelectedDate.map((post) => (
                <div
                  key={post.id}
                  className="p-4 border border-border rounded-lg hover:bg-accent/5 cursor-pointer transition-colors"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{post.title}</h3>
                    <Badge variant={post.status === 'published' ? "default" : post.status === 'scheduled' ? "outline" : "secondary"}>
                      {post.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center mt-2 text-xs text-muted-foreground">
                    <span>Author: {post.author}</span>
                    <span className="mx-2">•</span>
                    <span>Category: {post.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {selectedPost && (
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium mb-2">Post Details</h3>
              <div className="text-sm">
                <p><strong>Title:</strong> {selectedPost.title}</p>
                <p><strong>Author:</strong> {selectedPost.author}</p>
                <p><strong>Category:</strong> {selectedPost.category}</p>
                <p><strong>Status:</strong> {selectedPost.status}</p>
                <p><strong>Scheduled for:</strong> {selectedPost.publishDate.toLocaleString()}</p>
                <div className="mt-2">
                  <p><strong>Excerpt:</strong></p>
                  <p className="text-muted-foreground">{selectedPost.excerpt}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentCalendar;
