const request = require('supertest');
const app = require('../app');
const { Artists, Songs } = require('../models');

const artistMock = {
  name: 'new artist name',
  coverImg: 'hdjhfj',
};

const artistMock2 = {
  name: 'new artist name 2',
  coverImg: 'hdjhfj2',
};
const updateArtistMock = {
  name: 'gal',
  coverImg: 'hdjhfj2',
};

const songMock = {
  title: 'new artist song',
  artistId: 1,
  albumId: 1,
  length: '03:03',
  youtubeLink: 'gagag',
  trackNumber: 1,
};

describe('artist api test', () => {
  beforeEach(async () => {
    await Artists.destroy({ truncate: true, force: true });
    await Songs.destroy({ truncate: true, force: true });
  });
  afterAll(async () => {
    await Artists.destroy({ truncate: true, force: true });
    await Songs.destroy({ truncate: true, force: true });
  });

  it('Can create artist', async () => {
    const { body } = await request(app).post('/api/artists/').send(artistMock);
    expect(body.name).toBe(artistMock.name);
  });

  it('Can get searched artist', async () => {
    const { body: newArtist } = await request(app).post('/api/artists').send(artistMock);
    const { body: getSearchArtistResponseBody } = await request(app).get(`/api/artists/${artistMock.name.slice(5)}`);

    expect(getSearchArtistResponseBody[0].name).toBe(artistMock.name);
    expect(getSearchArtistResponseBody[0].id).toBe(newArtist.id);
  });

  it('can get artist songs', async () => {
    const { body: newArtist } = await request(app).post('/api/artists').send(artistMock);
    const { body: newSong } = await request(app).post('/api/songs').send(songMock);
    const { body: getArtistSongs } = await request(app).get(`/api/artists/${newArtist.id}/songs`);
    console.log('getArtistSongs', getArtistSongs[0].Songs[0].title);

    expect(getArtistSongs[0].id).toBe(newArtist.id);
    expect(getArtistSongs[0].Songs[0].title).toBe(newSong.title);
    expect(getArtistSongs[0].Songs[0].id).toBe(newSong.id);
  });

  it('can delete artist', async () => {
    const { body: newArtist1 } = await request(app).post('/api/artists').send(artistMock);
    const { body: newArtist2 } = await request(app).post('/api/artists').send(artistMock2);

    const { body: getArtists } = await request(app).get('/api/artists/');
    expect(getArtists.length).toBe(2);

    await request(app).delete(`/api/artists/${newArtist2.id}`);
    const { body: getArtists2 } = await request(app).get('/api/artists/');
    expect(getArtists2.length).toBe(1);
  });

  it('can update artist', async () => {
    const { body } = await request(app).post('/api/artists').send(artistMock);
    expect(body.name).toBe(artistMock.name);
    const { body: updateArtist } = await request(app).put(`/api/artists/${body.id}`).send(updateArtistMock);
    expect(updateArtist.name).toBe('gal');
  });
});
