import { Injectable } from '@angular/core';
import { Person } from './models/person.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  selectedPerson: Person;
  person: Person[];
  readonly baseURL = 'http://localhost:3000/person';
  constructor(private http : HttpClient) { }

  postData(per: Person) {
    return this.http.post(this.baseURL, per);
  }
  getList() {
    return this.http.get(this.baseURL);
  }

  updateData(per: Person) {
    return this.http.put(this.baseURL + `/${per._id}`, per);
  }

  deletePerson(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
