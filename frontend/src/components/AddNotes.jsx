import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const AddNotes = ({ onAddNote, userId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');

  // Used if no onAddNote is passed
  const postNote = async (note) => {
    try {
      const targetUserId = userId || '000000000000000000000000';
      const response = await fetch(`/api/notes/user/${targetUserId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
      });

      if (!response.ok) {
        throw new Error('Failed to add note');
      }

      const newNote = await response.json();
      return newNote;
    } catch (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (onAddNote) {
      onAddNote({ title, content, category });
    } else {
      await postNote({ title, content, category });
    }

    setTitle('');
    setContent('');
    setCategory('General');
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4, borderRadius: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Create a New Note
      </Typography>
      
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Note Content"
          variant="outlined"
          multiline
          rows={5}
          fullWidth
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          size="large"
          sx={{ mt: 1, alignSelf: 'flex-start' }}
        >
          Save Note
        </Button>
      </Box>
    </Paper>
  );
};

export default AddNotes;
