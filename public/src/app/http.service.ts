import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  createPet(pet) {
    return this._http.post('/create', pet);
  }

  getPets() {
    return this._http.get('/getall');
  }

  getOne(id) {
    return this._http.get('/pet/' + id);
  }

  deletePet(id) {
    return this._http.delete('/delete/' + id);
  }

  updatePet(id, pet) {
    return this._http.put('/update/' + id, pet);
  }

  updateLike(id, likes) {
    console.log('am i passing updateLike?')
    return this._http.put('/updateLike/' + id, likes);
  }
}
