import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/_services/department.service';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/_services/company.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomModalComponent } from '../custom-modal/custom-modal.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
    phone: null,
    department: null,
    company: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  departments?: Department[];
  companies?: Company[];
  sh: any = 1;
  isChecked: boolean = true;
  closeModal: any;

  constructor(private authService: AuthService, private departmentService: DepartmentService,
     private companyService: CompanyService, public modalService: NgbModal) {
      }

  ngOnInit(): void {
    this.retrieveDepartments();
    this.retrieveCompanies();
  }

  retrieveDepartments(): void {
    this.departmentService.getAll().subscribe(
      data => {
        this.departments = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  retrieveCompanies(): void {
    this.companyService.getAll().subscribe(
      data => {
        this.companies = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  refreshDepartments(): void {
    this.retrieveDepartments();
    this.retrieveCompanies();
  }

  openModal() {
    const modalRef = this.modalService.open(CustomModalComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
      });
    modalRef.result.then((result:any) => {
      console.log(result);
    }, (reason:any) => {
      this.refreshDepartments();
    });
  }

  onSubmit(): void {
    const { username, password, phone, department, company} = this.form;
    
    this.authService.register(username, password, phone, department, company).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}


