'use client';

import { Drawer } from '@mui/material';
import { SidebarCategories } from './SidebarCategories';

const styles = {
  drawer: {
    width: 300,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: 300,
      boxSizing: 'border-box',
      backgroundColor: '#f1f8fa',
      borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
    },
  },
  content: {
    height: '100%',
    overflow: 'auto',
  },
};

export const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={styles.drawer}
    >
      <div style={styles.content}>
        <SidebarCategories />
      </div>
    </Drawer>
  );
}; 