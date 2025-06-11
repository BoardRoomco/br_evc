'use client';

interface SubCategoryListProps {
  categoryId: string;
}

interface Component {
  id: string;
  name: string;
  imageUrl: string;
}

interface ComponentListProps {
  components: Component[];
}

const ComponentList = ({ components }: ComponentListProps) => {
  const onDragStart = (event: React.DragEvent, component: Component) => {
    event.dataTransfer.setData('application/reactflow', component.name);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 0',
    }}>
      {components.map(component => (
        <div
          key={component.id}
          draggable
          onDragStart={(e) => onDragStart(e, component)}
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

export const SubCategoryList = ({ categoryId }: SubCategoryListProps) => {
  const acDcComponents: Component[] = [
    { 
      id: 'ac-dc-1', 
      name: 'Active Front-End Rectifier',
      imageUrl: '/images/ac-dc-1.svg'
    },
    { 
      id: 'ac-dc-2', 
      name: 'Diode Bridge Rectifier',
      imageUrl: '/images/ac-dc-2.svg'
    },
    { 
      id: 'ac-dc-3', 
      name: 'Thyristor Rectifier',
      imageUrl: '/images/ac-dc-3.svg'
    }
  ];

  const dcDcComponents: Component[] = [
    {
      id: 'dc-dc-2',
      name: 'Dual Active Bridge ',
      imageUrl: '/images/dc-dc-2.svg'
    },
    {
      id: 'dc-dc-3',
      name: 'Buck-Boost Converter',
      imageUrl: '/images/dc-dc-3.svg'
    },
  ];

  if (categoryId === 'ac-dc') {
    return <ComponentList components={acDcComponents} />;
  } else if (categoryId === 'dc-dc') {
    return <ComponentList components={dcDcComponents} />;
  }

  return null;
}; 