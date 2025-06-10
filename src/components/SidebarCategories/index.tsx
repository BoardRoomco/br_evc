'use client';

import { CategoryButton } from './CategoryButton';

const categories = [
  { id: 'ac-dc', label: 'AC/DC Converters' },
  { id: 'dc-dc', label: 'DC/DC Converters' }
];

export const SidebarCategories = () => {
  const handleCategoryClick = (categoryId: string) => {
    console.log(`Category clicked: ${categoryId}`);
    // We'll implement subcategory logic here later
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
        <CategoryButton
          key={category.id}
          label={category.label}
          onClick={() => handleCategoryClick(category.id)}
        />
      ))}
    </div>
  );
}; 