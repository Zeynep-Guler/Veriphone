import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#2e7d32' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <PhoneIcon sx={{ mr: 1, fontSize: '2rem' }} />
          <Box>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                lineHeight: 1,
              }}
            >
              VeriPhone
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.7rem',
                display: 'block',
                mt: 0.5,
              }}
            >
              Stop Scammers with VeriPhone
            </Typography>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          color="inherit"
          component={RouterLink}
          to="/new-report"
          sx={{ 
            fontWeight: 'bold',
            fontSize: '0.9rem',
            textTransform: 'none'
          }}
        >
          Report a Scam
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 