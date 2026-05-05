import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CircularProgress, Box, Alert } from '@mui/material';
import AddNotes from '../components/AddNotes';
import useAuthStore from '../store/useAuthStore';

const DashBoard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthStore();

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

  const handleAddNote = async (newNote) => {
    try {
      const noteToSave = {
        ...newNote,
        category: 'General', // Default category since it's required
      };
      
      const currentUserId = user?._id || '000000000000000000000000';

      const response = await fetch(`/api/notes/user/${currentUserId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteToSave),
      });

      if (response.ok) {
        fetchNotes(); // Refresh notes list after adding
      } else {
        console.error('Failed to add note');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Notes Dashboard
      </Typography>

      <AddNotes onAddNote={handleAddNote} />

      <Box mt={6}>
        {loading && (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && notes.length === 0 && (
          <Typography variant="body1" color="text.secondary">
            No notes found. Create some notes to see them here!
          </Typography>
        )}

        {!loading && !error && notes.length > 0 && (
          <Grid container spacing={3}>
            {notes.map((note) => (
              <Grid item xs={12} sm={6} md={4} key={note._id || Math.random()}>
                <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { elevation: 6, transform: 'translateY(-4px)' } }}>
                  <CardContent>
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 'medium' }}>
                      {note.title || 'Untitled Note'}
                    </Typography>
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
