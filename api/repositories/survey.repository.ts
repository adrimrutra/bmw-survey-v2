import { Repository } from '../core/interfaces/repository';
import { injectable } from 'inversify';
import { Survey } from '../models/survey';

@injectable()
export class SurveyRepository implements Repository<Survey> {
    private survey;
    constructor() {
        this.survey = new Survey().getModelForClass(Survey);
    }
    async Get() {
        const surveys: Survey[] = await this.survey.find().populate('survey').exec();
        return surveys;
    }
    async Add(entity: Survey) {
        throw new Error('Method not implemented.');
    }
    async Update(id: any, entity: Survey) {
        const Model = new Survey().getModelForClass(Survey);
        const res = await Model.updateOne({'_id': id }, entity);
        if (!res || res.ok === 0) {
            throw new Error('Cannot save survey, modified 0');
        }
        return entity;
    }
    async Delete(id: any) {
        throw new Error('Method not implemented.');
    }
}
