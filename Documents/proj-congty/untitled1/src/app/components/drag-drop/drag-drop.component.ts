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
import interactionPlugin from '@fullcalendar/interaction';
import timegridPlugin from '@fullcalendar/timegrid';
import listPlug from '@fullcalendar/list';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

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
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek'
    },
    timeZone: 'local',
    initialView: 'listMonth',
    businessHours: true, // display business hours
    editable: true,
    plugins:[timegridPlugin,dayGridPlugin,interactionPlugin,listPlug],
    events: [
      {
        title: 'Business Lunch',
        start: '2025-01-03T13:00:00',
        constraint: 'businessHours'
      },
      {
        title: 'Meeting',
        start: '2025-01-13T11:00:00',
        // constraint: 'availableForMeeting', // defined below
        color: '#257e4a'
      },
      {
        title: 'Conference',
        start: '2025-01-18',
        end: '2025-01-20'
      },
      {
        title: 'Party',
        start: '2025-01-29T20:00:00'
      },

      // // areas where "Meeting" must be dropped
      // {
      //   groupId: 'availableForMeeting',
      //   start: '2025-01-11T10:00:00',
      //   end: '2025-01-11T16:00:00',
      //   display: 'background'
      // },
      // {
      //   groupId: 'availableForMeeting',
      //   start: '2025-01-13T10:00:00',
      //   end: '2025-01-13T16:00:00',
      //   display: 'background'
      // },
    //   // red areas where no events can be dropped
    //   {
    //     start: '2025-01-24',
    //     end: '2025-01-28',
    //     overlap: false,
    //     display: 'background',
    //     color: '#ff9f89'
    //   },
    //   {
    //     start: '2025-01-06',
    //     end: '2025-01-08',
    //     overlap: false,
    //     display: 'background',
    //     color: '#ff9f89'
    //   }
    ]

  };

  currentUser: any;

  //firebase auth
  constructor(private gateway: GatewayService,
              private auth: Auth) {
  }

  async login(){ // Tạo hàm login
    const credential = await signInWithPopup(this.auth, new GoogleAuthProvider());
    // Sử dụng signInWithPopup để đăng nhập bằng Google
    this.currentUser = credential.user; // Lưu thông tin người dùng vào biến currentUser
    console.log(this.currentUser); // Log ra thông tin người dùng
    const token = await credential.user.getIdToken(); // Lấy token của người dùng
    console.log(token); // Log ra token
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
