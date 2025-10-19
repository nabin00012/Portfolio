import React from 'react';
import ArticlePage from '../components/ArticlePage';
import './ArticlePage.css';

const ArticlePageWrapper = () => {
    // Get the article slug from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug') || 'kubernetes-zero-downtime-deployments';

    return (
        <div className="article-page-wrapper">
            <ArticlePage articleSlug={slug} />
        </div>
    );
};

export default ArticlePageWrapper;
