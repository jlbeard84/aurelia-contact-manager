import { WebAPI } from './web-api';
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ContactViewed, ContactUpdated } from './messages';

@inject(WebAPI, EventAggregator)
export class ContactList {
    public contacts;
    public selectedId = 0;

    constructor(
        private api: WebAPI,
        private ea: EventAggregator) {

        ea.subscribe(ContactViewed, msg => this.select(msg.contact));
        
        ea.subscribe(ContactUpdated, msg => {
            const id = msg.contact.id;
            const found = this.contacts.find(x => x.id == id);
            Object.assign(found, msg.contact);
        });
    }

    public created(): void {
        this.api.getContactList().then(contacts => this.contacts = contacts);
    }

    public select(contact): boolean {
        this.selectedId = contact.id;
        return true;
    }
}
