import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit, OnDestroy {

  constructor(private chatService: ChatService) { };
  title = 'app';
  message: String = ''
  client: any;
  messages = {};
  userName: String = '';
  chatRooms: Array<any> = [];
  chosenRoom: string;

  sendMessage() {
    this.chatService.sendMessage(this.chosenRoom, this.userName, this.message);
    this.message = '';
  }

  ngOnInit() {
    this.client = this.chatService.getMessages().subscribe(message => {
      if (this.messages[this.chosenRoom] === undefined) {
        this.messages[this.chosenRoom] = [];
      }
      this.messages[this.chosenRoom].push(message);

    })

    this.chatService.getRooms().subscribe(rooms => {
      this.chatRooms = rooms;
      this.chosenRoom = this.chatRooms[0].name;
    })
  }

  changeRoom() {
    console.log(this.messages);
  }

  
  ngOnDestroy() {
    this.client.unsubscribe();
  }
}
