import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {QuizListType} from "../../../types/quiz-list.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {TestResultType} from "../../../types/test-result.type";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getTests(): Observable<QuizListType[]> {
    return this.http.get<QuizListType[]>(environment.apiHost + 'tests');
  }

  getUserResults(userId: number): Observable<TestResultType[] | DefaultResponseType> {
    return this.http.get<TestResultType[] | DefaultResponseType>(environment.apiHost + '/tests/results?userId=' + userId);
  }
}