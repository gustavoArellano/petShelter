import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  newPet: any;

  pet= {
    name: '',
    type: '',
    description: '',
    skill1: '',
    skill2: '',
    skill3: ''
  };

  errors = [];

  ngOnInit() {
    this.newPet = {
      name: '',
      type: '',
      description: '',
      skill1: '',
      skill2: '',
      skill3: ''
    };
  }

  createPet() {
    // console.log('am i being clicked on?')
    const obs = this._httpService.createPet(this.newPet);
    obs.subscribe(data => {
    console.log('got data back', data);
      if (data['message'] == true) {
        this.ngOnInit();
        this.goHome();
      } else if (data['message'] == false) {
        for (var key in data['inputError']['errors']) {
          this.errors[key] = data['inputError']['errors'][key];
          console.log('got error!', this.errors);
        }
      }
      console.log('We have an error in create product!', data);
    });
  }

  goHome() {
    this._router.navigate(['']);
  }

}


