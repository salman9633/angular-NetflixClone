import { Title } from "@angular/platform-browser";

export interface Movie {
    dates:Dates;
    page:number;
    results?:(resultsEntity)[]|null;
    total_pages:number;
    total_results:number;
}
export interface Dates{
    maximum:string;
    minimum:string;
}
export interface resultsEntity{
    name: string;
    adult:boolean;
    backdrop_path: string;
    genre_ids?:(number)[]|null;
    id:number;
    original_language:string;
    original_title:string;
    overview:string;
    popularity:number;
    poster_path:string;
    release_date:string;
    title:string;
    vote_average: number;
    video:boolean;

}
