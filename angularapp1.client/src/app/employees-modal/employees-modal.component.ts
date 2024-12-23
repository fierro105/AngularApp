import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Employee } from '../models/employee.model';
import { EmployeesService } from '../employees.service';


@Component({
  selector: 'app-employees-modal',
  standalone: false,
  
  templateUrl: './employees-modal.component.html',
  styleUrl: './employees-modal.component.css'
})

export class EmployeesModalComponent implements OnInit {

  checkoutForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private employeesService: EmployeesService) {
    this.checkoutForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      position: ['', [Validators.required]],
      age: [null as number | null, [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.employeesService.selectedEmployee$.subscribe((employee) => {
      if(employee != null){
        this.checkoutForm.patchValue(employee);
      }else{
        this.checkoutForm.reset(); // Reinicia el formulario a sus valores iniciales
      }
    });
  }


  onSubmit() {
    console.log(this.checkoutForm.value);
        var newEmployee: Employee = {
          age: this.checkoutForm.value.age || 0,
          email: this.checkoutForm.value.email || "",
          id: this.checkoutForm.value.id || "",
          last_name: this.checkoutForm.value.last_name || "",
          name: this.checkoutForm.value.name || "",
          position: this.checkoutForm.value.position || "",
        };
    
    this.employeesService.createEmployee(newEmployee);
  }

  getEmployeeById(employee: Employee | null) {
    if (employee == null) {
      this.checkoutForm.reset(); // Reinicia el formulario a sus valores iniciales
    } 
  }

}
