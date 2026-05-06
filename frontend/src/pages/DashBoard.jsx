import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CircularProgress, Box, Alert, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const DashBoard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes');
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const data = await response.json();
      setNotes(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 800, color: 'black' }}>
          My Dashboard
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'black' }}>
          Welcome back! Here are your recent notes.
        </Typography>
      </Box>

      <Box>
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <CircularProgress size={60} thickness={4} />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && notes.length === 0 && (
          <Box textAlign="center" py={10} sx={{ backgroundColor: 'grey.50', borderRadius: 4, border: '1px dashed grey.300' }}>
            <Typography variant="h6" sx={{ color: 'black' }}>
              No notes found.
            </Typography>
            <Typography variant="body2" sx={{ color: 'black' }}>
              Go to the Add Notes page to create some!
            </Typography>
          </Box>
        )}

        {!loading && !error && notes.length > 0 && (
          <Grid container spacing={4}>
            {notes.map((note) => (
              <Grid item xs={12} sm={6} md={4} key={note._id || Math.random()}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 3,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': { 
                      boxShadow: '0 12px 24px -10px rgba(0,0,0,0.15)',
                      transform: 'translateY(-6px)',
                      borderColor: 'primary.light'
                    } 
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h6" component="h2" align="center" sx={{ fontWeight: 700, lineHeight: 1.3, mb: 2, color: 'black' }}>
                      {note.title || 'Untitled Note'}
                    </Typography>
                    <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mb: 3 }}>
                      {note.category || 'Uncategorized'}
                    </Typography>
                    <Button 
                      component={Link} 
                      to={`/note/${note._id}`} 
                      variant="contained" 
                      color="primary" 
                      size="small"
                      sx={{ mt: 'auto' }}
                    >
                      Read Content
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default DashBoard;
