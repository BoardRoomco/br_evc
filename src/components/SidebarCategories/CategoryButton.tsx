'use client';

interface CategoryButtonProps {
  label: string;
  onClick: () => void;
}

export const CategoryButton = ({ label, onClick }: CategoryButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: '75%',
        padding: '12px 16px',
        textAlign: 'center',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: '4px',
        backgroundColor: 'white',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = '#f5f5f5';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = 'white';
      }}
    >
      {label}
    </button>
  );
}; 