const { Manga, Chapter, Page } = require('aidoku');

// Base URL of the manga website
const BASE_URL = "https://readallcomics.com";

async function getMangaList() {
    // Fetch manga list from the website
    let response = await fetch(`${BASE_URL}/comic-list`);
    let data = await response.json();

    let mangaList = data.map(item => new Manga({
        id: item.id,
        title: item.title,
        cover_url: item.cover,
        summary: item.summary,
        author: item.author,
        artist: item.artist,
        genres: item.genres,
        status: item.status,
        url: `${BASE_URL}/comic/${item.id}`
    }));

    return mangaList;
}

async function getChapterList(mangaId) {
    // Fetch chapter list for a specific manga
    let response = await fetch(`${BASE_URL}/comic/${mangaId}/chapters`);
    let data = await response.json();

    let chapterList = data.map(item => new Chapter({
        id: item.id,
        manga_id: mangaId,
        title: item.title,
        volume: item.volume,
        chapter: item.chapter,
        date_updated: item.date_updated,
        url: `${BASE_URL}/comic/${mangaId}/${item.id}`
    }));

    return chapterList;
}

async function getPageList(chapterId) {
    // Fetch page list for a specific chapter
    let response = await fetch(`${BASE_URL}/comic/${chapterId}/pages`);
    let data = await response.json();

    let pageList = data.map(item => new Page({
        index: item.index,
        url: item.url
    }));

    return pageList;
}

module.exports = {
    getMangaList,
    getChapterList,
    getPageList,
};
