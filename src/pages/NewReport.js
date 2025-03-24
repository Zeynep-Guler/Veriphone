import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Alert,
  Grid,
} from '@mui/material';
import { reportService } from '../services/api';

const NewReport = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    phoneNumber: '',
    reporterName: '',
    reporterSurname: '',
    title: '',
    scamType: '',
    description: '',
    location: '',
    dateOfScam: new Date().toISOString().split('T')[0],
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // If we have pre-filled data from clicking a phone number, use it
    if (location.state) {
      setFormData(prev => ({
        ...prev,
        phoneNumber: location.state.phoneNumber || '',
        scamType: location.state.scamType || '',
        location: location.state.location || '',
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await reportService.createReport(formData);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create report');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, bgcolor: '#f8f9fa' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#2e7d32' }}>
          Segnala una Truffa
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Nome"
                name="reporterName"
                value={formData.reporterName}
                onChange={handleChange}
                placeholder="Inserisci il tuo nome"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Cognome"
                name="reporterSurname"
                value={formData.reporterSurname}
                onChange={handleChange}
                placeholder="Inserisci il tuo cognome"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Numero del Truffatore"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Inserisci il numero del truffatore"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                select
                label="Tipo di Truffa"
                name="scamType"
                value={formData.scamType}
                onChange={handleChange}
              >
                <MenuItem value="Telemarketing">Telemarketing</MenuItem>
                <MenuItem value="Investimento">Investimento</MenuItem>
                <MenuItem value="Governo">Governo</MenuItem>
                <MenuItem value="Romantica">Romantica</MenuItem>
                <MenuItem value="Supporto Tecnico">Supporto Tecnico</MenuItem>
                <MenuItem value="Altro">Altro</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Città"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Inserisci la città dove è avvenuta la truffa"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Data della Truffa"
                name="dateOfScam"
                type="date"
                value={formData.dateOfScam}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                label="Descrizione"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descrivi in dettaglio cosa è successo"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/')}
                  sx={{ color: '#2e7d32', borderColor: '#2e7d32' }}
                >
                  Annulla
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}
                >
                  Invia Segnalazione
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default NewReport; 