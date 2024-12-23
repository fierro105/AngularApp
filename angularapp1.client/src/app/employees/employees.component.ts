import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, NgModule, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Config } from 'datatables.net';
import { Subject, Subscription } from 'rxjs';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Employee } from '../models/employee.model';
import { EmployeesService } from '../employees.service';

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

  //suscription!: Subscription;

  constructor(private employeesService: EmployeesService) {
    this.columns= Object.keys({
      id: '',
      name: '',
      last_name: '',
      email: '',
      position: '',
      age: 0,
    }) as (keyof Employee)[];    
  }

  ngOnInit() {
    
    
    // this.suscription = this.employeesService.refresh$.subscribe(() => {
    //   this.getAllEmployees();
    // })

    this.dtoptions = {
      paging: true,
      searching: true,
      ordering: true,
      pagingType: 'full',
      columns: this.columns.map((key) => ({
        title: key.toString(),
        data: key.toString()
      }))
    };
    
    // this.dtoptions = {
    //   pagingType: 'full'
    // }
  }

  ngAfterViewInit(): void {
    //this.dttrigger.next(null);
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
      this.dttrigger.next(this.dtoptions);
    });
  }

  getAllEmployees() {
    this.employeesService.getAllEmployees().subscribe(
      (result: Employee[]) => {
        this.employees = result; // Asignamos los empleados al arreglo employees
        console.log(result);
        //this.columns = Object.keys(this.employees[0]);
        //this.dttrigger.next(null);
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
    this.employees = this.employees.filter(
      (employee) => employee.id !== employee.id
    );
    this.rerender();
  }

  title = 'angularapp1.client';

}
