import  { Router } from 'express';
import { createPlaylist, deletePlaylist, getPlaylistsByRoom,getMusicByPlaylist,addMusicToPlaylist, removeMusicFromPlaylist, getPlaylistById } from './playlist.controller';



const PlaylistRouter = Router();


PlaylistRouter.post('/room/:roomId', createPlaylist);
PlaylistRouter.get('/room/:roomId', getPlaylistsByRoom);


PlaylistRouter.get('/:playlistId/music', getMusicByPlaylist);
PlaylistRouter.get('/:playlistId', getPlaylistById);
PlaylistRouter.delete('/:playlistId', deletePlaylist);


PlaylistRouter.post('/:playlistId/music/:musicId', addMusicToPlaylist);
PlaylistRouter.delete('/:playlistId/music/:musicId', removeMusicFromPlaylist);

export default PlaylistRouter;