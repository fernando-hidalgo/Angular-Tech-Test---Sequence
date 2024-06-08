export class Song {

    id: number
    title: string
    poster: string
    genre: Array<string>
    year: number
    duration: number
    rating: number
    artist: number

    constructor(id: number, title: string, poster: string, genre:Array<string>,year: number,duration: number,rating: number,artist:number) {
        this.id = id
        this.title = title
        this.poster = poster
        this.genre = genre
        this.year = year
        this.duration = duration
        this.rating = rating
        this.artist = artist
    }
}