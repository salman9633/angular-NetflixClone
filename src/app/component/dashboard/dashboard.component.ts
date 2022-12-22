import { Component, OnInit } from '@angular/core';
import { Movie } from '../../Model/movie'
import { DataService } from 'src/app/service/data.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ngOnInit(): void {
    this.getLatestMovie();
    this.getPopularMovies();
    this.getNowPlayingMovies();
    this.getTopRatedMovies();
    this.getUpcomingMovies();
    this.getTrendingMovies();
    this.getOriginals();
  }

  latestMovie: any;
  popularMovies !: Movie;
  nowPlayingMovies !: Movie;
  topRatedMovies !: Movie;
  upComingMovies !: Movie;
  trendingMovies !: Movie;
  originals !: Movie;


  constructor(private dataService: DataService) {

  }



  getLatestMovie() {
    this.dataService.getLatestMovie().subscribe((res: any) => {
      console.log(res, 'ppppppppppppppp');

      this.latestMovie = this.changeData(res);
      console.log(this.latestMovie, 'llllllllllll');

    }, (err: any) => {
      console.log("NO LATEST", err);

    })
  }
  changeData(res: any): any {
    if (!res.backdrop_path) {
      res.backdrop_path = 'https://image.tmbd.org/t/p/original' + res.poster_path + '?api_key=' + environment.api_key;
    } else {
      res.backdrop_path = 'https://image.tmbd.org/t/p/original' + res.backdrop_path + '?api_key=' + environment.api_key;
    }
    console.log(res, 'yyyy');

    return res;
  }

  getPopularMovies() {
    this.dataService.getPopularMovies().subscribe((res: any) => {
      this.popularMovies = this.modifyData(res);
    }, (err: any) => {
      console.log("NO Popular", err);

    })
  }

  getNowPlayingMovies() {
    this.dataService.getNowPlayingMovies().subscribe((res: any) => {
      this.nowPlayingMovies = this.modifyData(res);
    }, (err: any) => {
      console.log("NO NOWPLAYING", err);

    })
  }
  getTopRatedMovies() {
    this.dataService.getTopRatedMovies().subscribe((res: any) => {
      this.topRatedMovies = this.modifyData(res);
    }, (err: any) => {
      console.log("NO topRatedMovies", err);

    })
  }
  getUpcomingMovies() {
    this.dataService.getUpcomingMovies().subscribe((res: any) => {
      this.upComingMovies = this.modifyData(res);
    }, (err: any) => {
      console.log("NO upComingMovies", err);

    })
  }
  getTrendingMovies() {
    this.dataService.getTrendingMovies().subscribe((res: Movie) => {
      console.log(res, 'eeeeeeeeeeeeeeee');

      this.trendingMovies = this.modifyData(res);
    }, (err: any) => {
      console.log("NO trendingMovies", err);

    })
  }
  getOriginals() {
    this.dataService.getOriginals().subscribe((res: any) => {
      this.originals = this.modifyData(res);
    }, (err: any) => {
      console.log("NO trendingMovies", err);

    })
  }

  modifyData(movies: Movie): Movie {
    if (movies.results) {
      movies.results.forEach(element => {
        element.backdrop_path = 'https://image.tmbd.org/t/p/original' + element.backdrop_path + '?api_key=' + environment.api_key;
        if (!element.title) {
          element.title = element?.name;
        }
      })
    }
    console.log(movies,'movies......................');
    
    return movies;
  }
}
