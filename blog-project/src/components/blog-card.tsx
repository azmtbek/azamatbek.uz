import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
}

type BlogCardProps = {
  post: BlogPost;
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <CardHeader>
        <h3 className="text-xl font-semibold">{post.title}</h3>
        <p className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString()}</p>
      </CardHeader>
      <CardContent>
        <p>{post.excerpt}</p>
      </CardContent>
      <CardFooter>
        {/* In a real app, this would use Next/Link or similar */}
        <a href={`/blog/${post.slug}`} className="text-blue-600 hover:underline text-sm">Read Article &rarr;</a>
      </CardFooter>
    </Card>
  );
}