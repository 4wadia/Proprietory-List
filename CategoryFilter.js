import React from 'react';
import './CategoryFilter.css';

const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'all': return '◉';
      case 'work': return '⬢';
      case 'personal': return '◈';
      case 'health': return '⬟';
      case 'shopping': return '⬡';
      case 'finance': return '⬢';
      case 'general': return '◉';
      default: return '◉';
    }
  };

  const getCategoryLabel = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="category-filter">
      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category}
            className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
            title={getCategoryLabel(category)}
          >
            <span className="category-icon">{getCategoryIcon(category)}</span>
            <span className="category-label">{getCategoryLabel(category)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
