const request = require('supertest');
const app = require('../app');
const { Playlists } = require('../models');

const playlistMock = [
  {
    name: 'newPlaylist1',
    coverImg: 'img1',
  },
  {
    name: 'newPlaylist2',
    coverImg: 'img2',
  }];
const updatePlaylistMock = {
  name: 'update album',
  artistId: 1,
  coverImg: 'img3',
};

describe('playlist api test', () => {
  beforeEach(async () => {
    await Playlists.destroy({ truncate: true, force: true });
  });
  afterAll(async () => {
    await Playlists.destroy({ truncate: true, force: true });
  });

  it('Can create playlist', async () => {
    const { body } = await request(app).post('/api/playlists/').send(playlistMock[0]);
    expect(body.name).toBe(playlistMock[0].name);
  });

  it('Can get searched playlist', async () => {
    const { body: newPlaylist } = await request(app).post('/api/playlists/').send(playlistMock[0]);
    const { body: getSearchPlaylist } = await request(app).get(`/api/playlists/${playlistMock[0].name.substring(3, 5)}`);

    expect(getSearchPlaylist[0].name).toBe(playlistMock[0].name);
    expect(getSearchPlaylist[0].id).toBe(newPlaylist.id);
  });

  it('can delete playlist', async () => {
    const { body } = await request(app).post('/api/playlists').send(playlistMock[0]);
    const { body: newPlaylist2 } = await request(app).post('/api/playlists').send(playlistMock[1]);

    const { body: getPlaylists } = await request(app).get('/api/playlists/');
    expect(getPlaylists.length).toBe(2);

    await request(app).delete(`/api/playlists/${newPlaylist2.id}`);
    const { body: getPlaylists2 } = await request(app).get('/api/playlists/');
    expect(getPlaylists2.length).toBe(1);
  });

  it('can update playlist', async () => {
    const { body } = await request(app).post('/api/playlists').send(playlistMock[0]);
    expect(body.name).toBe(playlistMock[0].name);
    const { body: updatePlaylist } = await request(app).put(`/api/playlists/${body.id}`).send(updatePlaylistMock);
    expect(updatePlaylist.name).toBe(updatePlaylistMock.name);
  });
});
