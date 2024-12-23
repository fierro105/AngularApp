export class Employee {
    id: string;
    name: string;
    last_name: string;
    email: string;
    position: string;
    age: number;
    

      // Firma de índice para permitir el acceso dinámico a las propiedades
      [key: string]: string | number;
  
    constructor(
        id: string,
        name: string,
        last_name: string,
        email: string,
        position: string,
        age: number
      ) {
        this.id = id ?? "";
        this.name = name;
        this.last_name = last_name;
        this.email = email;
        this.position = position;
        this.age = age;
      }
}