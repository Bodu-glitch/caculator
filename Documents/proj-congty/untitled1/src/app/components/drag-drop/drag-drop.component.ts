import {Component, OnInit} from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
  CdkDropListGroup
} from '@angular/cdk/drag-drop';
import {GatewayService} from '../../services/gateway.service';
import {NgClass} from '@angular/common';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {FullCalendarModule} from '@fullcalendar/angular';

interface card {
  id: string;
  columnId: string;
  title: string;
  description: string;
}

interface column {
  id: string;
  title: string;
  cards: card[];
}

const columns: column[] = [
  {
    id: 'todo',
    title: 'To Do',
    cards: [
      {
        id: '1',
        columnId: 'todo',
        title: 'Get to work',
        description: 'Get to work'
      },
      {
        id: '2',
        columnId: 'todo',
        title: 'Pick up groceries',
        description: 'Pick up groceries'
      },
      {
        id: '3',
        columnId: 'todo',
        title: 'Go home',
        description: 'Go home'
      },
      {
        id: '4',
        columnId: 'todo',
        title: 'Fall asleep',
        description: 'Fall asleep'
      }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    cards: [
      {
        id: '5',
        columnId: 'done',
        title: 'Get up',
        description: 'Get up'
      },
      {
        id: '6',
        columnId: 'done',
        title: 'Brush teeth',
        description: 'Brush teeth'
      },
      {
        id: '7',
        columnId: 'done',
        title: 'Take a shower',
        description: 'Take a shower'
      },
      {
        id: '8',
        columnId: 'done',
        title: 'Check e-mail',
        description: 'Check e-mail'
      },
      {
        id: '9',
        columnId: 'done',
        title: 'Walk dog',
        description: 'Walk dog'
      }
    ]
  }
];

@Component({
  selector: 'app-drag-drop',
  imports: [
    CdkDropList, CdkDrag, CdkDropListGroup, FullCalendarModule
  ],
  templateUrl: './drag-drop.component.html',
  standalone: true,
  styleUrl: './drag-drop.component.scss'
})
export class DragDropComponent implements OnInit{
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: false,
    events: [
      { title: 'Meeting', start: new Date(), end: new Date().setDate(15) },
    ]
  };
  constructor(private gateway: GatewayService) {
  }

  isMouseLeave = false;
  data: {
    id: string;
    x: number;
    y: number;
  } = { id: 'abc', x: 0, y: 0 };
  ngOnInit() {
      this.gateway.getMessage().subscribe((data: unknown) => {
          console.log(data);
        });
      this.gateway.listenForTasksChange().subscribe((data: column[]) => {
          this.columns = data;
      })
      this.gateway.listenForMouseMove().subscribe((data: {id:string, x: number, y: number}) => {
        console.log(data)
        this.data = data;
      })
      this.gateway.joinBoard('abc', this.columns);
  }

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  columns: column[] = [
    { ...columns[0], cards: [...columns[0].cards] },
    { ...columns[1], cards: [...columns[1].cards] }
  ];
  drop(event: CdkDragDrop<card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    console.log(this.columns);
    this.gateway.onTasksChange('abc', this.columns);
  }

  reset() {
    this.columns = [
      { ...columns[0], cards: [...columns[0].cards] },
      { ...columns[1], cards: [...columns[1].cards] }
    ];
  }

  onMouseMove($event: MouseEvent) {
    this.gateway.onMouseMove($event.x, $event.y);
  }

  protected readonly console = console;
}
