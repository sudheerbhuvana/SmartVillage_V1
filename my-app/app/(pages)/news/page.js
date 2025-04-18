'use client';
import React, { useEffect, useState } from 'react';
import newsArticles from './news_array';
import './news.css';
import { FaArrowUp, FaSearch } from 'react-icons/fa';
import Footer from "../../components/SmallFooter/footer";

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [articlesToShow, setArticlesToShow] = useState(999);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [sortBy, setSortBy] = useState('DATE');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const convertToISO = (date) => {
    const [day, month, year] = date.split('-').map(Number);
    return new Date(year, month - 1, day).toISOString().split('T')[0];
  };

  // Sort and filter the news articles
  const sortedArticles = [...newsArticles].sort((a, b) => {
    const dateA = convertToISO(a.date);
    const dateB = convertToISO(b.date);
    return sortOrder === 'asc' ? dateA.localeCompare(dateB) : dateB.localeCompare(dateA);
  });

  const filteredArticles = sortedArticles.filter(article =>
    Object.values(article).some(value =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const currentArticles = filteredArticles.slice(0, articlesToShow);

  const loadMoreArticles = () => {
    setArticlesToShow(prev => prev + 6);
  };

  return (
    <>
      <div className="back-to-home">
        {showScrollToTop && (
          <button onClick={scrollToTop} className="back-to-top-button">
            <FaArrowUp />
          </button>
        )}
      </div>
      <div className='newsContainer'>
        <div className="newsContainer-in">
          <div className="newsContainer-in-header">
            <div className="newsContainer-in-header-in">
              <header className="header">
                <div className="header-in-one">
                  <div className="search-wrapper">
                    <FaSearch className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="header-in-two">
                  <h1>Our Achievements in News Articles</h1>
                </div>
                <div className="header-in-three">
                  <a href="/">Back to Home</a>
                </div>
              </header>
            </div>
          </div>

          <div className="articles-container">
            <div className="articles-grid">
              {currentArticles.map(article => (
                <div key={article.id} className="article-card">
                  <div className="article-image-wrapper">
                    <img src={article.imageUrl} alt={article.title} />
                  </div>
                  <div className="article-content">
                    <span className="article-date">{article.date}</span>
                    <h2>{article.title}</h2>
                    <p>{article.excerpt}</p>
                    <a href={article.link} target="_blank" rel="noopener noreferrer" 
                       className="read-more-btn">Read Full Article</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='footer-news'>
            <Footer />
          </div>
      </div>
    </>
  );
}
