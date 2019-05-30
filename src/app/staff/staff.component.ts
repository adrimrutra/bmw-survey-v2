import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { SurveyService } from '../services/survey.service';
import { Survey } from '../models/survey';
import { Carmodel } from '../models/carmodel';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
  providers:  [SurveyService]
})
export class StaffComponent implements OnInit {

  public _surveys: Survey [];
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public pieChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['Adolescents', 'Unlicensed', 'First-timers', 'Targetables'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData =  [{data: [], label: 'All Participated'}];

  public pieChartLabels = ['The percentage of targetables that care about drifting',
  'The percentage of targetables that picked FWD or “I don’t know” for drivetrain',
  'The average amount of BMWs owned by targetables'];

  public pieChartType = 'pie';
  public pieChartData = [{data: [], label: 'The Participated divided by different group'}];
  public all_models = [];
  public count_models = [];
  public allcar: Array<Carmodel>;

  constructor(private surveyService: SurveyService) { 
    this.allcar = new Array<Carmodel>();
  }


  ngOnInit() {
    let adolescents = 0;
    let unlicensed = 0 ;
    let first_timers = 0;
    let targetables = 0;
    let drifting = 0;
    let drivetrain = 0;
    let how_many = 0;
    let how_many_own = 0;

    const containsCar = function(arr, car) {
      const contains = arr.filter(function(obj) {
          if (obj.name === car) {
            obj.count++;
            return true;
          }
        }).length >= 1;
        return contains;
      };

    this.surveyService.getAllSurvey().subscribe(res => {
        this._surveys = res;
        console.log(this._surveys);
        if ( this._surveys != null ) {
          targetables = this._surveys.length;

          this._surveys.forEach(element => {
            if (element.age < 18) {
              adolescents ++;
            }
            if (element.license === 'No, I prefer using other transport') {
              unlicensed ++;
            }
            if (element.age >= 18 && element.age <= 25 && element.first_car === 'Yes') {
              first_timers ++;
            }
            if (element.drivetrain === 'FWD' || element.drivetrain === 'I don’t know') {
              drivetrain ++;
            }
            if (element.drifting === 'Yes') {
              drifting ++;
            }
            if (element.how_many > 0) {
              how_many += element.how_many;
              how_many_own ++;
            }
            element.carmodels.forEach(model => {
              if (this.allcar.length === 0 || this.allcar.length > 0 && !containsCar(this.allcar, model)) {
                this.allcar.push(new Carmodel (model, 1));
              }
            });

          });

          this.pieChartLabels = ['The percentage of targetables that care about drifting',
          'The percentage of targetables that picked FWD or “I don’t know” for drivetrain',
          'The average amount of BMWs owned by targetables'];

          const dataArr = [drifting, drivetrain, how_many];

          this.allcar.forEach(element => {
            this.pieChartLabels.push(element.name);
            dataArr.push(element.count);
          });

          this.pieChartData = [
            {data: dataArr, label: 'The Participated divided by different group'}
          ];

          this.barChartData = [
            {data: [adolescents, unlicensed, first_timers, targetables], label: 'All Participated'}
          ];
          drivetrain = Math.trunc(drivetrain * 100 / targetables) ;
          drifting = Math.trunc(drifting * 100 / targetables);
          how_many = Math.trunc( how_many / how_many_own);

      }
    }, err => {
      console.log(err);
    });

  }

  getSurvey() {
    this.surveyService.getAllSurvey()
      .subscribe( data => {
          this._surveys = data;
      });
  }
}


