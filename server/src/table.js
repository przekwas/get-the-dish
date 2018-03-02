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

    //Get list of items of a certain type, ie all food items associated with type pizza returned when looking at type pizza
    getItemsOfType(id) {
        let sql = `SELECT * FROM ${this.tableName} WHERE type_id = ${id};`;
        return executeQuery(sql, [id])
            .then((results) => results[0]);
    }

    getAll() {
        let sql = `SELECT * FROM ${this.tableName}`;
        return executeQuery(sql);
    }

    //Get all food items with joins on restaurant_id and type_id to get their respective names
    getAllItems() {
        let sql =
            `SELECT
        fi.name as Name,
        fi.rating as Rating,
        fi.price as Price,
        t.name as FoodType,
        r.name as RestaurantName,
        r.latitude as RestLat,
        r.longitude as RestLong,
        r.display_phone as Phone,
        r.address as StreetAddress,
        r.city as City,
        r.state as State,
        r.postal_code as PostalCode
    FROM food_item fi
    JOIN type t on t.id = fi.type_id
    JOIN restaurants r on r.id = fi.restaurant_id`;
        return executeQuery(sql);
    }

    getRankedPaniniTestMethod() {
        let sql =
            `SELECT
        fi.name as Name,
        fi.rating as Rating,
        FORMAT(fi.price, 2) as Price,
        t.name as FoodType,
        r.name as RestaurantName,
        r.latitude as RestLat,
        r.longitude as RestLong,
        r.display_phone as Phone,
        r.address as StreetAddress,
        r.city as City,
        r.state as State,
        r.postal_code as PostalCode
    FROM food_item fi
    JOIN type t on t.id = fi.type_id
    JOIN restaurants r on r.id = fi.restaurant_id
    WHERE type_id = 1
    ORDER BY Rating DESC;`;
        return executeQuery(sql);
    }

    getRankedItemsOfType(id) {
        let sql =
            `SELECT
        fi.name as Name,
        fi.rating as Rating,
        fi.price as Price,
        t.name as FoodType,
        r.name as RestaurantName,
        r.latitude as RestLat,
        r.longitude as RestLong,
        r.display_phone as Phone,
        r.address as StreetAddress,
        r.city as City,
        r.state as State,
        r.postal_code as PostalCode
    FROM food_item fi
    JOIN type t on t.id = fi.type_id
    JOIN restaurants r on r.id = fi.restaurant_id
    WHERE type_id = ${id}
    ORDER BY Rating DESC`;
        return executeQuery(sql, [id])
            .then((results) => results[0]);
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
            .then((results) => ({ id: results.insertId }));
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

export const hesSoHotRightNow = () => {
    let sql = `SELECT 
    food_item._created as Date,
    food_item.name as Name
    FROM food_item
    ORDER BY _created DESC
    LIMIT 3`;
    return executeQuery(sql);
}

export default Table;