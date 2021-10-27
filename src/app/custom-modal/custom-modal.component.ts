import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyService } from '../_services/company.service';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.css']
})
export class CustomModalComponent implements OnInit {

  form: any = {
    zip_code: '',
    city: '',
    street: '',
    house_number: '',
    name: '',
    nip: ''
  };
  isSignupFailed = false;
  isSuccessful = false;
  errorMessage = '';

  constructor(public activeModal: NgbActiveModal, private companyService: CompanyService) { }

  ngOnInit(): void {
  }

  closeModal(message: string) {
    this.activeModal.close();
  }

  onSubmit(): void {
    const data = {
      zip_code: this.form.zip_code,
      city: this.form.city,
      street: this.form.street,
      house_number: this.form.house_number,
      name: this.form.name,
      nip: this.form.nip
    };

    this.companyService.create(data).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignupFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignupFailed = true;
      }
    );
  }
}

