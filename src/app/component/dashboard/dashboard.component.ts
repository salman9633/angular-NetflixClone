import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Model/movie';
import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getLatestMovie();
    this.getPopularMovies();
    this.getNowPlayingMovies();
    this.getTopRatedMovies();
    this.getUpcomingMovies();
    this.getTrendingMovies();
    this.getOriginals();
  }

  latestMovies : any;
  popularMovies!: Movie;
  nowPlayingMovies!: Movie;
  topRatedMovies!: Movie;
  upcomingMovies!: Movie;
  trendingMovies!: Movie;
  originals!: Movie;

  getLatestMovie() {
    this.dataService.getLatestMovie().subscribe((res) => {
      this.latestMovies = this.changeData(res);
      console.log(res);

    }, err => {
      console.log('Not able to get latest movies', err);
    })
  }

  changeData(res: any): any {
    if (!res.backdrop_path) {
      res.backdrop_path = 'https://image.tmdb.org/t/p/original' + res.poster_path + '?api_key=' + environment.api_key;
    } else {
      res.backdrop_path = 'https://image.tmdb.org/t/p/original' + res.backdrop_path + '?api_key=' + environment.api_key;
    }

    return res;
  }

  getPopularMovies() {
    this.dataService.getPopularMovies().subscribe(res => {
      this.popularMovies = this.modifyData(res);
    }, err => {
      console.log('Not able to get popular movies', err);
    })
  }

  getNowPlayingMovies() {
    this.dataService.getNowPlayingMovies().subscribe(res => {
      this.nowPlayingMovies = this.modifyData(res);
    }, err => {
      console.log('Not able to get now playing movies', err);
    })
  }

  getTopRatedMovies() {
    this.dataService.getTopRatedMovies().subscribe(res => {
      this.topRatedMovies = this.modifyData(res);
    }, err => {
      console.log('Not able to get top rated movies', err);
    })
  }

  getUpcomingMovies() {
    this.dataService.getUpcomingMovies().subscribe(res => {
      this.upcomingMovies = this.modifyData(res);
    }, err => {
      console.log('Not able to get upcoming movies', err);
    })
  }

  getTrendingMovies() {
    this.dataService.getTrendingMovies().subscribe(res => {
      this.trendingMovies = this.modifyData(res);
    }, err => {
      console.log('Not able to get trending movies', err);
    })
  }

  getOriginals() {
    this.dataService.getOriginals().subscribe(res => {
      this.originals = this.modifyData(res);
    }, err => {
      console.log('Not able to get originals movies', err);
    })
  }

  modifyData(movies: Movie): Movie {
    if (movies.results) {
      movies.results.forEach(element => {
        element.backdrop_path = 'https://image.tmdb.org/t/p/original' + element.backdrop_path + '?api_key=' + environment.api_key;
        if (!element.title) {
          element.title = element.name;
        }
      });
    }
    return movies;
  }
}
