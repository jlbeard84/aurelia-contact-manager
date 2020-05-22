import { WebAPI } from './web-api';
import { inject } from 'aurelia-framework';

@inject(WebAPI)
export class ContactList {
    public contacts;
    public selectedId = 0;

    constructor(
        private api: WebAPI) {
    }

    public created(): void {
        this.api.getContactList().then(contacts => this.contacts = contacts);
    }

    public select(contact): boolean {
        this.selectedId = contact.id;
        return true;
    }
}
