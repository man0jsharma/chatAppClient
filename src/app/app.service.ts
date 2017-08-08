import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from "@angular/core";

@Injectable()
export class ChatService {
    private url = 'http://localhost:5000';
    private socket;
    constructor(private http: Http) { }

    sendMessage(chosenRoom, userName, message) {
        var msg = {
            room: chosenRoom,
            message: {
                userName: userName,
                message: message,
                timestamp: new Date()
            }
        }
        this.socket.emit('message-from-client', msg);
    }

    getMessages() {
        let observable = new Observable(observer => {
            this.socket = io(this.url);
            this.socket.on('message-from-server', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        })
        return observable;
    }

    getRooms() {
        return this.http.get('http://localhost:5000/api/rooms').map(res => res.json());
    }
}