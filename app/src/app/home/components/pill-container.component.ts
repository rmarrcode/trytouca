// Copyright 2022 Touca, Inc. Subject to Apache-2.0 License.

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Topic, TopicType } from '../models/page-item.model';

@Component({
  template: ''
})
export class PillContainerComponent {
  shownTopics: Topic[];
  toggleState: TopicType | null;
  topics: Topic[];

  @Input()
  set chosenTopics(type: TopicType) {
    this.toggleState = type;
    this.applyChosenTopics(type);
  }
  @Output() updateChosenTopics = new EventEmitter<TopicType | null>();

  toggleChosenTopics(type: TopicType) {
    this.updateChosenTopics.emit(this.toggleState === type ? null : type);
  }

  applyChosenTopics(type?: TopicType) {
    this.toggleState = type;
    this.shownTopics = type
      ? this.topics.filter((v) => type === v.type)
      : this.topics;
  }
}
