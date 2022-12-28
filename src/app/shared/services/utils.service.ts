import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  processInputFieldValue(text: string) {
    return text.trim().replace(/\s+/g, " ").toLowerCase()
  }

  toTitleCase(str: string) {
    return str.replace(/(?<!.)(.)|(?<=\s)(.)/g, (char: any) => char.toUpperCase());
  }
}
