// app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { CounterState } from './ngrx/counter/counterstate';
import * as CounterActions from './ngrx/counter/counter.actions';
import { Observable, take } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimeState } from './ngrx/time/time.state';
import * as TimeActions from './ngrx/time/time.actions';
import { GotoschoolService } from './services/gotoschool.service';
import { CaculatorState } from './ngrx/caculator/caculator.state';
import * as CaculatorActions from './ngrx/caculator/caculator.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, FormsModule, DatePipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngrx-demo';

  public time!: any;
  display: string = '';
  operator!: string;
  value1: number = 0;
  value2: number = 0;

  public inputNum!: number;

  time$: Observable<any>;
  count$: Observable<number>;
  caculator$: Observable<string>;

  constructor(
    private store: Store<{
      counter: CounterState;
      timer: TimeState;
      caculator: CaculatorState;
    }>,
    public gotoschoolService: GotoschoolService
  ) {
    this.caculator$ = this.store.select('caculator', 'display');
    this.count$ = this.store.select('counter', 'count');
    this.time$ = this.store.select('timer', 'time');
    this.gettime();
  }

  public increase() {
    this.store.dispatch(CounterActions.increase());
  }

  public decrease() {
    this.store.dispatch(CounterActions.decrease());
  }

  public inputN() {
    this.store.dispatch(CounterActions.inputN({ n: this.inputNum }));
    console.log(this.count$);
    console.log(this.inputNum);
  }

  public reset() {
    this.store.dispatch(CounterActions.reset());
  }

  public gettime() {
    setInterval(() => {
      this.store.dispatch(TimeActions.getTime());
    }, 1000);
  }

  public appendNum(number: string) {
    this.display += number;
  }

  public displayNum(num: string) {
    this.store.dispatch(CaculatorActions.displayNum({ num }));
  }

  public setOperator(operator: string) {
    this.operator = operator;
    this.caculator$.subscribe((value) => {
      this.value1 = parseFloat(value);
    });
    console.log(this.value1);
    this.store.dispatch(CaculatorActions.clearstate());
  }

  public calculate() {
    this.caculator$.subscribe((value) => {
      this.value2 = parseFloat(value);
    });
    console.log(this.value2);

    switch (this.operator) {
      case '+':
        this.store.dispatch(
          CaculatorActions.add({
            num1: this.value1.toString(),
            num2: this.value2.toString(),
          })
        );
        break;
      case '-':
        this.store.dispatch(
          CaculatorActions.sub({
            num1: this.value1.toString(),
            num2: this.value2.toString(),
          })
        );
        break;
      case '*':
        this.store.dispatch(
          CaculatorActions.mul({
            num1: this.value1.toString(),
            num2: this.value2.toString(),
          })
        );
        break;
      case '/':
        this.store.dispatch(
          CaculatorActions.div({
            num1: this.value1.toString(),
            num2: this.value2.toString(),
          })
        );
        break;
    }
  }
  public clear() {
    this.store.dispatch(CaculatorActions.clearstate());
    this.value1 = 0;
    this.value2 = 0;
    this.operator = '';
  }
}
