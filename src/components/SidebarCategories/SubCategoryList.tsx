'use client';

interface SubCategoryListProps {
  categoryId: string;
}

interface Component {
  id: string;
  name: string;
  imageUrl: string;
}

export const SubCategoryList = ({ categoryId }: SubCategoryListProps) => {
  const acDcComponents: Component[] = [
    { 
      id: 'ac-dc-1', 
      name: 'AC/DC Converter 1',
      imageUrl: '/images/ac-dc-1.svg'
    },
    { 
      id: 'ac-dc-2', 
      name: 'AC/DC Converter 2',
      imageUrl: '/images/ac-dc-2.svg'
    },
    { 
      id: 'ac-dc-3', 
      name: 'AC/DC Converter 3',
      imageUrl: '/images/ac-dc-3.svg'
    }
  ];

  if (categoryId !== 'ac-dc') {
    return null;
  }

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 0',
    }}>
      {acDcComponents.map(component => (
        <div
          key={component.id}
          style={{
            width: '75%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 12px',
            backgroundColor: 'white',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#f5f5f5';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <img 
            src={component.imageUrl}
            alt={component.name}
            style={{
              width: '40px',
              height: '40px',
              objectFit: 'contain',
            }}
          />
          <span style={{
            fontSize: '14px',
            color: '#333',
            flex: 1,
          }}>
            {component.name}
          </span>
        </div>
      ))}
    </div>
  );
}; 