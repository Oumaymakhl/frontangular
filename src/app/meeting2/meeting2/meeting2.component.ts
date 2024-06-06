import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeetingService, listemeeting } from 'app/shared/API_service/meeting.service';
import { Meeting } from 'app/shared/model/meeting';
import PerfectScrollbar from 'perfect-scrollbar';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-meeting2',
  templateUrl: './meeting2.component.html',
  styleUrls: ['./meeting2.component.css']
})
export class Meeting2Component implements OnInit {

  reunions: Meeting[];

  constructor(
    private meetingService: MeetingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadReunions(); // Charger les réunions
  }

  loadReunions() {
    this.meetingService.getMeeting().subscribe(
      (response: listemeeting) => {
        this.reunions = response.meetings;
        this.initializeCalendar(); // Initialiser le calendrier après le chargement des réunions
        this.renderCalendarEvents();

        // Vérifiez si un ID de réunion est passé dans les paramètres de l'URL après avoir chargé les réunions
        this.route.queryParams.subscribe(params => {
          const meetingId = +params['meetingId']; // Convertir en number
          if (meetingId) {
            this.showMeetingDetailsById(meetingId);
          }
        });
      },
      (error) => {
        console.error('Error fetching meetings', error);
      }
    );
  }

  initializeCalendar() {
    const $calendar = $('#fullCalendar');

    $calendar.fullCalendar({
      viewRender: (view, element) => {
        if (view.name !== 'month') {
          const elem = $(element).find('.fc-scroller')[0];
          new PerfectScrollbar(elem);
        }
      },
      header: {
        left: 'title',
        center: 'month,agendaWeek,agendaDay',
        right: 'prev,next,today'
      },
      editable: false,
      eventLimit: true,
      eventClick: (calEvent, jsEvent, view) => {
        this.showMeetingDetails(calEvent);
      }
    });
  }

  renderCalendarEvents() {
    const events = this.reunions.map(reunion => ({
      id: reunion.id,
      title: reunion.titre,
      start: reunion.date,
      description: reunion.description,
      link: reunion.link
    }));

    $('#fullCalendar').fullCalendar('renderEvents', events, true);
  }

  showMeetingDetails(calEvent) {
    const { title, description, link, start } = calEvent;

    Swal.fire({
      title: 'Meeting Details',
      html: `
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Date:</strong> ${start}</p>
        ${link ? `<p><strong>Link:</strong> <a href="${link}" target="_blank">Rejoindre la réunion</a></p>` : ''}
      `,
      icon: 'info',
      confirmButtonText: 'OK'
    });
  }

  showMeetingDetailsById(meetingId: number) {
    const meeting = this.reunions.find(reunion => reunion.id === meetingId);

    if (meeting) {
      this.showMeetingDetails({
        id: meeting.id,
        title: meeting.titre,
        description: meeting.description,
        link: meeting.link,
        start: meeting.date
      });
    } else {
      console.error('Meeting not found');
    }
  }
}
