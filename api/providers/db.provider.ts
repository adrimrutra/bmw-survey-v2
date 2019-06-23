import { Container } from 'inversify';
import { DbConnection } from '../core/db.connection';

export class DbProvider {
    public static bindDataBase(container: Container) {
        container.bind<DbConnection>(DbConnection).to(DbConnection);
    }
}
