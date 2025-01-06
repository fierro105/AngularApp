import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, NgModule, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Config } from 'datatables.net';
import { Subject, Subscription } from 'rxjs';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Employee } from '../models/employee.model';
import { EmployeesService } from '../services/employees.service';
import { NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { EmployeesModalComponent } from '../employees-modal/employees-modal.component';

@Component({
  selector: 'app-employees',
  standalone: false,
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit, OnDestroy{

  public employees: Employee[] = [];
  
  columns: (keyof Employee)[];

  dtoptions: Config = {}
  dttrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false })
  dataelement!: DataTableDirective;

  constructor(private employeesService: EmployeesService, private modalService: NgbModal) {
    this.columns= Object.keys({
      id: '',
      name: '',
      last_name: '',
      email: '',
      position: '',
    }) as (keyof Employee)[];    

  }
  
//mediante el servicio despues del onsubmit se podria mandar a llamar un evento conj un subscribe para llamar el rerender
  ngOnInit() {
    this.dtoptions = {
      paging: true,
      searching: true,
      ordering: true,
      pagingType: 'full',
    };
  }

  ngAfterViewInit(): void {
    this.getAllEmployees();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dttrigger.unsubscribe();
    //this.suscription.unsubscribe();
  }

  rerender(): void {
    this.dataelement.dtInstance.then(dtInstance => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      console.log("RERENDER: ",this.employees);
      //this.employees = this.employeesService.employees;
      this.dttrigger.next(this.dtoptions);
    });
  }

  openModal(){
    const modalRef = this.modalService.open(EmployeesModalComponent, {
      size: 'l',
      backdrop: 'static'
    });
    modalRef.result.then((result : Employee) => {//esto se ejecuta despues de que el modal se cierra
      if(result){
        console.log("Modal Result0: ", this.employees);
        console.log("Modal Result1: ", result);
        this.employees.push(result);
        console.log("Modal Result2: ", this.employees);
        //this.rerender();
        //this.getAllEmployees();
      }
    });
  }

  closeModal(){
    this.modalService.dismissAll();
  }

  getAllEmployees() {
    this.employeesService.getAllEmployees().subscribe(
      (result: any) => {
        console.log("Hola: ",result);
        this.employees = result; // Asignamos los empleados al arreglo employees
        console.log("Hola2: ",this.employees);
        //this.rerender();
        this.dttrigger.next(this.employees);
      },
      (error) => {
        console.error(error); // Manejo de errores
      }
    );
    
  }

  getEmployeeById(employee: Employee) {
    if (employee.id != null) {
      this.employeesService.getEmployeeById(employee).subscribe(
        (result: Employee) => {
          
        },
        (error) => {
          console.error(error); // Manejo de errores
        }
      );
    } 
  }

  deleteEmployee(employee: Employee) {
    this.employeesService.deleteEmployee(employee);
    this.employees = this.employees.filter(emp => emp.id !== employee.id);
    this.rerender();
  }

  title = 'angularapp1.client';

}
