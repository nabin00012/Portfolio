import React, { useState, useEffect } from 'react'
import Portfolio from './components/Portfolio'
import BlogPage from './pages/BlogPage'
import ArticlePageWrapper from './pages/ArticlePage'

function App() {
    const [currentPage, setCurrentPage] = useState('portfolio');
    const [articleSlug, setArticleSlug] = useState('');

    useEffect(() => {
        const handleRouteChange = () => {
            const path = window.location.pathname;
            const search = window.location.search;

            if (path === '/blog') {
                setCurrentPage('blog');
            } else if (path === '/article') {
                setCurrentPage('article');
                const urlParams = new URLSearchParams(search);
                setArticleSlug(urlParams.get('slug') || 'kubernetes-zero-downtime-deployments');
            } else {
                setCurrentPage('portfolio');
            }
        };

        // Handle initial route
        handleRouteChange();

        // Listen for browser back/forward
        window.addEventListener('popstate', handleRouteChange);

        // Override link clicks for client-side routing
        const handleLinkClick = (e) => {
            const link = e.target.closest('a[href^="/"]');
            if (link) {
                e.preventDefault();
                const href = link.getAttribute('href');
                window.history.pushState({}, '', href);
                handleRouteChange();
            }
        };

        document.addEventListener('click', handleLinkClick);

        return () => {
            window.removeEventListener('popstate', handleRouteChange);
            document.removeEventListener('click', handleLinkClick);
        };
    }, []);

    switch (currentPage) {
        case 'blog':
            return <BlogPage />;
        case 'article':
            return <ArticlePageWrapper />;
        default:
            return <Portfolio />;
    }
}

export default App

