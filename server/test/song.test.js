const request = require('supertest');
const app = require('../app');
const { Songs } = require('../models');

const songMock = {
  title: 'new song',
  artistId: 1,
  albumId: 1,
  length: '03:03',
  youtubeLink: 'gagag',
  trackNumber: 1,
};
const songMock2 = {
  title: 'new song2',
  artistId: 1,
  albumId: 1,
  length: '03:03',
  youtubeLink: 'gagag',
  trackNumber: 1,
};
const updateSongMock = {
  title: 'best',
  artistId: 1,
  albumId: 1,
  length: '03:03',
  youtubeLink: 'gagag',
  trackNumber: 1,
};

describe('songs api test', () => {
  beforeEach(async () => {
    await Songs.destroy({ truncate: true, force: true });
  });
  afterAll(async () => {
    await Songs.destroy({ truncate: true, force: true });
  });

  it('Can create song', async () => {
    const { body } = await request(app).post('/api/songs/').send(songMock);
    expect(body.name).toBe(songMock.name);
  });

  it('Can get searched song', async () => {
    const { body: newSong } = await request(app).post('/api/songs').send(songMock);
    const { body: getSearchSongs } = await request(app).get(`/api/songs/${songMock.title.substring(1, 3)}`);
    console.log('getSearchSongs', getSearchSongs);
    expect(getSearchSongs[0].title).toBe(songMock.title);
    expect(getSearchSongs[0].id).toBe(newSong.id);
  });

  it('can delete song', async () => {
    const { body: song } = await request(app).post('/api/songs/').send(songMock);
    const { body: song2 } = await request(app).post('/api/songs/').send(songMock2);
    const { body: getSongs } = await request(app).get('/api/songs/');
    expect(getSongs.length).toBe(2);
    await request(app).delete(`/api/songs/${song2.id}`);
    const { body: getSongs2 } = await request(app).get('/api/songs/');
    expect(getSongs2.length).toBe(1);
  });

  it('can update song', async () => {
    const { body } = await request(app).post('/api/songs/').send(songMock);
    expect(body.name).toBe(songMock.name);
    const { body: updateSong } = await request(app).put(`/api/songs/${body.id}`).send(updateSongMock);
    expect(updateSong.title).toBe('best');
  });
});
