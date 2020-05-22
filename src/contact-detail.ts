import { inject } from 'aurelia-framework';
import { WebAPI } from './web-api';
import { areEqual } from './utility';
import { Contact } from './interfaces';

@inject(WebAPI)
export class ContactDetail {
    public routeConfig;
    public contact: Contact;
    public originalContact: Contact;

    constructor(
        private api: WebAPI) {
    }

    public activate(params, routeConfig) {
        this.routeConfig = routeConfig;

        return this.api.getContactDetails(params.id).then(contact => {
            this.contact = <Contact>contact;
            this.routeConfig.navModel.setTitle(this.contact.firstName);
            this.originalContact = JSON.parse(JSON.stringify(this.contact));
        });
    }
    
    public get canSave() {
        return this.contact.firstName && this.contact.lastName && !this.api.isRequesting;
    }

    public save() {
        this.api.saveContact(this.contact).then(contact => {
            this.contact = <Contact>contact;
            this.routeConfig.navModel.setTitle(this.contact.firstName);
            this.originalContact = JSON.parse(JSON.stringify(this.contact));
        });
    }

    public canDeactivate() {
        if (!areEqual(this.originalContact, this.contact)) {
            return confirm('You have unsaved changes. Are you sure you want to leave?');
        }

        return true;
    }
}
