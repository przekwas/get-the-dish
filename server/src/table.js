import { executeQuery, generatePlaceholders } from './config/db';

class Table {
    constructor(tableName) {
        if (!tableName) {
            throw new TypeError('You must pass a MySQL table name into the Table object constructor.');
        }
        this.tableName = tableName;
    }

    getOne(id) {
        let sql = `SELECT * FROM ${this.tableName} WHERE id = ${id};`;
        return executeQuery(sql, [id])
        .then((results) => results[0]);
    }

    getItemsOfType(id) {
        let sql = `SELECT * FROM ${this.tableName} WHERE type_id = ${id};`;
        return executeQuery(sql, [id])
        .then((results) => results[0]);
    }

    getAll() {
        let sql = `SELECT * FROM ${this.tableName}`;
        return executeQuery(sql);
    }

    getAllItems() {
        let sql = 
        `SELECT
        fi.name as Name,
        t.name as FoodType,
        r.name as RestaurantName,
        fi.rating as Rating
    FROM food_item fi
    JOIN type t on t.id = fi.type_id
    JOIN restaurants r on r.id = fi.restaurant_id`;
    
        return executeQuery(sql);
    }

    find(query) {
        let columns = Object.keys(query);
        let values = Object.values(query);
        let conditions = columns.map((columnName) => {
            return `${columnName} LIKE ?`;
        });
        let sql = `SELECT * FROM ${this.tableName} WHERE ${conditions.join(' AND ')};`;
        return executeQuery(sql, values);
    }

    insert(row) {
        let columns = Object.keys(row);
        let values = Object.values(row);
        let placeholderString = generatePlaceholders(values);
        let sql = `INSERT INTO ${this.tableName} (${columns.join(',')}) VALUES (${placeholderString});`;
        return executeQuery(sql, values)
        .then((results) => ({id: results.insertId }));
    }

    update(id, row) {
        let columns = Object.keys(row);
        let values = Object.values(row);
        let updates = columns.map((columnName) => {
            return `${columnName} = ?`;
        });
        let sql = `UPDATE ${this.tableName} SET ${updates.join(',')} WHERE id = ${id};`;
        return executeQuery(sql, values);
    }

    delete(id) {
        let sql = `DELETE FROM ${this.tableName} WHERE id = ${id}`;
        return executeQuery(sql);
    }
}

export default Table;