import { EntityService } from '../../entity/entity.service';
import { Observable, Subject, Subscriber, Subscription } from 'rxjs/Rx';

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { Form } from '../form.model';
import { Entity } from '../../entity/entity.model';
import { FormService } from '../form.service';
import { Status } from '../../shared/status.model';
import { Tools } from '../../shared/tools.model';
import { PageSettings } from '../../shared/pageSettings.model';
import { KeyValue } from '../../shared/keyValue.model';

import { AngularFire, AuthProviders, AuthMethods, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-forms-details',
  templateUrl: './formDetails.component.html',
  styleUrls: ['./formDetails.component.scss'],
  providers: [
    FormService,
    EntityService
  ]
})
export class PageFormDetailsComponent {
  _pageSettings: PageSettings;
  _subscription: Array<Subscription>;
  tools: Array<any>;
  formSections: Array<any>;
  statusList: Array<KeyValue>;
  formId: string;
  form$: FirebaseObjectObservable<Form>;
  entities$: FirebaseListObservable<Entity[]>;
  form: Form;
  entities: Array<Entity>;

  getkeys(list): Array<KeyValue> {
    var keys = Object.keys(list);
    keys = keys.slice(keys.length / 2);

    return keys.map((item) => {
      return new KeyValue(item, Status[item]);
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "OK", {
      duration: 3000,
    });
  }

  onSubmit(event, valid) {
    var self = this;
    event.preventDefault();
    if (valid) {

      this.fs.updateForm(this.form)
        .then((response) => {
          self.openSnackBar("Successfully saved form.");
        }, (response) => {
          self.openSnackBar("Failed to save form. Please try again.");
        });

      this.es.updateEntities(this.formId, this.entities)
        .subscribe((response) => {
          self.openSnackBar("Entities saved.");
        }, (response) => {
          self.openSnackBar("Failed to save Entities. Please try again.");
        });
    }
  }

  ngOnInit() {
    this.statusList = this.getkeys(Status);
    this.tools = Object.keys(Tools).filter(key => !isNaN(Number(key)));
    this._pageSettings = new PageSettings(true);
    this._subscription = [];

    this.route.params.forEach((params: Params) => {
      this.formId = params['id'];
    });

    if (!this.formId) {
      this.router.navigate(['PageNotFound']);
      return;
    }

    this.setupSubscriptions();
  }

  setupSubscriptions() {
    this.form$ = this.fs.getForm(this.formId);
    this.entities$ = this.es.getEntities(this.formId);

    this._subscription.push(this.form$.subscribe((data) => {
      this.form = data;
      this._pageSettings.stopLoading();
    }));
    this._subscription.push(this.entities$.subscribe((data) => {
      this.entities = data;
    }));
  }

  addToolSuccess($event, area) {
    var toolId = parseInt($event.dragData);
    var entity = this.es.getBlankEntity(toolId);
    var max = 1;

    if (this.entities.length > 0) {
      max = Math.max.apply(Math, this.entities.map((o) => { return o.order; }));
    }

    entity.order = max;
    entity.toolId = toolId;

    if (entity.toolId !== Tools.Select) {
      entity.options = [];
    }

    this.es.addEntity(this.form.$key, entity);
  }

  orderToolSuccess(item, idx) {
    var prevIndex = item.order;
    var newIndex = idx;

    console.log(prevIndex, newIndex);
  }

  ngOnDestroy() {
    for (var i = 0; i < this._subscription.length; i++) {
      this._subscription[i].unsubscribe();
    }
  }

  constructor(private fs: FormService,
    private es: EntityService,
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MdSnackBar) {
  }
}
