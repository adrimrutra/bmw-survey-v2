import { Repository, GetAll, Add } from '../core/interfaces/repository';
import { injectable } from 'inversify';
import { Survey } from '../models/survey';

@injectable()
export class SurveyRepository implements Repository<Survey>, GetAll<Survey>, Add<Survey> {
    private survey: any;
    constructor() {
        this.survey = new Survey().getModelForClass(Survey);
    }
    async GetAll() {
        const surveys: Survey[] = await this.survey.find().populate('survey').exec();
        return surveys;
    }
    async Add(entity: Survey) {
        this.survey = new Survey().getModelForClass(Survey);
        return await new this.survey(entity).save();
    }
}
