import { Component, OnInit } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';
import {MenuItem, MessageService} from 'primeng/api';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';

@Component({
    selector: 'jhi-progressspinner',
    templateUrl: './progressspinnerdemo.component.html',
    styles: []
})
export class ProgressSpinnerDemoComponent implements OnInit {
    activeIndex = 0;

    constructor(private messageService: MessageService) {
    }

    ngOnInit(): void {

    }

    onChangeStep(label: string): void {
        this.messageService.add({severity: 'info', summary: label});
    }

}
