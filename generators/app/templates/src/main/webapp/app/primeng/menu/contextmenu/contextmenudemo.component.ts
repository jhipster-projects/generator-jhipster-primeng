import { Component, OnInit } from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {EmployeeService} from './service/employee.service';
import Employee from './service/employee';

@Component({
    selector: 'jhi-contextmenu',
    templateUrl: './contextmenudemo.component.html',
    styles: []
})
export class ContextMenuDemoComponent implements OnInit {
    selectedEmployee: Employee;
    activeIndex = 0;
    employees: Employee[];
    documentItems: MenuItem[];
    targetItems: MenuItem[];
    tableItems: MenuItem[];

    constructor(private employeeService: EmployeeService, private messageService: MessageService) {
        this.selectedEmployee = {} as Employee;
        this.employees = [];
        this.documentItems = [];
        this.targetItems = [];
        this.tableItems = [];
    }

    ngOnInit(): void {
        this.employeeService.getEmployees().subscribe((employees: any) => {
            this.employees = employees.data;
        });
        this.documentItems = [
            {
                label: 'File',
                icon: 'fa fa-file-o',
                items: [{
                    label: 'New',
                    icon: 'fa fa-plus',
                    items: [
                        {label: 'Project'},
                        {label: 'Other'},
                    ],
                    expanded: true
                },
                    {label: 'Open'},
                    {label: 'Quit'}
                ],
            },

            {
                label: 'Edit',
                icon: 'fa fa-edit',
                items: [
                    {label: 'Cut', icon: 'fa fa-cut'},
                    {label: 'Copy', icon: 'fa fa-copy'},
                    {label: 'Paste', icon: 'fa fa-paste'},
                    {label: 'Undo', icon: 'fa fa-mail-forward'},
                    {label: 'Redo', icon: 'fa fa-mail-reply'},
                    {
                        label: 'Find', icon: 'fa fa-search', items: [
                        {label: 'Find Next'},
                        {label: 'Find Previous'},
                    ]
                    }
                ]
            },
            {
                label: 'View',
                icon: 'fa fa-question',
                items: [
                    {
                        label: ''
                    },
                    {
                        label: 'Tool windows',
                        icon: 'fa fa-search',
                        items: [
                            {
                                label: 'Project',
                                items: [
                                    {
                                        label: 'Workspace'
                                    }
                                ]
                            },
                            {
                                label: 'Run'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Help',
                icon: 'fa fa-question',
                items: [
                    {
                        label: 'Contents'
                    },
                    {
                        label: 'Search',
                        icon: 'fa fa-search',
                        items: [
                            {
                                label: 'Text',
                                items: [
                                    {
                                        label: 'Workspace'
                                    }
                                ]
                            },
                            {
                                label: 'File'
                            }
                        ]
                    }
                ]
            }
        ];

        this.targetItems = [
            {
                label: 'Next',
                icon: 'fa fa-chevron-right'
            },
            {
                label: 'Prev',
                icon: 'fa fa-chevron-left'
            }
        ];

        this.tableItems = [
            {label: 'View', icon: 'fa fa-search', command: () => this.viewEmployee(this.selectedEmployee)},
            {label: 'Delete', icon: 'fa fa-close', command: () => this.deleteEmployee(this.selectedEmployee)},
            {label: 'Help', icon: 'fa fa-close', url: 'https://www.opm.gov/policy-data-oversight/worklife/employee-assistance-programs/'}
        ];
    }

    viewEmployee(employee: Employee): void {
        this.messageService.add({severity: 'info', summary: 'Employee Selected', detail: employee.name + ' - ' + employee.id});
    }

    deleteEmployee(employee: Employee): void {
        for (let i = 0; i < this.employees.length; i++) {
            if (this.employees[i].id === employee.id) {
                this.employees.splice(i, 1);
                this.messageService.add({severity: 'info', summary: 'Employee Deleted', detail: employee.name + ' - ' + employee.id});
                break;
            }
        }
    }

    onChangeStep(label: string): void {
        this.messageService.add({severity: 'info', summary: label});
    }
}
