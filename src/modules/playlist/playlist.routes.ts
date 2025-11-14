import  { Router } from 'express';
import { createPlaylist, deletePlaylist, getPlaylistsByRoom,getMusicByPlaylist,addMusicToPlaylist, removeMusicFromPlaylist, getPlaylistById } from './playlist.controller';



const PlaylistRouter = Router();

PlaylistRouter.post('/:roomId', createPlaylist)

PlaylistRouter.post('/:roomId', getPlaylistsByRoom)

PlaylistRouter.get('/:playlistId', getPlaylistById) 

PlaylistRouter.delete('/:playlistId', deletePlaylist) 


PlaylistRouter.post('/:playlistId/:musicId', addMusicToPlaylist) 

PlaylistRouter.delete('/:playlistId/:musicId',removeMusicFromPlaylist) 

PlaylistRouter.get('/:playlistId/music', getMusicByPlaylist) 

export default PlaylistRouter;