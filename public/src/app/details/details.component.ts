import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  petLike = {
    likes: ''
  };

  pet = {
    name: '',
    type: '',
    description: '',
    likes: Number
  };
  errors = []

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.getOne(params['id']);
    });
  }

  getOne(id) {
    const obs = this._httpService.getOne(id);
    obs.subscribe(data => {
      if (data['message'] === true) {
        this.pet = data['data'];
      } else {
          console.log('got error in getOne');
        }
    });
  }

  deletePet(id) {
    // var quantity = this.product.quantity
    let obs = this._httpService.deletePet(id);
    obs.subscribe(data => {
      if (data['message'] === true) {
        this.goHome();
      } else {
        console.log('We have an error in Delete');
      }
    });
  }

  addLike(_id, likes) {
    const obs = this._httpService.updateLike(_id, likes);
    obs.subscribe(data => {
      console.log('got data back', data);
        if (data['message'] == true) {
          this.petLike.likes = '';
        } else if (data['message'] == false) {
          for (var key in data['inputError']['errors']) {
            this.errors[key] = data['inputError']['errors'][key];
            console.log('got error!', this.errors);
        }
      }
    });
  }

  goHome() {
    this._router.navigate(['']);
  }

}
