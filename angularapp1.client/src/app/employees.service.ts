import { Injectable } from '@angular/core';
import { Employee } from './models/employee.model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, subscribeOn, Subject, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class EmployeesService {

  private apiUrl = 'https://localhost:7126/employee/'; // URL de la API

  private selectedEmployee = new BehaviorSubject<any>(null);
  selectedEmployee$ = this.selectedEmployee.asObservable();

  private refreshEmployees$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$(){
    return this.refreshEmployees$;
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployeeById(employee: Employee): Observable<Employee> {
    this.selectedEmployee.next(employee);
    return this.http.get<Employee>(this.apiUrl + employee.id);
  }

  createEmployee(employee: Employee){
    this.http.post<Employee>(this.apiUrl, employee).subscribe(
      (result) => {
        this.refreshEmployees$.next();
        console.log("creado desde service: "+result);
      },
      (error) => {
        console.error(error);
      }
    );
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
