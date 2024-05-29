import { ChatService } from './../shared/API_service/chat.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/shared/API_service/auth.service';
import { TokenService } from 'app/shared/API_service/token.service';
import { AuthStateService } from 'app/shared/API_service/auth-state.service';
import { Message } from 'app/shared/model/message';
declare let Pusher: any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chatForm: FormGroup;
  my: string;
  group: string;
  messages: Message[] = [];
  mes: Message;
  email: string;

  constructor(
    private chatService: ChatService,
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService
  ) {
    this.chatForm = this.fb.group({
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getMessages();

    this.chatService.getMessage().subscribe(
      response => {
        Pusher.logToConsole = true;

        var pusher = new Pusher('ba142e4f65eba8c923b9', {
          cluster: 'mt1'
        });

        const channel = pusher.subscribe('groupChanel'.concat(response.group));
        channel.bind('my-event', (data) => {
          this.messages.push(data);
          this.scrollToBottom(); // Scroll to bottom when a new message is received
        });
      },
      error => {
        console.error('Error subscribing to messages:', error);
      }
    );
  }

  sendMessage(): void {
    if (this.chatForm.valid) {
      this.chatService.sendMessage(this.chatForm.value).subscribe(
        res => {
          console.log(res);
          this.scrollToBottom(); // Scroll to bottom when a new message is sent
        },
        error => {
          console.error('Error sending message:', error);
        }
      );
      this.chatForm.reset();
    }
  }

  getMessages(): void {
    this.chatService.getMessage().subscribe(
      response => {
        this.messages = response.message;
        this.my = response.my;
        this.group = response.group;
        this.email = response.email;
        this.scrollToBottom(); // Scroll to bottom when messages are loaded
      },
      error => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  scrollToBottom() {
    const messageList = document.getElementById("messageList");
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  }
}
