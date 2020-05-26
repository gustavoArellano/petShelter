import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  pet: any;

  petInfo = {
    name: '',
    type: '',
    description: '',
    skill1: '',
    skill2: '',
    skill3: ''
  };

  errors = [];

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.getOne(params['id']);
    });
  }

  getOne(id) {
    const obs = this._httpService.getOne(id);
    obs.subscribe(data => {
      if (data['message'] === true) {
        this.petInfo = data['data'];
      } else {
          console.log('got error in getOne inside update');
        }
    });
  }

  changePet(_id) {
    console.log(_id);
    const obs = this._httpService.updatePet(_id, this.petInfo);
    obs.subscribe(data => {
      console.log('got data back', data);
        if (data['message'] == true) {
          this.petInfo.name = '';
          this.petInfo.type = '';
          this.petInfo.description = '';
          this.petInfo.skill1 = '';
          this.petInfo.skill2 = '';
          this.petInfo.skill3 = '';
          this.goHome();
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
