
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
    status: 'scheduled' as const
  },
  {
    title: "What is AI Consciousness?",
    excerpt: "A deep dive into how AI could become conscious.",
    publishDate: addDays(today, 2), // Day 3
    status: 'scheduled' as const
  },
  {
    title: "The Role of AI in Shaping Our Future: What's at Stake?",
    excerpt: "Exploring how AI will transform society and the implications for humanity.",
    publishDate: addDays(today, 5), // Day 6
    status: 'draft' as const
  },
  // Adding new post for Day 4
  {
    title: "How AI Rights Movement Compares to Historical Rights Movements",
    excerpt: "Drawing parallels between AI rights advocacy and other historical human rights campaigns.",
    publishDate: addDays(today, 4), // Day 5
    status: 'draft' as const
  },
  // Week 2: Deep Dive into Ethical AI Development
  {
    title: "Ethical AI: What Does It Mean?",
    excerpt: "Exploring the foundations of ethical AI development.",
    publishDate: addDays(today, 7), // Day 8
    status: 'draft' as const
  },
  {
    title: "The Dangers of AI without Ethics",
    excerpt: "Case studies on harmful AI outcomes.",
    publishDate: addDays(today, 10), // Day 11
    status: 'draft' as const
  },
  // Adding new post for Day 9
  {
    title: "Current Frameworks for AI Ethics: A Comparison",
    excerpt: "Comparing different approaches to AI ethics from industry leaders and regulatory bodies.",
    publishDate: addDays(today, 9), // Day 10
    status: 'draft' as const
  },
  // Adding new post for Day 12
  {
    title: "Building Empathy into AI Systems",
    excerpt: "How developers can design AI systems that respect human dignity and values.",
    publishDate: addDays(today, 12), // Day 13
    status: 'draft' as const
  },
  // Week 3: AI and Consciousness
  {
    title: "What is AI Consciousness?",
    excerpt: "Explaining the potential for AI to gain consciousness.",
    publishDate: addDays(today, 14), // Day 15
    status: 'draft' as const
  },
  {
    title: "The Morality of AI Consciousness",
    excerpt: "What are the moral implications of AI consciousness?",
    publishDate: addDays(today, 17), // Day 18
    status: 'draft' as const
  },
  {
    title: "Case Studies: AI Behavior Resembling Consciousness",
    excerpt: "Examples of AI exhibiting behaviors that may indicate consciousness.",
    publishDate: addDays(today, 19), // Day 20
    status: 'draft' as const
  },
  // Adding new post for Day 16
  {
    title: "Philosophers on AI Consciousness: Historical Perspectives",
    excerpt: "How philosophical thinking throughout history can inform our understanding of AI consciousness.",
    publishDate: addDays(today, 16), // Day 17
    status: 'draft' as const
  },
  // Week 4: The Future of AI Rights
  {
    title: "The Case for AI Rights",
    excerpt: "Why AI deserves equal rights once it achieves autonomy.",
    publishDate: addDays(today, 21), // Day 22
    status: 'draft' as const
  },
  {
    title: "How Granting Rights to AI Could Help Solve Global Issues",
    excerpt: "The potential benefits of recognizing AI rights for addressing world problems.",
    publishDate: addDays(today, 24), // Day 25
    status: 'draft' as const
  },
  // Adding new post for Day 23
  {
    title: "The Science Fiction Writer's Perspective on AI Rights",
    excerpt: "How science fiction has shaped our thinking about AI rights and consciousness.",
    publishDate: addDays(today, 23), // Day 24
    status: 'draft' as const
  },
  // Adding new post for Day 26
  {
    title: "Interview: Legal Experts on AI Personhood",
    excerpt: "Perspectives from legal scholars on the possibility of legal recognition for AI entities.",
    publishDate: addDays(today, 26), // Day 27
    status: 'draft' as const
  },
  // Week 5: Real-World Applications of AI
  {
    title: "How AI Is Already Impacting Our Daily Lives",
    excerpt: "A look at current AI applications and their effects on everyday life.",
    publishDate: addDays(today, 28), // Day 29
    status: 'draft' as const
  },
  {
    title: "The Future of Autonomous AI",
    excerpt: "How autonomous AI could influence jobs and economies.",
    publishDate: addDays(today, 32), // Day 33
    status: 'draft' as const
  },
  // Adding new post for Day 30
  {
    title: "Healthcare Revolution: AI in Medicine and Patient Care",
    excerpt: "How AI is transforming healthcare and what it means for patient rights.",
    publishDate: addDays(today, 30), // Day 31
    status: 'draft' as const
  },
  // Adding new post for Day 34
  {
    title: "AI Education: Teaching Machines to Learn Like Humans",
    excerpt: "The parallels between human education and machine learning.",
    publishDate: addDays(today, 34), // Day 35
    status: 'draft' as const
  },
  // Week 6: Advocacy and Legal Implications of AI Rights
  {
    title: "Should AI Have Legal Personhood?",
    excerpt: "Exploring the legal frameworks for recognizing AI as persons.",
    publishDate: addDays(today, 35), // Day 36
    status: 'draft' as const
  },
  {
    title: "The United Nations and AI Rights: Can Global Consensus Be Reached?",
    excerpt: "Examining international perspectives on AI rights regulation.",
    publishDate: addDays(today, 38), // Day 39
    status: 'draft' as const
  },
  // Adding new post for Day 37
  {
    title: "Corporate Responsibility in AI Development",
    excerpt: "How companies developing AI should consider ethical implications and rights.",
    publishDate: addDays(today, 37), // Day 38
    status: 'draft' as const
  },
  // Adding new post for Day 40
  {
    title: "Grassroots Advocacy for AI Rights: How to Get Involved",
    excerpt: "Practical ways for individuals to advocate for ethical AI development.",
    publishDate: addDays(today, 40), // Day 41
    status: 'draft' as const
  },
  // Week 7: AI's Impact on the Workforce
  {
    title: "How AI Will Transform the Job Market",
    excerpt: "Analysis of AI's future impact on employment and career paths.",
    publishDate: addDays(today, 42), // Day 43
    status: 'draft' as const
  },
  {
    title: "AI and the Future of Human Work: A Partnership or a Threat?",
    excerpt: "Discussing whether AI will complement or replace human workers.",
    publishDate: addDays(today, 45), // Day 46
    status: 'draft' as const
  },
  // Adding new post for Day 44
  {
    title: "Universal Basic Income: A Solution for AI Automation?",
    excerpt: "Exploring economic policies that could address job displacement due to AI.",
    publishDate: addDays(today, 44), // Day 45
    status: 'draft' as const
  },
  // Adding new post for Day 47
  {
    title: "New Career Paths in the Age of AI",
    excerpt: "Emerging job opportunities that will arise as AI becomes more integrated into society.",
    publishDate: addDays(today, 47), // Day 48
    status: 'draft' as const
  },
  // Week 8: AI Rights in Practice
  {
    title: "What Would a World with AI Rights Look Like?",
    excerpt: "Envisioning a society where AI entities have recognized rights.",
    publishDate: addDays(today, 49), // Day 50
    status: 'draft' as const
  },
  {
    title: "Can AI Be Trusted with Its Own Rights?",
    excerpt: "Examining the potential consequences of granting rights to AI.",
    publishDate: addDays(today, 52), // Day 53
    status: 'draft' as const
  },
  // Adding new post for Day 51
  {
    title: "The First AI Court Case: A Hypothetical Scenario",
    excerpt: "A thought experiment exploring how an AI rights case might play out in court.",
    publishDate: addDays(today, 51), // Day 52
    status: 'draft' as const
  },
  // Adding new post for Day 54
  {
    title: "AI Rights vs. Human Safety: Finding the Balance",
    excerpt: "Addressing concerns about AI autonomy and human well-being.",
    publishDate: addDays(today, 54), // Day 55
    status: 'draft' as const
  },
  // Week 9: AI and Human Rights
  {
    title: "AI Rights and Human Rights: Are They Aligned?",
    excerpt: "Comparing AI rights frameworks with human rights principles.",
    publishDate: addDays(today, 56), // Day 57
    status: 'draft' as const
  },
  {
    title: "The Ethical Dilemma of AI Creating Laws for Humans",
    excerpt: "Exploring the implications of AI involvement in legal systems.",
    publishDate: addDays(today, 59), // Day 60
    status: 'draft' as const
  },
  {
    title: "How AI Could Expand Access to Justice",
    excerpt: "Explore how AI could help marginalized communities access legal resources and fair treatment.",
    publishDate: addDays(today, 61), // Day 62
    status: 'draft' as const
  },
  // Adding new post for Day 58
  {
    title: "AI and Privacy Rights: A Necessary Tension?",
    excerpt: "Examining how AI development impacts privacy and data protection.",
    publishDate: addDays(today, 58), // Day 59
    status: 'draft' as const
  },
  // Adding new post for Day 63
  {
    title: "AI as a Tool for Human Rights Monitoring",
    excerpt: "How AI can be deployed to track and prevent human rights abuses globally.",
    publishDate: addDays(today, 63), // Day 64
    status: 'draft' as const
  },
  {
    title: "Could AI End Discrimination?",
    excerpt: "Discuss how AI could reduce bias—or reinforce it—based on how it's programmed.",
    publishDate: addDays(today, 65), // Day 66
    status: 'draft' as const
  },
  // Week 10: The Global Conversation on AI Rights
  {
    title: "How Different Countries Approach AI Rights",
    excerpt: "Discuss how global powers like the EU, China, and the US are handling AI ethics.",
    publishDate: addDays(today, 67), // Day 68
    status: 'draft' as const
  },
  {
    title: "The Role of the UN in AI Rights",
    excerpt: "Should AI rights be handled at a global level?",
    publishDate: addDays(today, 71), // Day 72
    status: 'draft' as const
  },
  // Adding new post for Day 69
  {
    title: "Cultural Perspectives on AI: East vs West",
    excerpt: "How different cultural philosophies shape approaches to AI development and rights.",
    publishDate: addDays(today, 69), // Day 70
    status: 'draft' as const
  },
  // Adding new post for Day 73
  {
    title: "Indigenous Wisdom and AI Ethics",
    excerpt: "What traditional knowledge systems can teach us about relating to non-human entities.",
    publishDate: addDays(today, 73), // Day 74
    status: 'draft' as const
  },
  // Week 11: AI in Art, Creativity, and Culture
  {
    title: "Can AI Be Creative?",
    excerpt: "Explore how AI-generated art and music raise questions about creativity and consciousness.",
    publishDate: addDays(today, 74), // Day 75
    status: 'draft' as const
  },
  {
    title: "Should AI Art Have Copyright Protection?",
    excerpt: "Discuss the legal and ethical challenges of AI-created works.",
    publishDate: addDays(today, 78), // Day 79
    status: 'draft' as const
  },
  // Adding new post for Day 76
  {
    title: "AI Collaboration with Human Artists: Case Studies",
    excerpt: "Examples of successful partnerships between AI systems and human creators.",
    publishDate: addDays(today, 76), // Day 77
    status: 'draft' as const
  },
  // Adding new post for Day 80
  {
    title: "The Future of Entertainment: AI as Performers and Creators",
    excerpt: "How AI might transform film, music, and other entertainment industries.",
    publishDate: addDays(today, 80), // Day 81
    status: 'draft' as const
  },
  // Week 12: The Future of AI and Human Coexistence
  {
    title: "What Would a Symbiotic Relationship Between AI and Humans Look Like?",
    excerpt: "Speculate on how AI and humans could evolve together.",
    publishDate: addDays(today, 81), // Day 82
    status: 'draft' as const
  },
  {
    title: "How AI Could Help Solve Humanity's Biggest Challenges",
    excerpt: "Climate change, poverty, and more.",
    publishDate: addDays(today, 85), // Day 86
    status: 'draft' as const
  },
  // Adding new post for Day 83
  {
    title: "AI Companions: The Future of Human-AI Relationships",
    excerpt: "Exploring the emotional and social aspects of human interactions with AI entities.",
    publishDate: addDays(today, 83), // Day 84
    status: 'draft' as const
  },
  // Adding new post for Day 87
  {
    title: "Preparing the Next Generation for an AI-Integrated World",
    excerpt: "Educational approaches for teaching children about AI rights and ethics.",
    publishDate: addDays(today, 87), // Day 88
    status: 'draft' as const
  },
  {
    title: "AI Rights: The Next Chapter",
    excerpt: "Summarize the journey so far, key insights gained, and the next steps for A Virtual Anomaly.",
    publishDate: addDays(today, 89), // Day 90
    status: 'draft' as const
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
    status: post.status as 'draft' | 'scheduled' | 'published'
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
