import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  Alert,
  Card,
  CardContent,
  CardMedia,
  TextField,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { reportService } from '../services/api';
import ReportCard from '../components/ReportCard';
import SendIcon from '@mui/icons-material/Send';
import SecurityIcon from '@mui/icons-material/Security';
import ShieldIcon from '@mui/icons-material/Shield';
import WarningIcon from '@mui/icons-material/Warning';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhoneIcon from '@mui/icons-material/Phone';
import SpeedIcon from '@mui/icons-material/Speed';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [showAllReports, setShowAllReports] = useState(false);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await reportService.getReports();
      setReports(response.data.reports);
    } catch (error) {
      setError('Failed to fetch reports');
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail('');
  };

  const recentReports = reports.slice(0, 3);

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Device Introduction */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 2, md: 4 }, 
            mb: 4, 
            bgcolor: 'white',
            borderRadius: 4,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            border: '1px solid rgba(46, 125, 50, 0.1)'
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <CardMedia
                component="img"
                height="250"
                image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                alt="VeriPhone Device"
                sx={{ 
                  borderRadius: 3,
                  boxShadow: '0 8px 24px rgba(46, 125, 50, 0.15)',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  color: '#2e7d32', 
                  fontWeight: 'bold',
                  mb: 1
                }}
              >
                Presentazione di VeriPhone
              </Typography>
              <Typography 
                variant="subtitle1" 
                paragraph 
                sx={{ 
                  color: 'text.secondary',
                  mb: 3
                }}
              >
                Il nostro dispositivo innovativo per telefoni fissi che ti aiuta a proteggerti dalle truffe telefoniche. 
                Dotato di verifica del chiamante in tempo reale e tecnologia di rilevamento delle truffe.
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: 'rgba(46, 125, 50, 0.04)'
                  }}>
                    <SecurityIcon sx={{ color: '#2e7d32', fontSize: 32, mb: 0.5 }} />
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      Verifica in Tempo Reale
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: 'rgba(46, 125, 50, 0.04)'
                  }}>
                    <ShieldIcon sx={{ color: '#2e7d32', fontSize: 32, mb: 0.5 }} />
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      Protezione Avanzata
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: 'rgba(46, 125, 50, 0.04)'
                  }}>
                    <WarningIcon sx={{ color: '#2e7d32', fontSize: 32, mb: 0.5 }} />
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      Avvisi Istantanei
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Button 
                variant="contained" 
                size="medium"
                sx={{ 
                  bgcolor: '#2e7d32',
                  '&:hover': { bgcolor: '#1b5e20' },
                  px: 4,
                  py: 1,
                  borderRadius: 2,
                  fontSize: '1rem',
                  textTransform: 'none',
                  boxShadow: '0 4px 12px rgba(46, 125, 50, 0.2)'
                }}
              >
                Iscriviti alla Lista d'Attesa
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Recent Reports Section */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 4 
          }}>
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                color: '#2e7d32',
                fontWeight: 'bold',
              }}
            >
              Segnalazioni Truffe Recenti
            </Typography>
            {reports.length > 3 && (
              <Button
                variant="outlined"
                onClick={() => setShowAllReports(!showAllReports)}
                endIcon={<ExpandMoreIcon sx={{ transform: showAllReports ? 'rotate(180deg)' : 'none' }} />}
                sx={{ 
                  color: '#2e7d32',
                  borderColor: '#2e7d32',
                  '&:hover': { 
                    borderColor: '#1b5e20',
                    bgcolor: 'rgba(46, 125, 50, 0.04)'
                  },
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none'
                }}
              >
                {showAllReports ? 'Mostra Meno' : 'Mostra Altri'}
              </Button>
            )}
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 4 }}>
              {error}
            </Alert>
          )}

          {loading ? (
            <Typography>Loading reports...</Typography>
          ) : reports.length === 0 ? (
            <Paper 
              elevation={0} 
              sx={{ 
                p: 6, 
                textAlign: 'center', 
                bgcolor: 'white',
                borderRadius: 4,
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                border: '1px solid rgba(46, 125, 50, 0.1)'
              }}
            >
              <PhoneIcon sx={{ fontSize: 60, color: '#2e7d32', mb: 2 }} />
              <Typography variant="h5" sx={{ color: '#2e7d32', mb: 2 }}>
                Nessuna segnalazione ancora. Sii il primo a segnalare una truffa!
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/new-report')}
                sx={{ 
                  mt: 2, 
                  bgcolor: '#2e7d32', 
                  '&:hover': { bgcolor: '#1b5e20' },
                  px: 6,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none'
                }}
              >
                Segnala una Truffa
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {(showAllReports ? reports : recentReports).map((report) => (
                <Grid item xs={12} key={report._id}>
                  <ReportCard report={report} onUpdate={fetchReports} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        <Divider sx={{ my: 8 }} />

        {/* News Section */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%', 
              bgcolor: 'white',
              transition: 'transform 0.3s',
              borderRadius: 4,
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              border: '1px solid rgba(46, 125, 50, 0.1)',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 32px rgba(46, 125, 50, 0.15)'
              }
            }}>
              <CardMedia
                component="img"
                height="200"
                image="https://images.unsplash.com/photo-1553481187-be93c21490a9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                alt="Voice Replication"
                sx={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
              />
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                  Truffe con Clonazione Vocale
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  La nuova tecnologia AI permette ai truffatori di clonare le voci, rendendo le loro chiamate più convincenti. 
                  Scopri come proteggerti da questa minaccia emergente.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%', 
              bgcolor: 'white',
              transition: 'transform 0.3s',
              borderRadius: 4,
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              border: '1px solid rgba(46, 125, 50, 0.1)',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 32px rgba(46, 125, 50, 0.15)'
              }
            }}>
              <CardMedia
                component="img"
                height="200"
                image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                alt="Elderly Scams"
                sx={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
              />
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                  Statistiche Truffe agli Anziani
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Studi recenti mostrano che gli anziani perdono oltre 3 miliardi di euro all'anno per truffe telefoniche. 
                  Scopri le truffe più comuni che colpiscono gli anziani.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%', 
              bgcolor: 'white',
              transition: 'transform 0.3s',
              borderRadius: 4,
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              border: '1px solid rgba(46, 125, 50, 0.1)',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 32px rgba(46, 125, 50, 0.15)'
              }
            }}>
              <CardMedia
                component="img"
                height="200"
                image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                alt="Scam Trends"
                sx={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
              />
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                  Ultime Tendenze delle Truffe
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rimani informato sulle nuove tecniche di truffa e su come identificarle. 
                  La conoscenza è la tua migliore difesa contro le truffe telefoniche.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Newsletter Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 4, md: 6 }, 
            mb: 6, 
            bgcolor: 'white',
            borderRadius: 4,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            border: '1px solid rgba(46, 125, 50, 0.1)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%232e7d32" fill-opacity="0.05" fill-rule="evenodd"%3E%3Ccircle cx="2" cy="2" r="1"/%3E%3C/g%3E%3C/svg%3E")',
              opacity: 0.1
            }
          }}
        >
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              color: '#2e7d32', 
              fontWeight: 'bold',
              mb: 2
            }}
          >
            Rimani Aggiornato con gli Ultimi Avvisi sulle Truffe
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 4, 
              color: 'text.secondary',
              fontWeight: 'normal'
            }}
          >
            Iscriviti alla nostra newsletter per ricevere aggiornamenti sulle nuove tecniche di truffa e consigli di prevenzione
          </Typography>
          <Box 
            component="form" 
            onSubmit={handleNewsletterSubmit} 
            sx={{ 
              display: 'flex', 
              gap: 2, 
              maxWidth: 600, 
              mx: 'auto',
              flexDirection: { xs: 'column', sm: 'row' }
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Inserisci la tua email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: '#2e7d32',
                  },
                },
              }}
            />
            <IconButton 
              type="submit" 
              sx={{ 
                bgcolor: '#2e7d32',
                color: 'white',
                '&:hover': { bgcolor: '#1b5e20' },
                width: { xs: '100%', sm: 'auto' },
                height: 56,
                borderRadius: 2
              }}
            >
              <SendIcon sx={{ fontSize: 28 }} />
            </IconButton>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home; 