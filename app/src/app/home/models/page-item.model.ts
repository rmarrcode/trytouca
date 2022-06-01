// Copyright 2021 Touca, Inc. Subject to Apache-2.0 License.

export enum IconColor {
  Blue = 'dodgerblue',
  Gold = 'gold',
  Gray = 'lightgray',
  Green = 'mediumseagreen',
  Orange = 'darkorange',
  Red = 'mediumvioletred'
}

export enum IconType {
  ChevronCircleDown = 'chevron-circle-down',
  ChevronCircleUp = 'chevron-circle-up',
  PlusCircle = 'plus-circle',
  MinusCircle = 'minus-circle',
  Spinner = 'spinner',
  CheckCircle = 'check-circle',
  Circle = 'circle',
  Star = 'star',
  TimesCircle = 'times-circle'
}

export type Icon = {
  color: IconColor;
  type: IconType;
  spin?: boolean;
  tooltip?: string;
};

export type Data = {
  link: string;
  name: string;
  query: any;
};

export type Topic = {
  color?: string[];
  icon?: string;
  text: string;
  title?: string;
  type?: TopicType;
};

export enum TopicType {
  BaselineVersion = 1,
  Children,
  EmptyNode,
  LatestVersion,
  MatchRate,
  Performance,
  SubmissionDate
}
