import React from 'react';
import { BookOpen, Clock, Calendar, ArrowLeft } from 'lucide-react';
import { BlogPost } from '../types';
import { toPersianDigits, formatPersianDate } from '../utils/formatters';

interface BlogPageProps {
  posts: BlogPost[];
  onSelectPost: (slug: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ posts, onSelectPost }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      <div className="text-center max-w-2xl mx-auto space-y-3 pb-6 border-b border-stone-200">
        <span className="text-xs font-bold text-[#4F6F52] tracking-wider">دانشنامه گیاهی خوشنوش</span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#2A3E2D]">
          مقالات علمی، طب سنتی و سلامت روان
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          آموزش خواص گیاهان دارویی، ریتم شبانه‌روزی، روش‌های اصولی دم‌آوری و شناخت مزاج‌ها به قلم متخصصین داروسازی گیاهی و طب کهن.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            onClick={() => onSelectPost(post.slug)}
            className="group bg-white rounded-xl overflow-hidden border border-[#E8ECE0] hover:border-[#4F6F52] hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            {/* Visual Cover */}
            <div
              className="h-44 w-full flex items-center justify-center p-6 text-white relative overflow-hidden"
              style={{ backgroundColor: post.image_color }}
            >
              <div className="absolute inset-0 bg-black/20" />
              <BookOpen className="w-12 h-12 text-white/80 group-hover:scale-110 transition-transform relative z-10" />
              <div className="absolute bottom-3 right-3 text-[11px] font-medium bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs z-10">
                {post.category_name}
              </div>
            </div>

            {/* Post Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                {/* Clean unboxed metadata with separators */}
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                  <span>{formatPersianDate(post.created_at)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{toPersianDigits(post.reading_time)} دقیقه</span>
                </div>

                <h3 className="text-base font-bold text-stone-900 group-hover:text-[#4F6F52] transition-colors leading-snug mb-2">
                  {post.title}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {post.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#4F6F52]">
                <span>مطالعه مقاله کامل</span>
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
              </div>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
