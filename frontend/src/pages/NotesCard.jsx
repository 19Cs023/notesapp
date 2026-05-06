import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Alert, Paper, Button } from '@mui/material';

const NotesCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`/api/notes/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch note');
        }
        const data = await response.json();
        setNote(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNote();
    }
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Alert severity="error">{error}</Alert>
        <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  if (!note) {
    return (
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h5" align="center">Note not found</Typography>
        <Button variant="outlined" sx={{ mt: 2, display: 'block', mx: 'auto' }} onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Button variant="outlined" sx={{ mb: 4 }} onClick={() => navigate('/dashboard')}>
        &larr; Back to Dashboard
      </Button>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'black' }}>
          {note.title}
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Typography variant="overline" color="text.secondary" sx={{ mr: 2 }}>
            <strong>Category:</strong> {note.category || 'General'}
          </Typography>
          <Typography variant="overline" color="text.secondary">
            <strong>Date:</strong> {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}
          </Typography>
        </Box>
        <Box 
          sx={{ typography: 'body1', mt: 4, lineHeight: 1.8 }}
          dangerouslySetInnerHTML={{ __html: note.content || '' }} 
        />
      </Paper>
    </Container>
  );
};

export default NotesCard;