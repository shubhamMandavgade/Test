import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Person } from '../models/person.model';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  constructor(public personService: PersonService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshPersonList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.personService.selectedPerson = {
      _id: "",
      name: "",
      age: "",
      gender: "",
      mob_no: ""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id) {
      this.personService.updateData(form.value).subscribe((res) => {
        console.log("PUT")
        this.resetForm(form);
        this.refreshPersonList();
      }, (err) => {
        console.log(err)
      });
    }
    else {
      this.personService.postData(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshPersonList();
        console.log("POST")
      }, (err) => {
        console.log(err)
      });
    }
  }

  refreshPersonList() {
    this.personService.getList().subscribe((res) => {
      this.personService.person = res as Person[];
    }, (err) => {
      console.log(err)
    });
}

onEdit(per: Person) {
  this.personService.selectedPerson = per;
}

onDelete(_id: string, form: NgForm) {
  if (confirm('Are you sure to delete this record ?') == true) {
    this.personService.deletePerson(_id).subscribe((res) => {
      this.refreshPersonList();
      this.resetForm(form);
    }, (err) => {
      console.log(err)
    });
  }
}

}
