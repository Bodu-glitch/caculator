import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaculateService {

  constructor() { }

  public calc (a:number, b:number, op: (n1:number, n2:number) => number):number {
    return op(a,b);
  }

  public add (a:number, b:number):number {
    return a+b;
  }

  public divide (a:number, b:number):number {
    return a/b;
  }
}
