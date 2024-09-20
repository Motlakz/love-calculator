import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Masonry from 'react-masonry-css';
import { blogContent } from '../api/blog-content';
import { generateBlogContent } from '../api/generateBlogContent';
import Modal from '../components/Modal';
import AnimatedLoader from '../components/Loader';

const CalculatorBlog: React.FC = () => {
  const { calculatorType } = useParams<{ calculatorType: string }>();
  const content = blogContent[calculatorType || ''] || blogContent['love'];
  const [generatedContent, setGeneratedContent] = useState<{ titles: string; content: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    async function fetchGeneratedContent() {
      setIsLoading(true);
      const result = await generateBlogContent(calculatorType || 'love');
      if (result) {
        // Clean up the titles content
        const cleanTitles = result.titles
          .replace(/^Sure!.*Rich Text Format:\n\n```plaintext\n/, '')
          .replace(/\n```\n\nFeel free to use this content as needed!$/, '')
          .trim();
        
        const cleanContent = result.content.replace(/<[^>]*>/g, '');
        setGeneratedContent({ titles: cleanTitles, content: cleanContent });
      }
      setIsLoading(false);
    }

    fetchGeneratedContent();
  }, [calculatorType]);

  if (isLoading) {
    return <div className="p-4 pt-24 min-h-screen flex items-center justify-center text-white"><AnimatedLoader /></div>;
  }

  // Define specialItems based on generatedItems
  const specialItems = generatedContent ? [
    { title: "This Week's Hot Topics", content: generatedContent.titles, type: "topics" as const, size: "medium" },
    { title: "Featured Article", content: generatedContent.content, type: "article" as const, size: "large" },
  ] : [];

  // Ensure otherItems also includes 'topics' in its type definition
  const otherItems = content.items as Array<{ title: string; content: string; type: 'funFact' | 'topics' | 'article' }>;

  // Define breakpoints for responsive design (for Masonry)
  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    768: 1,
  };

  // Handler for Read More button
  const handleReadMore = (title: string, content: string) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  // Unified markdown rendering function
  const renderMarkdown = (content: string) => (
    <ReactMarkdown
      className="text-gray-300 text-lg prose prose-invert max-w-none"
      components={{
        h1: ({ ...props }) => <h3 className="text-xl font-semibold text-pink-200 mt-4 mb-2" {...props} />,
        h2: ({ ...props }) => <h4 className="text-lg font-semibold text-pink-200 mt-3 mb-2" {...props} />,
        h3: ({ ...props }) => <h5 className="text-base font-semibold text-pink-200 mt-3 mb-2" {...props} />,
        p: ({ ...props }) => <p className="mb-3" {...props} />,
        ul: ({ ...props }) => <ul className="list-disc list-inside mb-3" {...props} />,
        ol: ({ ...props }) => <ol className="list-decimal list-inside mb-3" {...props} />,
        li: ({ ...props }) => <li className="mb-1 flex items-center justify-center" {...props} />,
        strong: ({ ...props }) => <strong className="font-semibold text-pink-100" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );

  return (
    <div className="p-4 pt-24 min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900">
      <div className="max-w-7xl">
        <h1 className="text-5xl font-bold text-pink-400 mb-4">{content.title}</h1>
        <p className="text-2xl text-gray-300 mb-12">{content.description}</p>

        {/* Special Items Section */}
        {specialItems.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {specialItems.map((item, index) => (
              <div
                key={index}
                className={`
                  bg-white/10 backdrop-filter backdrop-blur-lg rounded-lg p-6 
                  flex flex-col justify-between transition-all duration-300 
                  hover:shadow-lg hover:shadow-pink-500/20
                  ${item.size === 'large' ? 'col-span-1' : ''}
                `}
              >
                <div>
                  <h2 className="text-2xl font-semibold text-pink-300 mb-4">{item.title}</h2>
                  <div className={item.type === 'article' ? 'line-clamp-12' : ''}>
                    {renderMarkdown(item.content)}
                  </div>
                </div>
                {item.type === 'topics' ? (
                  <span className="inline-block bg-indigo-500 text-white text-sm px-3 py-1 rounded mt-4 self-start">Weekly Update</span>
                ) : (
                  <div className="flex items-center justify-between mt-4">
                    <span className="inline-block bg-blue-500 text-white text-sm px-3 py-1 rounded">Featured</span>
                    <button
                      className="text-pink-400 hover:underline"
                      onClick={() => handleReadMore(item.title, item.content)}
                    >
                      Read More
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Masonry Grid for Other Items */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {otherItems.map((item, index) => (
            <div
              key={index}
              className={`
                bg-white/10 backdrop-filter backdrop-blur-lg rounded-lg p-6 
                flex flex-col justify-between transition-all duration-300 
                hover:shadow-lg hover:shadow-pink-500/20
              `}
            >
              <div>
                <h2 className="text-2xl font-semibold text-pink-300 mb-4">{item.title}</h2>
                {renderMarkdown(item.content)}
              </div>
              {/* Badges based on type */}
              {item.type === 'funFact' && (
                <span className="inline-block bg-pink-500 text-white text-sm px-3 py-1 rounded mt-4 self-start">Fun Fact</span>
              )}
              {item.type === 'topics' && (
                <span className="inline-block bg-indigo-500 text-white text-sm px-3 py-1 rounded mt-4 self-start">Weekly Update</span>
              )}
              {item.type === 'article' && (
                <span className="inline-block bg-blue-500 text-white text-sm px-3 py-1 rounded mt-4 self-start">Featured</span>
              )}
            </div>
          ))}
        </Masonry>

        {/* Modal Component */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={modalTitle}
          content={modalContent}
        />
      </div>
    </div>
  );
};

export default CalculatorBlog;
