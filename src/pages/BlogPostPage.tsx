import React from 'react';
import { ArrowRight, Clock, Calendar, User, Share2, BookOpen } from 'lucide-react';
import { BlogPost, Product } from '../types';
import { toPersianDigits, formatPersianDate } from '../utils/formatters';
import { BotanicalArtwork } from '../components/BotanicalArtwork';

interface BlogPostPageProps {
  post: BlogPost;
  onBack: () => void;
  recommendedProducts: Product[];
  onSelectProduct: (p: Product) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  post,
  onBack,
  recommendedProducts,
  onSelectProduct,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#4F6F52] transition-colors cursor-pointer"
      >
        <ArrowRight className="w-4 h-4" />
        <span>بازگشت به فهرست مقالات</span>
      </button>

      {/* Article Header */}
      <header className="space-y-4 pb-6 border-b border-stone-200">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <span>{post.category_name}</span>
          <span aria-hidden="true">·</span>
          <span>{toPersianDigits(post.reading_time)} دقیقه زمان مطالعه</span>
          <span aria-hidden="true">·</span>
          <span>{formatPersianDate(post.created_at)}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#2A3E2D] leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center justify-between text-xs text-stone-600 pt-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#4F6F52] text-[#FEFAE0] flex items-center justify-center font-bold text-xs">
              خ
            </div>
            <span className="font-semibold text-stone-800">{post.author_name}</span>
          </div>

          <span className="text-stone-400">
            {toPersianDigits(post.views_count)} بازدید
          </span>
        </div>
      </header>

      {/* Visual Header Banner */}
      <div
        className="rounded-2xl p-8 sm:p-12 text-white flex flex-col justify-end shadow-xs relative overflow-hidden"
        style={{ backgroundColor: post.image_color }}
      >
        <div className="absolute inset-0 bg-black/25" />
        <BookOpen className="w-16 h-16 text-white/40 mb-4 relative z-10" />
        <p className="text-sm sm:text-base font-medium leading-relaxed relative z-10 max-w-2xl">
          {post.summary}
        </p>
      </div>

      {/* Article Body */}
      <div className="prose prose-stone max-w-none text-xs sm:text-sm leading-relaxed text-stone-700 space-y-4">
        {post.content.split('\n\n').map((paragraph, idx) => (
          <p key={idx} className="leading-loose">
            {paragraph.trim()}
          </p>
        ))}
      </div>

      {/* Recommended Herbal Teas for this Article */}
      {recommendedProducts.length > 0 && (
        <div className="pt-10 border-t border-stone-200 space-y-4">
          <h3 className="text-base font-bold text-[#2A3E2D]">
            دمنوش‌های مرتبط با این موضوع:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommendedProducts.slice(0, 2).map((p) => (
              <div
                key={p.id}
                onClick={() => onSelectProduct(p)}
                className="p-4 bg-white rounded-xl border border-stone-200 hover:border-[#4F6F52] cursor-pointer flex items-center gap-3 transition-colors"
              >
                <div className="w-14 h-14 rounded-lg bg-stone-100 shrink-0 overflow-hidden">
                  <BotanicalArtwork type={p.slug} className="w-full h-full" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 line-clamp-1">{p.name}</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">{p.short_description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
