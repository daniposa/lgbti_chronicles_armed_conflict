import { Injectable } from '@angular/core';

export interface TextSegment {
  text: string;
  isHighlight: boolean;
  tooltip?: string;
}

@Injectable({ providedIn: 'root' })
export class TextParserService {
  parseMarkedText(rawText: string, tooltips: Record<number, string>): TextSegment[] {
    const segments: TextSegment[] = [];
    const regex = /\{(\d+)\}(.*?)\{\/\1\}/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(rawText)) !== null) {
      if (match.index > lastIndex) {
        segments.push({
          text: rawText.slice(lastIndex, match.index),
          isHighlight: false
        });
      }
      segments.push({
        text: match[2],
        isHighlight: true,
        tooltip: tooltips[Number(match[1])]
      });
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < rawText.length) {
      segments.push({
        text: rawText.slice(lastIndex),
        isHighlight: false
      });
    }

    return segments;
  }
}
