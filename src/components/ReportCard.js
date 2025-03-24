import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  IconButton,
  TextField,
  Chip,
  Divider,
} from '@mui/material';
import {
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Comment as CommentIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { reportService } from '../services/api';
import { formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

const ReportCard = ({ report, onUpdate }) => {
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate();

  const handleVote = async (vote) => {
    try {
      await reportService.vote(report._id, vote);
      onUpdate();
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await reportService.addComment(report._id, comment);
      setComment('');
      onUpdate();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const isUpvoted = user && report.upvotes.includes(user._id);
  const isDownvoted = user && report.downvotes.includes(user._id);

  const getScamTypeColor = (type) => {
    const colors = {
      Telemarketing: '#2e7d32',
      Investment: '#1976d2',
      Government: '#d32f2f',
      Romance: '#ed6c02',
      'Tech Support': '#9c27b0',
      Other: '#757575',
    };
    return colors[type] || '#757575';
  };

  return (
    <Card sx={{ 
      mb: 2, 
      bgcolor: '#f8f9fa',
      '&:hover': { 
        boxShadow: 6,
        bgcolor: '#f1f8e9'
      }
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h5" component="h2" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
            {report.title}
          </Typography>
          <Chip
            label={report.scamType}
            sx={{
              bgcolor: getScamTypeColor(report.scamType),
              color: 'white',
              fontWeight: 'bold',
            }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ color: '#2e7d32' }}>
            Numero di Telefono:{' '}
            <Button
              variant="text"
              onClick={() => navigate('/new-report', { 
                state: { 
                  phoneNumber: report.phoneNumber,
                  scamType: report.scamType,
                  location: report.location
                } 
              })}
              sx={{ 
                color: '#2e7d32',
                textTransform: 'none',
                p: 0,
                minWidth: 'auto',
                '&:hover': {
                  textDecoration: 'underline',
                  bgcolor: 'transparent'
                }
              }}
            >
              {report.phoneNumber}
            </Button>
          </Typography>
          <Typography variant="body1">
            Segnalato da: {report.reporterName} {report.reporterSurname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Victim's Age: {report.victimAge}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1" paragraph>
          {report.description}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
          {report.location && (
            <Chip
              label={`Luogo: ${report.location}`}
              variant="outlined"
              sx={{ borderColor: '#2e7d32', color: '#2e7d32' }}
            />
          )}
          <Chip
            label={`Data: ${formatDistanceToNow(new Date(report.dateOfScam), { locale: it })}`}
            variant="outlined"
            sx={{ borderColor: '#2e7d32', color: '#2e7d32' }}
          />
        </Box>
      </CardContent>
      <CardActions>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            color={isUpvoted ? 'primary' : 'default'}
            onClick={() => handleVote('up')}
            disabled={!user}
          >
            <ThumbUpIcon />
          </IconButton>
          <Typography variant="body2">
            {report.upvotes.length - report.downvotes.length}
          </Typography>
          <IconButton
            color={isDownvoted ? 'error' : 'default'}
            onClick={() => handleVote('down')}
            disabled={!user}
          >
            <ThumbDownIcon />
          </IconButton>
        </Box>
        <Button
          startIcon={<CommentIcon />}
          onClick={() => setShowComments(!showComments)}
        >
          {report.comments.length} Comments
        </Button>
      </CardActions>
      {showComments && (
        <CardContent>
          <Box component="form" onSubmit={handleComment} sx={{ mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={!user}
            />
          </Box>
          {report.comments.map((comment, index) => (
            <Box key={index} sx={{ mb: 1 }}>
              <Typography variant="body2">
                <strong>{comment.user.username}</strong> -{' '}
                {new Date(comment.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="body2">{comment.text}</Typography>
            </Box>
          ))}
        </CardContent>
      )}
    </Card>
  );
};

export default ReportCard; 