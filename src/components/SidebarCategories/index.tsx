'use client';

import { useState } from 'react';
import { CategoryButton } from './CategoryButton';
import { SubCategoryList } from './SubCategoryList';

const categories = [
  { id: 'ac-dc', label: 'AC/DC Converters' },
  { id: 'dc-dc', label: 'DC/DC Converters' }
];

export const SidebarCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      padding: '20px 0',
    }}>
      {categories.map(category => (
        <div key={category.id} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CategoryButton
            label={category.label}
            onClick={() => handleCategoryClick(category.id)}
          />
          {selectedCategory === category.id && (
            <SubCategoryList categoryId={category.id} />
          )}
        </div>
      ))}
    </div>
  );
}; 