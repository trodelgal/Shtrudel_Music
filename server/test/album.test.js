const request = require('supertest');
const app = require('../app');
const { Albums } = require('../models');

const albumMock = {
  name: 'new album',
  artistId: 1,
  coverImg: 'img1',
};

const albumMock2 = {
  name: 'new album2',
  artistId: 1,
  coverImg: 'img2',
};
const updateAlbumMock = {
  name: 'update album',
  artistId: 1,
  coverImg: 'img3',
};

const songMock = {
  title: 'new artist song',
  artistId: 1,
  albumId: 1,
  length: '03:03',
  youtubeLink: 'gagag',
  trackNumber: 1,
};

describe('album api test', () => {
  beforeEach(async () => {
    await Albums.destroy({ truncate: true, force: true });
  });
  afterAll(async () => {
    await Albums.destroy({ truncate: true, force: true });
  });

  it('Can create album', async () => {
    const { body } = await request(app).post('/api/albums/').send(albumMock);
    expect(body.name).toBe(albumMock.name);
  });

  it('Can get searched album', async () => {
    const { body: newAlbum } = await request(app).post('/api/albums/').send(albumMock);
    const { body: getSearchAlbum } = await request(app).get(`/api/albums/${albumMock.name.substring(3, 5)}`);

    expect(getSearchAlbum[0].name).toBe(albumMock.name);
    expect(getSearchAlbum[0].id).toBe(newAlbum.id);
  });

//   it('can get artist songs', async () => {
//     const { body: newArtist } = await request(app).post('/api/artists').send(artistMock);
//     const { body: newSong } = await request(app).post('/api/songs').send(songMock);
//     const { body: getArtistSongs } = await request(app).get(`/api/artists/${newArtist.id}/songs`);
//     console.log('getArtistSongs', getArtistSongs[0].Songs[0].name);

//     expect(getArtistSongs[0].id).toBe(newArtist.id);
//     expect(getArtistSongs[0].Songs[0].name).toBe(newSong.name);
//     expect(getArtistSongs[0].Songs[0].id).toBe(newSong.id);
//   });

  it('can delete album', async () => {
    const { body } = await request(app).post('/api/albums').send(albumMock);
    const { body: newAlbum2 } = await request(app).post('/api/albums').send(albumMock2);

    const { body: getAlbums } = await request(app).get('/api/albums/');
    expect(getAlbums.length).toBe(2);

    await request(app).delete(`/api/albums/${newAlbum2.id}`);
    const { body: getAlbums2 } = await request(app).get('/api/albums/');
    expect(getAlbums2.length).toBe(1);
  });

  it('can update album', async () => {
    const { body } = await request(app).post('/api/albums').send(albumMock);
    expect(body.name).toBe(albumMock.name);
    const { body: updateAlbum } = await request(app).put(`/api/albums/${body.id}`).send(updateAlbumMock);
    expect(updateAlbum.name).toBe(updateAlbumMock.name);
  });
});
