import { Injectable } from '@angular/core';


export enum Gender {
  male,
  female
}

export interface Astronaut {
  displayName: string,
  gender: Gender,
  height: number,
  weight: number
}

export interface Rocket {
  fuel: number,
  crew: Astronaut[]
}

@Injectable({
  providedIn: 'root'
})
export class GotoschoolService {

  constructor() { }

  public async planA () {
    console.time("planA");
    console.log("ngủ dậy");
    await new Promise((resolve, reject)=>
    {
      setTimeout(() => {
        resolve(1);
      }, 1000);
    })


    console.log("đánh răng");
    await new Promise((resolve, reject)=>
    {
      setTimeout(() => {
        resolve(1);
      }, 1000);
    })

    console.log("đi học");
    await new Promise((resolve, reject)=>
    {
      setTimeout(() => {
        resolve(1);
      }, 1000);
    })

    console.timeEnd("planA");

  }

  public async planB () {
    console.time("planB");
    await Promise.all([
      new Promise((resolve, reject) => {
        console.log("ngủ dậy");
        setTimeout(() => {
          resolve(1);
        }, 1000);
      }),
      new Promise((resolve, reject) => {
        console.log("đánh răng");
        setTimeout(() => {
          resolve(1);
        }, 1000);
      })
    ]);

    console.log("đi học");
    await new Promise((resolve, reject)=>
    {
      setTimeout(() => {
        resolve(1);
      }, 1000);
    })
    console.timeEnd("planB");
  }

}
