import {Component, OnInit} from '@angular/core';
import {TestService} from "../../../shared/services/test.service";
import {QuizListType} from "../../../../types/quiz-list.type";
import {AuthService} from "../../../core/auth/auth.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {TestResultType} from "../../../../types/test-result.type";

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent implements OnInit {
  quizzes: QuizListType[] = [];
  testResult: TestResultType[] | null = null;

  constructor(private testService: TestService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.testService.getTests()
      .subscribe((result: QuizListType[]) => {
        this.quizzes = result;
      });

    const userInfo = this.authService.getUserInfo();
    if (userInfo) {
      this.testService.getUserResults(userInfo.userId)
        .subscribe((result: DefaultResponseType | TestResultType[]) => {
          if (result) {
            if ((result as DefaultResponseType).error !== undefined) {
              throw new Error((result as DefaultResponseType).message);
            }
            this.testResult = result as TestResultType[];
          }
        });
    }
  }
}
