/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  icon: string;
  isLarge?: boolean;
}

export interface CaseStudy {
  id: string;
  tag: string;
  challenge: string;
  result: string;
  metric: string;
  beforeImg: string;
  afterImg: string;
  brandName: string;
}

export interface DmTestimonial {
  id: string;
  senderName: string;
  senderHandle: string;
  avatarUrl: string;
  message: string;
  replyMessage: string;
  timestamp: string;
  stars: number;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: {
    label: string;
    points: number;
    description: string;
  }[];
}

export interface ProcessPhase {
  id: string;
  num: string;
  title: string;
  body: string;
  icon: string;
}
