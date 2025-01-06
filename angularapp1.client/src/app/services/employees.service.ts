import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, subscribeOn, Subject, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class EmployeesService {
  public employees: Employee[] = [];

  private apiUrl = 'https://localhost:7126/employee/'; // URL de la API

  private selectedEmployee = new BehaviorSubject<any>(null);
  selectedEmployee$ = this.selectedEmployee.asObservable();

  private refreshEmployees = new BehaviorSubject<Employee[]>([]);
  employees$ = this.refreshEmployees.asObservable();

  constructor(private http: HttpClient) { }

  get refresh$(){
    
    return this.refreshEmployees.value;
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployeeById(employee: Employee): Observable<Employee> {
    this.selectedEmployee.next(employee);
    return this.http.get<Employee>(this.apiUrl + employee.id);
  }

  createEmployee(employee: Employee): Observable<Employee>{
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  deleteEmployee(employee: Employee){
    this.http.delete(this.apiUrl + employee.id).subscribe(
      (result) => {
        console.log("borrado desde service: "+result);
        console.log(employee.id);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
