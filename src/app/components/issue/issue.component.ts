import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface IssueReport {
  busNumber: string;
  route: string;
  issueType: string;
  description: string;
  dateTime: string;
  location: string;
  priority: string;
  contactName: string;
  contactEmail: string;
}
@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css'],
  imports: [CommonModule, FormsModule],
})
export class IssueComponent implements OnInit {
  ngOnInit(): void {

  }
  report: IssueReport = {
    busNumber: '',
    route: '',
    issueType: '',
    description: '',
    dateTime: '',
    location: '',
    priority: '',
    contactName: '',
    contactEmail: '',
  };

  submitted = false;
  isSubmitting = false;
  trackingId = '';

  onSubmit() {
    this.isSubmitting = true;

    setTimeout(() => {
      console.log('Issue Report Submitted:', this.report);

      this.trackingId =
        'BUS-' + Math.random().toString(36).substr(2, 9).toUpperCase();

      this.submitted = true;
      this.isSubmitting = false;

      setTimeout(() => {
        this.submitted = false;
        this.onReset();
      }, 5000);
    }, 1500);
  }

  onReset() {
    this.report = {
      busNumber: '',
      route: '',
      issueType: '',
      description: '',
      dateTime: '',
      location: '',
      priority: '',
      contactName: '',
      contactEmail: '',
    };
    this.submitted = false;
  }
}
